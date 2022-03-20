import { useEffect } from 'react'
import { useSelector, useDispatch} from 'react-redux'
import { toast } from 'react-toastify'
import { useParams } from 'react-router'
import Spinner from '../components/Spinner'
import BackButton from '../components/BackButton'
import { getTicket } from '../features/ticket/ticketSlice'

function Ticket() {
  const { ticket, isLoading, isError, message } = useSelector((state) => state.tickets)
  
  const { ticketId } = useParams()

const dispatch = useDispatch()

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
      <hr />
      <div className="ticket-desc">
        <h3>Desctiption of issue</h3>
        <p>{ticket.description}</p>
      </div>
    </header>
    </div>
  )
}

export default Ticket