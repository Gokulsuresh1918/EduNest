import React from "react";
import Image from "next/image";
import Logo from '/images/Erased Bg.png';

const Nav = () => {
 return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="text-gray-800 text-xl font-bold">
            <Image src={Logo} alt="Logo" width={50} height={50} /> Adjust width and height as needed
            <p className="font-bold text-inherit">ACME</p>
          </div>
          <div className="hidden sm:flex gap-4">
            <a href="#" className="text-gray-800 hover:text-gray-600 transition-colors">Features</a>
            <a href="#" className="text-gray-800 hover:text-gray-600 transition-colors" aria-current="page">Customers</a>
            <a href="#" className="text-gray-800 hover:text-gray-600 transition-colors">Integrations</a>
          </div>
          <div className="flex items-center">
            <a href="#" className="hidden lg:flex text-gray-800 hover:text-gray-600 transition-colors">Login</a>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </nav>
 );
};

export default Nav;
