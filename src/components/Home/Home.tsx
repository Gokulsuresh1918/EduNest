"use client";
import React, { useEffect, useState } from "react";
import Nav from "./Navbar";
import Image from "next/image";
import logo from "../../../../public/images/logo.png";
import imageUrl from "../../../public/images/bg.svg";
import imageUrllight from "../../../public/images/milad-fakurian-UiiHVEyxtyA-unsplash.jpg";
import landingGroup from "../../../public/images/landing-group.svg";
import landingGroup2 from "../../../public/images/landing-group2.svg";
import { Moon, Sun, UserRound } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import CarouselPlugin from "./curoseal";
import Footer from "../Footer/footer";
import { JoinClass } from "../modal/JoinClass";
import { CreateClass } from "../modal/CreateClass";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Cookie from "js-cookie";
import { ToastContainer, toast } from "react-toastify";
import { SparklesCore } from "../ui/sparkles";

const Home = () => {
  const [login, setLogin] = useState(false);
  // const value = localStorage.getItem("User") || "";
  const router = useRouter();
  // console.log("user", value);

  const checkToken = async () => {
    const token = Cookie.get("token");
    if (!token) {
      toast.error("Please log in to Continue");
      router.push("/login");
    } else {
      setLogin(true);
    }
  };

  function checkLogin() {
    if (!login) {
      checkToken();
      return;
    }
  }

  const { theme, setTheme } = useTheme();
  // console.log('check-theme',theme);

  return (
    <div>
      <Nav />
      {/* <div className="h-screen  bg-[#08071a]"></div> */}
      {theme == "dark" ? (
        <Image
          src={imageUrl}
          alt="Login image"
          className="absolute object-fill -z-10 w-full"
        />
      ) : (
        <Image
          src={imageUrllight}
          alt="Login image"
          className="absolute object-fill -z-10 w-full"
        />
      )}
      <main className="    items-center pt-36 justify-between flex flex-col space-y-28">
        <div className="flex justify-between ">
          <div className="h-[40rem] w-full  flex-col items-center justify-center overflow-hidden rounded-md">
            <h1
              className={`pt-48 ${
                theme === "dark" ? "text-white" : "text-black"
              } font-bold tracking-wider text-6xl`}
            >
              New Era Of Learning
            </h1>
            <div className="w-[40rem] h-40 relative">
              {/* Gradients */}
              <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
              <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
              <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
              <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />

              {/* Core component */}
              <SparklesCore
                background="transparent"
                minSize={0.4}
                maxSize={1}
                particleDensity={1200}
                className="w-full h-full"
                particleColor="#FFFFFF"
              />

              {/* Radial Gradient to prevent sharp edges */}
              <div className="absolute inset-0 w-  h-full [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
            </div>
          </div>
        </div>
        <div className=" w-[90%] flex justify-center text-white font-mono font-medium text-lg">
          <p
            className={`tracking-wide ${
              theme === "dark" ? "text-white" : "text-black"
            }   mt-10 text-center`}
          >
            Welcome to EDUNEST. Empower educators and learners with seamless
            collaboration through doubt clearing, task management, and resource
            sharing. Teachers can effortlessly create virtual classrooms and
            conduct live classes. Our user-friendly interface and robust
            security measures ensure a smooth experience. Join us for a journey
            of discovery in online learning today.
          </p>
        </div>

        <div onClick={checkLogin} className="flex justify-center space-x-16 ">
          <JoinClass />
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
            <h1 className="font-bold text-4xl font-serif">
              Join to a ClassRoom
            </h1>
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
            <JoinClass />
          </div>
        </div>
        <div className="flex justify-center items-center ">
          <div className="p-16 w-[50%] space-y-3">
            <h1 className="font-bold text-4xl font-serif">
              Create a ClassRoom
            </h1>

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
