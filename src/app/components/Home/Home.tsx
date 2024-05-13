"use client";
import React from "react";
import Nav from "../Navbar";
import Image from "next/image";
import logo from "../../../../public/images/logo.png";
import imageUrl from "../../../../public/images/bg.svg";
import landingGroup from "../../../../public/images/landing-group.svg";
import landingGroup2 from "../../../../public/images/landing-group2.svg";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import CarouselPlugin from "../curoseal";
import Footer from "../Footer/footer";
import { JoinClass } from "../modal/JoinClass";
import {CreateClass} from '../modal/CreateClass'

const Home = () => {
  return (
    <div >
      <Nav />
      {/* <div className="h-screen  bg-[#08071a]"></div> */}
      <Image
        src={imageUrl}
        alt="Login image"
        className="absolute object-fill -z-10 w-full"
      />
      <main className="bg-[#0A0118]  items-center pt-48 justify-between flex flex-col space-y-28">
        <div className="flex justify-between ">
          <h1 className=" pt-48 text-white font-bold tracking-wider text-6xl">
            New Era Of Learning
          </h1>
        </div>
        <div className=" w-[90%] flex justify-center text-white font-mono font-medium text-lg">
          <p className="tracking-wide  mt-10 text-center">
            Welcome to EDUNEST. Empower educators and learners with seamless
            collaboration through doubt clearing, task management, and resource
            sharing. Teachers can effortlessly create virtual classrooms and
            conduct live classes. Our user-friendly interface and robust
            security measures ensure a smooth experience. Join us for a journey
            of discovery in online learning today.
          </p>
        </div>
      
        <div className="flex justify-center space-x-4 ">
        
         <JoinClass/>
         <CreateClass />
        </div>

        <div className="flex justify-center items-center ml-14  ">
          <div className="hidden lg:block">
            <Image
              src={landingGroup}
              alt="Login image"
              className="object-cover -z-10 "
            />
          </div>

          <div className=" p-16 w-[60%]  space-y-3">
            <h1 className="font-bold text-4xl font-serif">Join to a ClassRoom</h1>
            <h6 className="text-sm">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolor
              numquam maxime ab maiores nihil quisquam asperiores a
            </h6>
            {/* <button
              className="boreder rounded-xl bg-[#35259b] p-3"
              type="button"
            >
              Placement Drive &rarr;
            </button> */}
            <JoinClass/>
          </div>
        </div>
        <div className="flex justify-center items-center ">
          <div className="p-16 w-[50%] space-y-3">
            <h1 className="font-bold text-4xl font-serif">Create a ClassRoom</h1>

            <h6>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolor
              numquam maxime ab maiores nihil quisquam asperiores
            </h6>
            {/* <button
              className="boreder rounded-xl bg-[#35259b] p-3"
              type="button"
            >
              Discusion Section &rarr;
            </button> */}
                     <CreateClass />

          </div>

          <div className="hidden lg:block">
            <Image
              src={landingGroup2}
              alt="Login image"
              className="object-cover -z-10 w-full h-auto"
            />
          </div>
        </div>
        <h1 className="font-bold text-5xl"> Upgrade to Premium</h1>
        <h3 className=" text-lg text-center w-[60%]">
          Unlock exclusive features and maximize your experience by subscribing
          now! Gain access to premium content, advanced tools, and personalized
          benefits. Elevate your journey with us and enjoy a seamless, enhanced
          user experience. Subscribe today and unlock the full potential of our
          platform.
        </h3>
        <div className="flex flex-row space-x-28 ">
          <CarouselPlugin />
          <CarouselPlugin />
          <CarouselPlugin />
        </div>

        <Footer />
      </main>
    </div>
  );
};

export default Home;
