import React from 'react'

export const Tag = ({type, text}) => {
  return (
    <span className={`tag tag-${type}`}>{text}</span>
  )
}
