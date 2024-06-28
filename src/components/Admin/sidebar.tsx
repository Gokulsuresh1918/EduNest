import React, { useState } from "react";
import Cookies from "js-cookie";
import { ContactRound, LogOut, PresentationIcon } from "lucide-react";
import { useRouter } from "next/navigation"; // Corrected import path
import UserController from "../../components/Admin/DashBoard/userController";
import { uiStore } from "../../../globalStore/store";
import { useTheme } from "next-themes";

const Sidenav: React.FC = () => {
  const Router = useRouter();
  const { activeSection, setActiveSection } = uiStore((state) => state);
  const { theme } = useTheme();

  // State to manage sidebar visibility on mobile
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleToggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleSectionClick = (section: string) => {
    setActiveSection(section);
    // Close sidebar on section click (optional)
    setSidebarOpen(false);
  };

  const onSignout = () => {
    Cookies.remove("token", { path: "", secure: true, sameSite: "strict" });
    localStorage.removeItem("User");
    Router.push("/adminLogin");
  };

  return (
    <div className="flex">
      {/* Hamburger Menu for Mobile Screens */}
      <button
        onClick={handleToggleSidebar}
        className="block sm:hidden bg-gray-900 w-6 h-6 text-white  items-center justify-center rounded-full"
      >
        <span className="material-icons-outlined">menu</span>
      </button>

      {/* Sidebar Content */}
      <div className={`sm:w-64 md:w-56 lg:w-48 h-screen sm:block ${sidebarOpen? 'block' : 'hidden'} ${theme === 'dark'? 'bg-gray-900 text-white' : 'bg-[#f1eff3] text-black'}`}>
        <div className="flex flex-col space-y-2 justify-center cursor-pointer items-center pt-5 w-full">
          <h1 className="font-bold text-4xl text-cyan-800">EduNest</h1>
          <h1 className="text-xs text-cyan-800">👑 Admin DashBoard👑</h1>
          <hr className="mt-3" />
        </div>
        <div className="mt-5">
          <div
            onClick={() => handleSectionClick("UserController")}
            className="group flex gap-3 mt-2 p-3 text-[18px] items-center cursor-pointer hover:bg-[#624DE3] hover:text-white rounded-md transition-all ease-in-out duration-200"
          >
            <ContactRound className="group-hover:animate-bounce" />
            <h2>User Controller</h2>
          </div>
          <div
            onClick={() => handleSectionClick("ClassroomControl")}
            className="group flex gap-3 mt-2 p-3 text-[18px] items-center cursor-pointer hover:bg-[#624DE3] hover:text-white rounded-md transition-all ease-in-out duration-200"
          >
            <PresentationIcon className="group-hover:animate-bounce" />
            <h2>Classroom Control</h2>
          </div>
          <div
            onClick={onSignout}
            className="group flex gap-3 mt-2 p-3 text-[18px] items-center cursor-pointer hover:bg-[#624DE3] hover:text-white rounded-md transition-all ease-in-out duration-200"
          >
            <LogOut className="group-hover:animate-bounce" />
            <h2>Sign Out</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidenav;
