import React from "react";
import AdminLoginPage from "../../components/Admin/adminAuth/login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const loginPage = () => {
  return (
    <div>
      <AdminLoginPage />
      <ToastContainer />
    </div>
  );
};

export default loginPage;
