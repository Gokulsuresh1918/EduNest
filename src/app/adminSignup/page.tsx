import React from "react";
import SignUpPage from "../../components/Admin/adminAuth/signup";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignUpPages = () => {
  return (
    <div>
      <SignUpPage />
      <ToastContainer />
    </div>
  );
};

export default SignUpPages;
