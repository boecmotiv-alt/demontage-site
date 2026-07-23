import Link from 'next/link'
import { site } from '@/content/site'

export function SiteFooter() {
  return (
    <footer>
      <div className="container footer-inner">
        <span className="footer-brand">{site.brand} · Демонтаж</span>
        <Link href="/privacy" className="footer-legal">
          Политика обработки персональных данных
        </Link>
        <span className="footer-copy">© 2026 {site.owner}</span>
      </div>
    </footer>
  )
}
