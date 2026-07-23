'use client'

import { useState, type FormEvent } from 'react'

export function ContactForm({ service }: { service?: string }) {
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    setSending(true)

    const form = e.currentTarget
    const data = new FormData(form)

    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.get('name'),
          phone: data.get('phone'),
          message: data.get('message'),
          service: service ?? null,
        }),
      })
      if (!res.ok) throw new Error('bad response')
      setSent(true)
    } catch {
      setError('Не удалось отправить. Позвоните — так быстрее.')
    } finally {
      setSending(false)
    }
  }

  if (sent) {
    return (
      <div className="contact-form">
        <div className="success-msg">
          <h3>Заявка принята</h3>
          <p>Спасибо! Свяжусь с вами в ближайшее время.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="contact-form">
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="name">Имя</label>
          <input
            type="text"
            id="name"
            name="name"
            className="form-input"
            placeholder="Как к вам обращаться"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Телефон</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            className="form-input"
            placeholder="+7 (___) ___-__-__"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="message">Описание работ</label>
          <textarea
            id="message"
            name="message"
            className="form-input"
            placeholder="Что нужно демонтировать"
          />
        </div>

        {error && (
          <p style={{ color: 'var(--primary)', fontSize: '0.85rem', marginBottom: '1rem' }}>
            {error}
          </p>
        )}

        <button
          type="submit"
          className="btn btn-primary"
          style={{ width: '100%', marginTop: '0.5rem' }}
          disabled={sending}
        >
          {sending ? 'Отправляю…' : 'Отправить заявку'}
        </button>

        <p className="form-consent">
          Нажимая кнопку, вы соглашаетесь с{' '}
          <a href="/privacy">политикой обработки персональных данных</a>.
        </p>
      </form>
    </div>
  )
}
