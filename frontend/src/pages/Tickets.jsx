import {useEffect} from 'react'
import { useSelector, useDispatch} from 'react-redux'
import Spinner from '../components/Spinner'
import { getAllTickets, reset } from '../features/ticket/ticketSlice'

function Tickets() {
  const { tickets, isLoading, isSuccess} = useSelector((state) => state.tickets)
  
  const dispatch = useDispatch()

  useEffect((state) => {
    if(isSuccess){
      dispatch(reset)
    }
  },[dispatch, isSuccess])

  useEffect(() => {
    dispatch(getAllTickets())

  },[dispatch])

  if(isLoading) {
    return <Spinner />
  }

  return (
    <div>
      <h3>List of User Tickets</h3>
    </div>
  )
}

export default Tickets