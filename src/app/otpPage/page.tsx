import React from 'react'
import OtpPage from '../components/Auth/otp'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';


const signUp = () => {
  return (
    <div>
      <OtpPage/>
      <ToastContainer />
    </div>
  )
}

export default signUp
