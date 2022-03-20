import React from 'react'
import { FaArrowAltCircleLeft } from 'react-icons/fa'
import { Link } from 'react-router-dom'
function BackButton({url}) {
  return (
    <Link to={url}> <button className="btn btn-reverse btn-block">
      <FaArrowAltCircleLeft /> Back
      </button></Link>
  )
}

export default BackButton