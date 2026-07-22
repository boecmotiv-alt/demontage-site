import { promises as fs } from 'fs'
import path from 'path'
import { NextResponse } from 'next/server'

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

  try {
    await fs.mkdir(DATA_DIR, { recursive: true })
    const leads = await readLeads()
    leads.unshift(lead)
    await fs.writeFile(FILE, JSON.stringify(leads, null, 2), 'utf8')
  } catch (error) {
    console.error('[lead] не удалось сохранить заявку:', error)
    return NextResponse.json({ error: 'storage failed' }, { status: 500 })
  }

  // Заявка сохранена в data/leads.json.
  // TODO: подключить доставку — письмо на почту или сообщение в Telegram.
  console.log('[lead] новая заявка:', lead.name, lead.phone, lead.service ?? '—')

  return NextResponse.json({ ok: true })
}
