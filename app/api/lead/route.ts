import { promises as fs } from 'fs'
import path from 'path'
import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

const DATA_DIR = path.join(process.cwd(), 'data')
const FILE = path.join(DATA_DIR, 'leads.json')

type Lead = {
  id: string
  createdAt: string
  name: string
  phone: string
  message: string
  service: string | null
}

async function readLeads(): Promise<Lead[]> {
  try {
    const raw = await fs.readFile(FILE, 'utf8')
    return JSON.parse(raw) as Lead[]
  } catch {
    return []
  }
}

async function saveLead(lead: Lead) {
  await fs.mkdir(DATA_DIR, { recursive: true })
  const leads = await readLeads()
  leads.unshift(lead)
  await fs.writeFile(FILE, JSON.stringify(leads, null, 2), 'utf8')
}

async function sendMail(lead: Lead) {
  const host = process.env.SMTP_HOST
  const user = process.env.SMTP_USER
  const pass = process.env.SMTP_PASS
  const to = process.env.LEAD_TO || user

  if (!host || !user || !pass || !to) {
    console.warn('[lead] SMTP не настроен — письмо не отправлено, заявка сохранена в файл')
    return false
  }

  const port = Number(process.env.SMTP_PORT || 465)

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user: user.trim(), pass: pass.trim() },
    // Без таймаутов зависший SMTP держит запрос бесконечно — форма у посетителя
    // крутится и не отвечает. Лучше быстро упасть: заявка уже сохранена в файл.
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 15_000,
  })

  const when = new Date(lead.createdAt).toLocaleString('ru-RU', {
    timeZone: 'Europe/Moscow',
  })

  const lines = [
    `Имя:      ${lead.name}`,
    `Телефон:  ${lead.phone}`,
    `Услуга:   ${lead.service ?? 'с главной страницы'}`,
    `Время:    ${when} (МСК)`,
    '',
    'Описание работ:',
    lead.message || '— не указано —',
  ]

  await transporter.sendMail({
    from: `"Заявка с сайта" <${user}>`,
    to,
    replyTo: user,
    subject: `Заявка: ${lead.service ?? 'демонтаж'} — ${lead.name}, ${lead.phone}`,
    text: lines.join('\n'),
    html: `
      <div style="font-family:-apple-system,Segoe UI,Roboto,sans-serif;font-size:15px;line-height:1.6;color:#1a1a1a">
        <h2 style="margin:0 0 16px;font-size:18px">Новая заявка с сайта</h2>
        <table cellpadding="6" style="border-collapse:collapse">
          <tr><td style="color:#666">Имя</td><td><b>${escapeHtml(lead.name)}</b></td></tr>
          <tr><td style="color:#666">Телефон</td><td><b><a href="tel:${escapeHtml(lead.phone)}">${escapeHtml(lead.phone)}</a></b></td></tr>
          <tr><td style="color:#666">Услуга</td><td>${escapeHtml(lead.service ?? 'с главной страницы')}</td></tr>
          <tr><td style="color:#666">Время</td><td>${when} (МСК)</td></tr>
        </table>
        <p style="margin:16px 0 4px;color:#666">Описание работ:</p>
        <p style="margin:0;padding:12px;background:#f5f5f5;border-radius:6px;white-space:pre-wrap">${escapeHtml(lead.message) || '— не указано —'}</p>
      </div>
    `,
  })

  return true
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

export async function POST(request: Request) {
  let body: Record<string, unknown>
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'bad json' }, { status: 400 })
  }

  const name = String(body.name ?? '').trim()
  const phone = String(body.phone ?? '').trim()
  const message = String(body.message ?? '').trim()
  const service = body.service ? String(body.service).trim() : null

  if (!name || !phone) {
    return NextResponse.json({ error: 'name and phone required' }, { status: 400 })
  }

  const lead: Lead = {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    name: name.slice(0, 120),
    phone: phone.slice(0, 40),
    message: message.slice(0, 2000),
    service,
  }

  // Сначала сохраняем в файл — это страховка на случай проблем с почтой.
  try {
    await saveLead(lead)
  } catch (error) {
    console.error('[lead] не удалось сохранить заявку в файл:', error)
  }

  // Письмо отправляем БЕЗ ожидания: заявка уже в файле, а SMTP бывает медленным.
  // Иначе посетитель смотрит на крутилку, пока почта раздумывает, и уходит.
  sendMail(lead).catch((error) => {
    console.error('[lead] не удалось отправить письмо:', error)
  })

  return NextResponse.json({ ok: true })
}
