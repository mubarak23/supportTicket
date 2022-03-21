import React from 'react'
import { useSelector } from 'react-redux'

function NoteItem({note}) {
  const user = useSelector((state) => state.auth.user)
  return (
    <div className='note' >
      
      <h4> Note from {note.isStaff ? 
      <span>Staff</span> : <span>{user.name}</span> }</h4>
      <p>{note.text}</p>
      <div className="note-date">{new Date(note.createdAt).toLocaleString('en-us')}</div>
    </div>
  )
}

export default NoteItem