import React from "react";
import LoginPage from "../../components/Auth/login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const loginPage = () => {
  return (
    <div>
      <LoginPage />
      <ToastContainer />
    </div>
  );
};

export default loginPage;
