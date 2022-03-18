import { useState } from 'react'
import { toast } from 'react-toastify'
import { FaUser } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { register } from '../features/auth/authSlice'

function Register() {
  const [ formData, setFormData ] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  })
   const {name, email, password, password2 } = formData

   const dispatch = useDispatch()

   const {user, isLoading, isSuccess, message} = useSelector(state => state.auth)

   const onChange = (e) => {
     setFormData((prevState) => ({
       ...prevState,
       [e.target.name]: e.target.value
     }))
   }

   const onSubmit = (e) =>{
      e.preventDefault()
      if(password !== password2){
        toast.error('Password Do not match')
      } else{
        const userData = {
          name,
          email,
          password
        }
        dispatch(register(userData))
      }
   }

  return (
    <>
     <section className='heading'>
      <h6>
        <FaUser /> Register
      </h6>
      
     </section>
     <section>
       <form onSubmit={onSubmit}>
          <div className="form-group">
            <input type="text" id='name' className="form-control"
            value={name} name='name' onChange={onChange} 
            placeholder='Enter Your Name' required />
          </div>
           <div className="form-group">
            <input type="text" id='email' className="form-control"
            value={email} onChange={onChange} name='email'
             placeholder='Enter Your Email' required />
          </div>
           <div className="form-group">
            <input type="password" id='password' className="form-control"
            value={password} onChange={onChange} name='password'
             placeholder='Enter Your Password' required />
          </div>
           <div className="form-group">
            <input type="password" id='password2' className="form-control"
            value={password2} onChange={onChange} required
            placeholder='Confirm Password' name='password2' />
          </div>
          <div className="form-group">
            <button className="btn btn-block">Register</button>
          </div>
       </form>
     </section>
    </>
  )
}

export default Register