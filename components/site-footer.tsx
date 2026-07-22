import { site } from '@/content/site'

export function SiteFooter() {
  return (
    <footer>
      <div className="container footer-inner">
        <span className="footer-brand">
          {site.brand} · Демонтаж
        </span>
        <span className="footer-copy">© 2026 {site.owner}</span>
      </div>
    </footer>
  )
}
