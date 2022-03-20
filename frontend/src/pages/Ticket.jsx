import { useEffect } from 'react'
import { useSelector, useDispatch} from 'react-redux'
import { useNavigate } from 'react-router'
import { toast } from 'react-toastify'
import { useParams } from 'react-router'
import Spinner from '../components/Spinner'
import BackButton from '../components/BackButton'
import { getTicket, closeTicket } from '../features/ticket/ticketSlice'

function Ticket() {
  const { ticket, isLoading, isError, message } = useSelector((state) => state.tickets)
  
  const { ticketId } = useParams()

const dispatch = useDispatch()

const navigate = useNavigate()

const onTicketClosed = () => {
  dispatch(closeTicket(ticketId))
  toast.success('Ticket Closed')
  navigate('/tickets')
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
    {ticket.status !== 'closed' && 
    ( <button className="btn btn-block btn-danger" onClick={onTicketClosed}> Closed Ticket</button> )}
    </div>
  )
}

export default Ticket