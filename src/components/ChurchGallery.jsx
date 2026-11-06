const photographs = [
  {
    src: '/images/church-gallery/photo_1_2026-11-04_21-49-35.jpg',
    alt: 'A church gathering on stage with people sharing a moment at the lectern.',
  },
  {
    src: '/images/church-gallery/photo_2_2026-11-04_21-49-35.jpg',
    alt: 'A speaker at a lectern during an evening church gathering.',
  },
  {
    src: '/images/church-gallery/photo_3_2026-11-04_21-49-35.jpg',
    alt: 'People walking together through an outdoor church gathering.',
  },
  {
    src: '/images/church-gallery/photo_4_2026-11-04_21-49-35.jpg',
    alt: 'Three people standing together at a church gathering.',
  },
  {
    src: '/images/church-gallery/photo_5_2026-11-04_21-49-36.jpg',
    alt: 'People arriving together outside a church gathering.',
  },
  {
    src: '/images/church-gallery/photo_6_2026-11-04_21-49-36.jpg',
    alt: 'People greeting one another beside a parked car.',
  },
]

function ChurchGallery() {
  return (
    <section className="church-gallery" aria-labelledby="church-gallery-title">
      <div className="container">
        <div className="church-gallery__heading">
          <div>
            <p className="eyebrow">LIFE TOGETHER</p>
            <h2 id="church-gallery-title">Moments at Jesus House</h2>
          </div>
          <p>
            Take a glimpse into our moments of worship, fellowship, service and
            community.
          </p>
        </div>

        <div className="church-gallery__grid">
          {photographs.map(({ src, alt }, index) => (
            <figure className={`church-gallery__item church-gallery__item--${index + 1}`} key={src}>
              <img src={src} alt={alt} loading="lazy" />
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ChurchGallery
