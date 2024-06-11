"use client";
import Cookies from "js-cookie";
import { ContactRound, LogOut, PresentationIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import UserController from "../../components/Admin/DashBoard/userController";
import { uiStore } from "../../../globalStore/store";

const Sidenav: React.FC = () => {
  const Router = useRouter();
  const { activeSection, setActiveSection } = uiStore((state) => state);

  const handleClick = () => {
    Router.push("/adminLogin");
  };

  const handleSectionClick = (section: string) => {
    setActiveSection(section);
  };

  const onSignout = () => {
    console.log("sign out confirmed");
    Cookies.remove("token", { path: "", secure: true, sameSite: "strict" });
    localStorage.removeItem("User");
    Router.push("/adminLogin");
  };

  return (
    <div className="flex">
      <div className="sm:w-56 h-screen bg-[#f1eff3] hidden sm:block flex-row">
        <div
          onClick={handleClick}
          className="flex flex-col space-x-2 justify-center cursor-pointer items-center pt-5 w-[80%]"
        >
          <h1 className="font-bold text-4xl text-cyan-800">EduNest</h1>
          <h1 className="text-xs text-cyan-800">👑 Admin DashBoard👑</h1>
          <hr className="mt-3" />
        </div>
        <div className="mt-5">
          <div
            onClick={() => handleSectionClick("UserController")}
            className="group flex gap-3 mt-2 p-3 text-[18px] items-center text-gray-500 cursor-pointer hover:bg-[#624DE3] hover:text-white rounded-md transition-all ease-in-out duration-200"
          >
            <ContactRound className="group-hover:animate-bounce" />
            <h2>User Controller</h2>
          </div>
          <div
            onClick={() => handleSectionClick("ClassroomControl")}
            className="group flex gap-3 mt-2 p-3 text-[18px] items-center text-gray-500 cursor-pointer hover:bg-[#624DE3] hover:text-white rounded-md transition-all ease-in-out duration-200"
          >
            <PresentationIcon className="group-hover:animate-bounce" />
            <h2>Classroom Control</h2>
          </div>
          <div
            onClick={onSignout}
            className="group flex gap-3 mt-2 p-3 text-[18px] items-center text-gray-500 cursor-pointer hover:bg-[#624DE3] hover:text-white rounded-md transition-all ease-in-out duration-200"
          >
            <LogOut className="group-hover:animate-bounce" />
            <h2>Sign Out</h2>
          </div>
        </div>
      </div>
      {/* <div className="flex-1">
        {activeSection === "UserController" && <UserController />}
        {activeSection === "ClassroomControl" && <div>Classroom Control Component</div>}
      </div> */}
    </div>
  );
};

export default Sidenav;
