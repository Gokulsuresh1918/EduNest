import React from "react";
import HomeComponent from "./components/Home/Home";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Home = () => {
  return (
    <div className="overflow-hidden">
      <HomeComponent />
      <ToastContainer />
    </div>
  );
};

export default Home;
