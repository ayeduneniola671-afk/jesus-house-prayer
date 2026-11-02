function SectionHeading({ eyebrow, title, description, className = '' }) {
  return (
    <div className={`section-heading ${className}`.trim()}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2>{title}</h2>
      {description && <p className="section-heading__description">{description}</p>}
    </div>
  )
}

export default SectionHeading
