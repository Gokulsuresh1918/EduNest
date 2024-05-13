import Image from "next/image";
import React from "react";
import logo from "../../../../public/images/logo.png";

const NavBar = () => {
  return (
    <div className="flex justify-between border  h-16">
      <div className=" flex justify-center items-center">
        <div>
          <Image src={logo} alt="logo" width={60} height={10} />
        </div>

        <button className=" md:block hidden text-black bg-amber-500 border rounded-xl shadow-md  px-5">
          Buy Pro 
        </button>
      </div>
      <div className=" flex justify-center items-center">
        <h2 className="text-black pr-2">name of user</h2>

        <div className="rounded-full bg-black">
          <Image src={logo} alt="logo" width={60} height={10} />
        </div>
      </div>
    </div>
  );
};

export default NavBar;
