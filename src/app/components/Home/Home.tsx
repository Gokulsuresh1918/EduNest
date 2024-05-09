import React from "react";
import Nav from "../Navbar";
import Image from "next/image";
import imageUrl from "../../../../public/images/finaldeom.png";

const Home = () => {
  return (
    <div>
      <div className="relative z-20">
        <Nav />
      </div>
      <div className="relative  hidden  sm:block">
        <Image
          src={imageUrl}
          alt="Login image"
          className=" object-cover  w-full"
        />
        {/* <h1 className="absolute top-0 left-0 z-10 flex justify-center items-center text-white">
          New Era Of Learning
        </h1> */}

        {/* <div className="h-screen  bg-[#08071a]"></div> */}
      </div>
    </div>
  );
};

export default Home;
