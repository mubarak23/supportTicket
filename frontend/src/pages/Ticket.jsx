import { useEffect, useState } from 'react'
import { useSelector, useDispatch} from 'react-redux'
import { useNavigate } from 'react-router'
import { toast } from 'react-toastify'
import Modal from 'react-modal'
import { FaPlus } from 'react-icons/fa'
import { useParams } from 'react-router'
import Spinner from '../components/Spinner'
import BackButton from '../components/BackButton'
import NoteItem from '../components/NoteItem'
import { getTicket, closeTicket } from '../features/ticket/ticketSlice'
import {getTicketNotes, reset as noteReset } from '../features/note/noteSlice'

const customStyle = {
  content: {
    width: '600px',
    top: '50%',
    left: '50%',
    right: 'auto',
    buttom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    position: 'relative'
  }
}

Modal.setAppElement('#root', )

function Ticket() {

  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [noteText, setNoteText] = useState('')


  const { ticket, isLoading, isError, message } = useSelector((state) => state.tickets)

  const { notes, isLoading: notesIsLoading } = useSelector((state) => state.notes)
  
  const { ticketId } = useParams()

const dispatch = useDispatch()

const navigate = useNavigate()

const onTicketClosed = () => {
  dispatch(closeTicket(ticketId))
  toast.success('Ticket Closed')
  navigate('/tickets')
}

// open /closed modal
const openModal = () => setModalIsOpen(true)
const closeModal = () => setModalIsOpen(false)

// hANDLE SUBMIT nOTE
const handSubmitNote =(e) => {
  e.preventDefault()
  console.log('Submit')
}

  // useEffect(() => {
  //   return () => {
  //   if(isSuccess){
  //     dispatch(reset)
  //   }
  // }
  // },[dispatch, isSuccess])

  useEffect(() => {
    if(isError){
      toast.error(message)
    }
    dispatch(getTicket(ticketId))
    dispatch(getTicketNotes(ticketId))
    
  }, [isError, ticketId, message]) // eslint-disable-line react-hooks/exhaustive-deps


  
  if(isLoading){
    return <Spinner />
  }
    if(isError){
    return <div>Something when Wrong</div>
  }

  return (
    <div className='ticket-page'>
    <header>
      <BackButton url='/tickets' />
      <h2>Ticket Id: {ticket._id}
      <span className={`status status-${ticket.status}`}>
        {ticket.status}
      </span>
      </h2>
      <h3>Date Submited: {new Date(ticket.createdAt).toLocaleString('en-us')}</h3>
      <h3>Product: {ticket.product}</h3>
      <hr />
      <div className="ticket-desc">
        <h3>Desctiption of issue</h3>
        <p>{ticket.description}</p>
      </div>
    </header>
    {ticket.status !== 'closed' && (
      <button className='btn btn-primary' onClick={openModal}> <FaPlus /> Add Note</button>
    )}
    <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyle}
    contentLabel='Add Note'>
      <h3>Add Note</h3>
      <button className="btn-close" onClick={closeModal}>X</button>
     <div>
        <form onSubmit={handSubmitNote}>
        <div className="form-group">
          <textarea name="noteText" id="noteText" className='form-control'
          placeholder='Note Text' value={noteText} 
          onChange = {(e) => setNoteText(e.target.value)} ></textarea>
        </div>
        <div className="form-group">
          <button className="btn" type='submit'>Submit</button>
        </div>
      </form>
     </div>
    </Modal>
    <h4>Ticket Notes </h4>
    {notes.map((note) => (
      <NoteItem key={note._id} note={note} />
    ))}
    {ticket.status !== 'closed' && 
    ( <button className="btn btn-block btn-danger" onClick={onTicketClosed}> Closed Ticket</button> )}
    </div>
  )
}

export default Ticket