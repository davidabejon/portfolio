export const Experience = ({ title, date, description, logo, company, current, currentLabel }) => (
  <article className={`experience-card ${current ? 'is-current' : ''}`}>
    <div className="experience-meta">
      <span className="experience-date">{date}</span>
      {current && <span className="current-badge">{currentLabel}</span>}
    </div>
    <div className="experience-body">
      <div>
        <p className="experience-company">{company}</p>
        <h3>{title}</h3>
        <div className="experience-description">{description}</div>
      </div>
      <div className="experience-logo-frame"><img className="experience-logo" src={logo} alt={company} loading="lazy" width="72" height="72" /></div>
    </div>
  </article>
)
