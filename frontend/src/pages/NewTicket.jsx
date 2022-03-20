import { useState, useEffect} from 'react'
import {useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Spinner from '../components/Spinner'
import BackButton from '../components/BackButton'
import { createTicket, reset} from '../features/ticket/ticketSlice'

function NewTicket() {
  const { user } = useSelector((state) => state.auth)

  const { isLoading, isError, isSuccess, message } = useSelector((state) => state.tickets)

  const [ name ] = useState(user.name)
  const [ email ] = useState(user.email)
  const [product, setProduct] = useState('')
  const [description, setDescription] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()

    useEffect(() => {
    return () => {
    if(isSuccess){
      dispatch(reset)
    }
  }
  },[dispatch, isSuccess])
  
  useEffect(() => {
    if(isError){
      toast.error(message)
    }
    if(isSuccess){
      dispatch(reset())
      toast.success(message)
      navigate('/tickets')
    }
    dispatch(reset())
  }, [isError, isSuccess, message, dispatch, navigate])

  const onHandleSubmit = (e) =>{
    e.preventDefault()
    dispatch(createTicket({product, description}))
  }
  
  if(isLoading){
    return <Spinner />
  }

  return (
    <>
      <BackButton url='/' />
      <section className='heading'>
        <h3>New Ticket</h3>
        <p>Please filled out the Form</p>
      </section>
      <section className='form'>
        <div className="form-group">
          <label htmlFor="name">Customer Name</label>
          <input type="text" name='name' disabled value={name} className="form-control" />
        </div>
        <div className="form-group">
          <label htmlFor="email">Customer email</label>
          <input type="text" name='email' disabled value={email} className="form-control" />
        </div>
        <form onSubmit={onHandleSubmit}>
        <div className="form-group">
          <label htmlFor="Product">Select a Product</label>
          <select name="product" id="product" value={product}
           onChange={(e) => setProduct(e.target.value)} className="form-control">
            <option value="iPad">iPad</option>
            <option value="iPhone">iPhone</option> 
            <option value="MacBook Pro">MacBook Pro</option>
            <option value="iMac">iMac</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="description">Description of the issue</label>
          <textarea name="description" id="description" placeholder='Description' 
          value={description} onChange={(e) => setDescription(e.target.value)} className="form-control"></textarea>
        </div>
        <div className="form-group">
          <button className=" btn btn-block">Submit</button>
        </div>
        </form>
      </section>
    </>
  )
}

export default NewTicket