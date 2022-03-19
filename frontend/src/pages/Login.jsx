import {useState, useEffect} from 'react'
import { toast } from 'react-toastify'
import { FaSignInAlt } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { login, reset } from '../features/auth/authSlice'
import { useNavigate } from 'react-router-dom'
import Spinner from '../components/Spinner'

function Login() {
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  })
  
  const {email, password } = loginData
  const {user, isLoading, isSuccess, isError, message} = useSelector(state => state.auth)

  const dispatch = useDispatch()
  const navigate = useNavigate()

   useEffect(() => {
    if(isError){
      toast.error(message)
    }
    //Redirect if Login
    if(isSuccess && user ){
      toast.success('User Login was successful')
      navigate('/')
    }
    dispatch(reset())
   },[isSuccess, isError, message, user, dispatch, navigate])

     const onChange = (e) => {
     setLoginData((prevState) => ({
       ...prevState,
       [e.target.name]: e.target.value
     }))
   }

   const onSubmit = (e) =>{
      e.preventDefault()
      const userData  = {
        email,
        password
      }
      dispatch(login(userData))
   }

  if(isLoading){
    return <Spinner />
  }
  return (
    <>
     <section className='heading'>
      <h6>
        <FaSignInAlt /> Login
      </h6>
     </section> 
     <section>
       <form onSubmit={onSubmit}>
          <div className="form-group">
            <input type="text" id='email' className="form-control"
            value={email} name='email' onChange={onChange} 
            placeholder='Enter Your email' required />
          </div>
          <div className="form-group">
            <input type="password" id='password' className="form-control"
            value={password} onChange={onChange} name='password'
             placeholder='Enter Your Password' required />
          </div>
          <div className="form-group">
            <button className="btn btn-block">Login</button>
          </div>
       </form>
     </section>
    </>
  )
}

export default Login