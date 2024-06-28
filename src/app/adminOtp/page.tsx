import React from "react";
import OtpPage from "../../components/Admin/adminAuth/adminOtp";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const loginPage = () => {
  return (
    <div>
      <OtpPage />
      <ToastContainer />
    </div>
  );
};

export default loginPage;
