import Link from 'next/link'
import { ContactForm } from '@/components/contact-form'
import { Icon } from '@/components/icon'
import { services } from '@/content/services'
import { site, stats, strengths } from '@/content/site'

export default function HomePage() {
  return (
    <main>
      {/* HERO */}
      <section id="top" className="hero">
        {/* TODO: добавить фото в /public/hero-demolition.jpg и вернуть <img> */}
        <div className="hero-bg" />
        <div className="container hero-content">
          <span
            className="label"
            style={{ borderLeft: '2px solid var(--primary)', paddingLeft: '1rem' }}
          >
            Демонтажные работы
          </span>
          <h1>
            Сносим стены. <span>Оставляем порядок.</span>
          </h1>
          <p>
            Надёжный, быстрый и аккуратный демонтаж любой сложности. Работаю чисто,
            соблюдаю сроки и берусь за объёмные задачи без лишнего шума.
          </p>
          <div className="hero-btns">
            <Link href="/#contact" className="btn btn-primary">
              Связаться
            </Link>
            <Link href="/services" className="btn btn-ghost">
              Услуги
            </Link>
          </div>
        </div>
        <div className="hero-tag">{site.tagline}</div>
      </section>

      {/* УСЛУГИ */}
      <section id="services" className="section">
        <div className="container">
          <span className="label">Услуги</span>
          <h2>Что я делаю</h2>
          <p className="muted">
            Полный цикл: от сноса перегородки до вывезенного мусора и подметённого
            подъезда.
          </p>
          <div className="services-grid" style={{ marginTop: '3rem' }}>
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
      </section>

      {/* ОБО МНЕ */}
      <section id="about" className="section">
        <div className="container about-grid">
          <div className="about-photo">
            {/* TODO: добавить фото в /public/portrait.jpg и заменить заглушку на <img> */}
            <div className="photo-placeholder">Фото</div>
          </div>
          <div>
            <span className="label">Обо мне</span>
            <h2>
              Мир Станиславович
              <br />
              Тимошенко
            </h2>
            <p className="muted">
              Специалист по демонтажу, которому можно доверять. Подхожу к каждому
              объекту серьёзно: от точного расчёта до чистой уборки после работ.
              Соблюдаю договорённости и берусь за задачи любой сложности.
            </p>
            <div className="stats-grid">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <div className="stat-value">{stat.value}</div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* КОНТАКТЫ */}
      <section id="contact" className="section">
        <div className="container contact-grid">
          <div>
            <span className="label">Связаться</span>
            <h2>Обсудим ваш объект</h2>
            <p className="muted">
              Оставьте контакты — перезвоню, оценю объём работ и назову точный срок.
              Демонтаж без лишнего шума.
            </p>
            <div className="contact-info" style={{ marginTop: '2.5rem' }}>
              <a href={site.phoneHref}>
                <div className="contact-icon">
                  <Icon name="Phone" />
                </div>
                <span>{site.phone}</span>
              </a>
              <a href={`mailto:${site.email}`}>
                <div className="contact-icon">
                  <Icon name="Mail" />
                </div>
                <span>{site.email}</span>
              </a>
              <div className="contact-row">
                <div className="contact-icon">
                  <Icon name="MapPin" />
                </div>
                <span style={{ color: 'var(--muted-foreground)' }}>{site.area}</span>
              </div>
            </div>
          </div>
          <ContactForm />
        </div>
      </section>

      {/* СЛОГАН */}
      <section className="tagline">
        <div className="container">
          <p>
            Демонтаж без лишнего шума.
            <br />
            Чётко. Надёжно. В срок.
          </p>
        </div>
      </section>

      {/* СИЛЬНЫЕ СТОРОНЫ */}
      <section id="strengths" className="section" style={{ borderTop: 'none' }}>
        <div className="container">
          <span className="label">Сильные стороны</span>
          <h2>Почему мне доверяют</h2>
          <div className="strengths-grid">
            {strengths.map((item) => (
              <div key={item.title} className="strength-card">
                <Icon name={item.icon} />
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
