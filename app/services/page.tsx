import type { Metadata } from 'next'
import Link from 'next/link'
import { Icon } from '@/components/icon'
import { services } from '@/content/services'

export const metadata: Metadata = {
  title: 'Услуги в Сочи',
  description:
    'Демонтаж стен и перегородок, стяжки, штукатурки в Сочи. Вывоз строительного мусора, грузчики и спуск мусора с этажа.',
  alternates: { canonical: '/services' },
}

export default function ServicesPage() {
  return (
    <main>
      <div className="container page-head">
        <span className="label">Услуги</span>
        <h1>Демонтаж и всё, что после него</h1>
        <p className="muted">
          Работаю по Сочи. Беру объект целиком: снести, собрать, спустить и вывезти.
          Не нужно искать отдельно бригаду на демонтаж, отдельно грузчиков и отдельно
          машину.
        </p>
      </div>

      <div className="container" style={{ paddingBottom: '6rem' }}>
        <div className="services-grid">
          {services.map((service) => (
            <Link
              key={service.slug}
              href={`/services/${service.slug}`}
              className="service-card"
            >
              <Icon name={service.icon} />
              <h3>{service.title}</h3>
              <p>{service.short}</p>
              <span className="more">Подробнее →</span>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}
