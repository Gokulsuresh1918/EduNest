'use client'

import Image from "next/image";
import React from "react";
import logo from "../../../../public/images/logo.png";
// import { useStore } from 'zustand'; 
import { userStore, classroomStore } from "../../../../globalStore/store";
import { useRouter } from "next/navigation";


const NavBar = () => {
  const user = userStore(state => state.user); 
  const Router=useRouter()

  return (
    <div className="flex justify-between border bg-[#f1eff3]  h-16">
      <div className=" flex justify-center items-center">
        {/* <div onClick={()=>{Router.push('/')}}>
          <Image src={logo} alt="logo" width={60} height={10} />
        </div> */}

        <button className=" md:block hidden hover:px-6  text-black bg-amber-500 border rounded-xl shadow-md  px-5">
          Buy Pro 
        </button>
      </div>
      <div className=" flex justify-center items-center">
      <h2 className="text-black p-1 border border-black rounded-xl shadow-2xl mr-2">{user?.name || 'Guest'}</h2>

        <div className="rounded-full bg-black mr-3">
          <Image src={logo} alt="logo" width={50} height={10} />
        </div>
      </div>
    </div>
  );
};

export default NavBar;
