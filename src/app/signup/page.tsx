import React from 'react'
import SignUpPage from '../components/Auth/signUp'
import { ToastContainer } from 'react-toastify'

const signUp = () => {
  return (
    <div>
      <SignUpPage/>
      <ToastContainer />
    </div>
  )
}

export default signUp
