'use client'

import Link from 'next/link'
import { useState } from 'react'
import { navLinks, site } from '@/content/site'

export function SiteHeader() {
  const [open, setOpen] = useState(false)

  return (
    <header>
      <div className="container header-inner">
        <Link href="/" className="logo" onClick={() => setOpen(false)}>
          {site.brand} <span>{site.brandAccent}</span>
        </Link>

        <nav className="nav">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>

        <Link href="/#contact" className="header-btn">
          Связаться
        </Link>

        <button
          type="button"
          className="mobile-toggle"
          aria-label="Меню"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
        </button>
      </div>

      {open && (
        <div className="container mobile-menu active">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} onClick={() => setOpen(false)}>
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  )
}
