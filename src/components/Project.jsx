import { Tooltip } from "antd";
import { HiOutlineExternalLink } from "react-icons/hi";
import { TbBrandGithubFilled } from "react-icons/tb";
import translation from "../language";

function Project({ className, title, description, tags, repository, repositoryURL,
  liveDemo, liveDemoURL, repositoryDisabled = false, liveDemoDisabled = false, language }) {

  return (
    <div className={`${className} project d-flex gap-sm-5 flex-wrap flex-sm-nowrap`}>
      <div className="project-content d-flex flex-column justify-content-center">
        <h4>{title}</h4>
        <hr className='project-separator'></hr>
        <div className='d-flex gap-3 flex-wrap mb-2'>
          {tags.map((tag, index) => <span key={index}>{tag}</span>)}
        </div>
        <p>{description}</p>
        <div className='project-buttons d-flex gap-3'>
          <Tooltip title={repositoryDisabled ? translation.buttons.repositoryNotAvailable[language] : ''} color='geekblue' placement='top'>
            <a target='_blank' href={repositoryURL} className={`project-button ${repositoryDisabled && 'project-button-disabled'} d-flex align-items-center gap-1`}>{repository}<TbBrandGithubFilled /></a>
          </Tooltip>
          <Tooltip title={liveDemoDisabled ? translation.buttons.liveDemoNotAvailable[language] : ''} color='geekblue' placement='top'>
            <a target='_blank' href={liveDemoURL} className={`project-button ${liveDemoDisabled && 'project-button-disabled'} d-flex align-items-center gap-1`}>{liveDemo}<HiOutlineExternalLink /></a>
          </Tooltip>
        </div>
      </div>
    </div>
  );
}

export default Project;