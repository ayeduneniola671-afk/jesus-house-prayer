import { ArrowLeft, ArrowRight, Heart, MessageCircleHeart, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'

const ministryValues = [
  {
    icon: Heart,
    title: 'A place to be heard',
    description:
      'Bring what is on your heart, in your own words and in your own time.',
  },
  {
    icon: MessageCircleHeart,
    title: 'Prayer with care',
    description:
      'The prayer ministry is here to stand with you through moments of joy and challenge.',
  },
  {
    icon: Sparkles,
    title: 'Hope for every season',
    description:
      'Whether you are seeking comfort, strength, or giving thanks, your request matters.',
  },
]

function About() {
  return (
    <main className="about-page">
      <section className="page-intro about-page__intro">
        <div className="container">
          <Link className="back-link" to="/">
            <ArrowLeft size={15} aria-hidden="true" />
            Home
          </Link>
          <p className="eyebrow">JESUS HOUSE, REDEEM CHURCH</p>
          <h1>Faith, fellowship and <em>prayer</em>.</h1>
          <p className="page-intro__description">
            A welcoming church community and a simple way to connect with the
            prayer ministry, share what is on your heart and find spiritual
            encouragement.
          </p>
        </div>
      </section>

      <section className="container about-ministry">
        <div className="about-ministry__lead">
          <p className="eyebrow">WELCOME TO JESUS HOUSE</p>
          <h2>You are welcome to come as you are.</h2>
        </div>
        <div className="about-ministry__copy">
          <p>
            At Jesus House, Redeem Church, faith and prayer are part of how we
            encourage one another and make room for fellowship. We believe
            people should be able to reach out in every season of life, without
            needing to find perfect words first.
          </p>
          <p>
            This website offers a simple way to connect with the church&apos;s
            prayer ministry. Whether you are seeking encouragement, praying
            for your family, facing a challenge or giving thanks, you are
            welcome to share what is on your heart.
          </p>
        </div>
      </section>

      <section className="about-community">
        <div className="container about-community__grid">
          <figure className="about-community__image">
            <img
              src="/images/church-gallery/photo_3_2026-11-04_21-49-35.jpg"
              alt="People walking together through an outdoor church gathering."
              loading="lazy"
            />
          </figure>
          <div className="about-community__copy">
            <p className="eyebrow">A COMMUNITY THAT CARES</p>
            <h2>There is room for you here.</h2>
            <p>
              Prayer can bring comfort, hope and spiritual encouragement. This
              platform is one way to take a first step and invite the prayer
              ministry to stand with you.
            </p>
            <p>
              To share a request, visit the prayer request page, choose a
              category and write as much or as little as you wish. Your name
              and email are optional, and you can choose to remain anonymous.
            </p>
          </div>
        </div>
      </section>

      <section className="about-values">
        <div className="container">
          <div className="about-values__heading">
            <p className="eyebrow">OUR PRAYER MINISTRY</p>
            <h2>Making room for what matters.</h2>
          </div>
          <div className="about-values__grid">
            {ministryValues.map(({ icon: Icon, title, description }, index) => (
              <article className="ministry-value" key={title}>
                <span className="ministry-value__number">0{index + 1}</span>
                <Icon size={22} strokeWidth={1.5} aria-hidden="true" />
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="about-cta">
        <div className="container about-cta__inner">
          <div>
            <p className="eyebrow">WE WOULD BE GLAD TO PRAY WITH YOU</p>
            <h2>Share what is on your heart.</h2>
            <p className="about-cta__description">
              This frontend form is a demonstration only. Requests are not
              delivered to the church or stored until an approved backend is
              connected.
            </p>
          </div>
          <Link className="button button--primary" to="/prayer-request">
            Submit a Prayer Request <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </main>
  )
}

export default About
