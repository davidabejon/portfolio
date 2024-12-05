import { HiOutlineExternalLink } from "react-icons/hi";
import { TbBrandGithubFilled } from "react-icons/tb";

function Project({ className, title, description, tags, repository, repositoryURL, liveDemo, liveDemoURL }) {
  return (
    <div className={`${className} d-flex gap-sm-5 flex-wrap flex-sm-nowrap`}>
      <div className={`${className}-content d-flex flex-column justify-content-center`}>
        <h4>{title}</h4>
        <hr className='project-separator'></hr>
        <div className='d-flex gap-3 flex-wrap mb-2'>
          {tags.map((tag, index) => <span key={index}>{tag}</span>)}
        </div>
        <p>{description}</p>
        <div className='project-buttons d-flex gap-3'>
          <a target='_blank' href={repositoryURL} className='project-button d-flex align-items-center gap-1'>{repository}<TbBrandGithubFilled /></a>
          <a target='_blank' href={liveDemoURL} className='project-button d-flex align-items-center gap-1'>{liveDemo}<HiOutlineExternalLink /></a>
        </div>
      </div>
    </div>
  );
}

export default Project;