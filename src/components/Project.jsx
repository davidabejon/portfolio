import { HiOutlineExternalLink } from 'react-icons/hi'
import { TbBrandGithubFilled } from 'react-icons/tb'
import translation from '../language'

function Project({ title, description, image, number, tags, repository, repositoryURL, liveDemo, liveDemoURL, language }) {
  return (
    <article className="project">
      <div className="project-preview">
        <div className="preview-bar" aria-hidden="true"><span /><span /><span /><span className="preview-label">{title}</span></div>
        <img src={image} alt={translation.ui.projectPreview[language].replace('{title}', title)} loading="lazy" width="720" height="450" />
      </div>
      <div className="project-content">
        
        <h3><span className="eyebrow project-number">{number}</span> {title}</h3>
        <p>{description}</p>
        <ul className="project-tags" aria-label={translation.ui.technologies[language]}>{tags.map((tag, index) => <li key={index}>{tag}</li>)}</ul>
        <div className="project-buttons">
          {repositoryURL
            ? <a href={repositoryURL} target="_blank" rel="noreferrer" className="button button-secondary"><TbBrandGithubFilled aria-hidden="true" />{repository}</a>
            : <span className="unavailable-action" aria-disabled="true" title={translation.buttons.repositoryNotAvailable[language]}><TbBrandGithubFilled aria-hidden="true" />{repository}<span> — {translation.ui.unavailable[language]}</span></span>}
          {liveDemoURL && <a href={liveDemoURL} target="_blank" rel="noreferrer" className="button button-demo">{liveDemo}<HiOutlineExternalLink aria-hidden="true" /></a>}
        </div>
      </div>
    </article>
  )
}

export default Project
