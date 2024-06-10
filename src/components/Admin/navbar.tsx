"use client";

import Image from "next/image";
import React, { useState } from "react";
import logo from "../../../public/images/logo.png";
// import { useStore } from 'zustand';
import { userStore, classroomStore } from "../../../globalStore/store";
import { useRouter } from "next/navigation";
import { createPortal } from "react-dom";
import ReactDOM from "react-dom";
import { signOut } from "next-auth/react";
import Cookies from "js-cookie";


const NavBar = () => {
  const user = userStore((state) => state.user);
  const [profile, setprofile] = useState(false);
  const Router = useRouter();
  function handleprofile() {
    setprofile(!profile);
  }

    const onSignout = () => {
      console.log('sign out confirmed');
        Cookies.remove('token', { path: '', secure: true, sameSite: 'strict' });
        localStorage.removeItem('User');
        Router.push('/adminLogin');
    };
  
  return (
    <>
      <div className="flex justify-between border bg-[#f1eff3]   h-12 w-full">
        <div className=" flex justify-center items-center">
          {/* <div onClick={()=>{Router.push('/')}}>
          <Image src={logo} alt="logo" width={60} height={10} />
        </div> */}
          <h1 className=" md:block hidden  text-black bg-amber-500 border rounded-xl shadow-md  px-5">
            Admin Dashboard
          </h1>
        </div>
        <div className=" flex justify-center items-center">
          <h2 className="text-black p-1 font-serif border-black rounded-xl shadow-2xl mr-2">
            {user?.name || "Guest"}
          </h2>

          <button onClick={onSignout} className="border bg-red-700 px-5 py-2  rounded-2xl">
            Sign Out
          </button>
        </div>
      </div>
    </>
  );
};

export default NavBar;
