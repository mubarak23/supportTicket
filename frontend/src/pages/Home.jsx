import React from 'react'
import { Link }  from 'react-router-dom'
import { FaQuestionCircle, FaTicketAlt } from 'react-icons/fa'
function Home() {
  return (
    <>
      <h2>What Do You Need Help with</h2>
      <p>Please Select an Option Below</p>
      <Link to='/newTicket' className='btn btn-reverse btn-block'>
        <FaQuestionCircle />Create new Ticket
      </Link>
      <Link to='/tickets' className='btn btn-block'>
        <FaTicketAlt />View My Tickets
      </Link>
    </>
  )
}

export default Home