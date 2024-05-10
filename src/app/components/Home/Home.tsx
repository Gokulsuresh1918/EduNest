"use client";
import React from "react";
import Nav from "../Navbar"
import Image from "next/image";
import imageUrl from "../../../../public/images/bg.svg";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Home = () => {
  // Delay rendering until mounted on the client
  

  return (
    <div>
      <Nav />
      {/* <div className="h-screen  bg-[#08071a]"></div> */}
      <Image
        src={imageUrl}
        alt="Login image"
        className="absolute object-cover -z-10 w-full"
      />
      <main className="h-screen w-full items-center pt-48 justify-between flex flex-col space-y-24">
        <div className="flex justify-between ">
          <h1 className=" pt-36 text-white font-bold tracking-wider text-6xl">
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

        <div className="flex justify-center space-x-4">
          <button className="text-white">Join</button>
          <button className="text-white">Create</button>
        </div>
       
      </main>

      <div className="w-full h-screen "></div>
    </div>
  );
};

export default Home;
