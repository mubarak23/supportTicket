import {useState} from 'react'
import { toast } from 'react-toastify'
import { FaSignInAlt } from 'react-icons/fa'

function Login() {
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  })
  const {email, password} = setLoginData
     const onChange = (e) => {
     setLoginData((prevState) => ({
       ...prevState,
       [e.target.name]: e.target.value
     }))
   }

   const onSubmit = (e) =>{
      e.preventDefault()
      
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
            <input type="text" id='name' className="form-control"
            value={email} name='name' onChange={onChange} 
            placeholder='Enter Your email' required />
          </div>
          <div className="form-group">
            <input type="text" id='password' className="form-control"
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