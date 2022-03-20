import {useEffect} from 'react'
import { useSelector, useDispatch} from 'react-redux'
import Spinner from '../components/Spinner'
import BackButton from '../components/BackButton'
import TicketItem from '../components/TicketItem'
import { getAllTickets, reset } from '../features/ticket/ticketSlice'

function Tickets() {
  const { tickets, isLoading, isSuccess} = useSelector((state) => state.tickets)
  
  const dispatch = useDispatch()

  useEffect(() => {
    return () => {
    if(isSuccess){
      dispatch(reset)
    }
  }
  },[dispatch, isSuccess])

  useEffect(() => {
    dispatch(getAllTickets())

  },[dispatch])

  if(isLoading) {
    return <Spinner />
  }

  return (
    <>
    <BackButton url='/' />
      <h3>List of User Tickets</h3>
      <div className="tickets">
        <div className="ticket-headings">
          <div>Date</div>
          <div>Product</div>
          <div>Status</div>
          <div>Action</div>
        </div>
        {tickets.map((ticket) => (
          <TicketItem  key={ticket._id} ticket={ticket}/>
        ))}
      </div>
    </>
  )
}

export default Tickets