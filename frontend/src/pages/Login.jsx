import {useState} from 'react'
import { toast } from 'react-toastify'
import { FaSignInAlt } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { login } from '../features/auth/authSlice'

function Login() {
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  })
  
  const {email, password } = loginData

  const dispatch = useDispatch()

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