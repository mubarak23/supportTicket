import { FaSignInAlt, FaUser, FaSignOutAlt } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { reset, logout} from '../features/auth/authSlice'
function Header() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  
  const { user } = useSelector((state) => state.auth)

  const Onlogout = () => {
    dispatch(logout())
    dispatch(reset())
    navigate('/')
  }

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">Support Ticket</Link>
      </div>
      <ul>
        {user ?
         (
           <li>
             <button className="btn" onClick={Onlogout}>
               <FaSignOutAlt />Logout</button>
           </li>
         ) :
         
         (
            <><li>
              <Link to='/login'>
                <FaSignInAlt /> Login
              </Link>
            </li><li>
                <Link to='/register'>
                  <FaUser /> Register
                </Link>
              </li></>
         )}
       
         
      </ul>
    </header>
  )
}

export default Header