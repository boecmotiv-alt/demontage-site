import type { Metadata } from 'next'
import { Inter, Oswald } from 'next/font/google'
import './globals.css'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { site } from '@/content/site'

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
})

const oswald = Oswald({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '600', '700'],
  variable: '--font-oswald',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: 'Демонтажные работы в Сочи — снос стен, стяжки, штукатурки, вывоз мусора',
    template: '%s — Тимошенко · Демонтаж',
  },
  description:
    'Демонтажные работы в Сочи: снос стен и перегородок, демонтаж стяжки и штукатурки, вывоз строительного мусора, грузчики и спуск мусора. Аккуратно, в срок, с уборкой после работ.',
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    siteName: 'Тимошенко · Демонтаж',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru" className={`${inter.variable} ${oswald.variable}`}>
      <body>
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  )
}
