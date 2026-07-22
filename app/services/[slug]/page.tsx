import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ContactForm } from '@/components/contact-form'
import { getService, services } from '@/content/services'
import { site } from '@/content/site'

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const service = getService(slug)
  if (!service) return {}

  return {
    title: { absolute: `${service.metaTitle} — Тимошенко · Демонтаж` },
    description: service.metaDescription,
    alternates: { canonical: `/services/${service.slug}` },
  }
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const service = getService(slug)
  if (!service) notFound()

  const others = services.filter((s) => s.slug !== service.slug)

  return (
    <main>
      <div className="container page-head">
        <div className="crumbs">
          <Link href="/">Главная</Link> · <Link href="/services">Услуги</Link>
        </div>
        <span className="label">Услуга</span>
        <h1>{service.h1}</h1>
        <p className="muted">{service.intro}</p>
      </div>

      <div className="container service-body">
        <div>
          <div className="block">
            <h2>Что делаю</h2>
            <ul className="check-list">
              {service.includes.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="block">
            <h2>Как проходит работа</h2>
            <div className="steps">
              {service.process.map((item, i) => (
                <div key={item.step} className="step">
                  <span className="step-num">{i + 1}</span>
                  <div>
                    <h3>{item.step}</h3>
                    <p>{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="block" style={{ marginBottom: 0 }}>
            <h2>Важно знать</h2>
            {service.notes.map((note) => (
              <div key={note.title} className="note">
                <h3>{note.title}</h3>
                <p>{note.text}</p>
              </div>
            ))}
          </div>
        </div>

        <aside className="side-cta">
          <h3>Оценю бесплатно</h3>
          <p>
            Опишите объект — перезвоню, посчитаю объём и назову срок. Без выезда
            «на разведку» за деньги.
          </p>
          <ContactForm service={service.title} />
          <a href={site.phoneHref} className="side-phone">
            {site.phone}
          </a>
        </aside>
      </div>

      <section className="other-services">
        <div className="container">
          <span className="label">Другие услуги</span>
          <h2 style={{ fontSize: '1.75rem' }}>Часто заказывают вместе</h2>
          <div className="other-list">
            {others.map((other) => (
              <Link key={other.slug} href={`/services/${other.slug}`}>
                {other.title}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
