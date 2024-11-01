import React from 'react'

export const Experience = ({className, title, date, description, logo}) => {
  return (
    <div className={`${className} d-flex gap-sm-5 flex-wrap flex-sm-nowrap aling-items-center`}>
      <div className='d-flex flex-column'>
        <h5>{title}</h5>
        <p className='mb-2'>{date}</p>
        <p>{description}</p>
      </div>
      <img className='experience-logo' height={100} src={logo}></img>
    </div>
  )
}
