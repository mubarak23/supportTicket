import axios from 'axios'

const API_URL = "/api/user";

//Register User
const register = async (userData) => {
  const response = await axios.post(API_URL, userData)
  if(response.data){
    localStorage.setItem('user', JSON.stringify(response.data))
  }
  return response.data
}

// Login User
const API_LOGIN_URL = "/api/user/login"
const login = async (userData) => {
  const response = await axios.post(API_LOGIN_URL, userData);
  if(response.data){
    localStorage.setItem('user', JSON.stringify(response.data))
  }
  return response.data
}

const logout = () => localStorage.removeItem('user')

const authService = {
  register,
  login,
  logout
}

export default authService