import React from 'react'
import SignUpPage from '../components/Auth/signUp'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';


const signUp = () => {
  return (
    <div>
      <SignUpPage/>
      <ToastContainer />
    </div>
  )
}

export default signUp
