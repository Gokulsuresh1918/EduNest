"use client";
import Cookie from "js-cookie";
import { useTheme } from "next-themes";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import imageUrl from "../../../public/images/bg.svg";
import landingGroup from "../../../public/images/landing-group.svg";
import landingGroup2 from "../../../public/images/landing-group2.svg";
import imageUrllight from "../../../public/images/milad-fakurian-UiiHVEyxtyA-unsplash.jpg";
import Footer from "../Footer/footer";
import { CreateClass } from "../Modal/CreateClass";
import { JoinClass } from "../Modal/JoinClass";
import { SparklesCore } from "../Ui/sparkles";
import CarouselPlugin from "./curoseal";
import Nav from "./Navbar";

const Home = () => {
  const [login, setLogin] = useState(false);
  // const value = localStorage.getItem("User") || "";
  const router = useRouter();
  // console.log("user", value);

  const checkToken = async () => {
    const token = Cookie.get("token");
    if (!token) {
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
          <div className="sm:h-[40rem] w-full  flex-col items-center justify-center overflow-hidden rounded-md">
            <h1
              className={`sm:pt-48 ${
                theme === "dark" ? "text-white" : "text-black"
              } font-bold tracking-wider text-xl sm:text-6xl`}
            >
              New Era Of Learning
            </h1>
            <div className="w-[13rem] sm:w-[40rem] h-5   sm:h-40 relative">
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
              <div className="absolute inset-0   h-full [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
            </div>
          </div>
        </div>
        <div className=" w-[90%] flex justify-center text-white font-mono font-medium text-xs sm:text-lg">
          <p
            className={`tracking-wide ${
              theme === "dark" ? "text-white" : "text-black"
            }     text-center `}
          >
            Welcome to EDUNEST. Empower educators and learners with seamless
            collaboration through doubt clearing, task management, and resource
            sharing. Teachers can effortlessly create virtual classrooms and
            conduct live classes. Our user-friendly interface and robust
            security measures ensure a smooth experience. Join us for a journey
            of discovery in online learning today.
          </p>
        </div>

        <div onClick={checkLogin} className="flex justify-center space-x-4">
          <JoinClass
            status={login}
            className="px-4 py-2 bg-blue-500 text-white rounded-md text-sm hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          />
          <CreateClass
            status={login}
            className="px-4 py-2 bg-green-500 text-white rounded-md text-sm hover:bg-green-600 focus:outline-none focus:bg-green-600"
          />
        </div>

        <div className="flex flex-col items-center justify-center text-center sm:flex-row sm:space-x-8">
          <div className="p-6 sm:p-16 w-full sm:w-[60%] space-y-3">
            <h1 className="font-bold text-3xl sm:text-4xl text-center font-serif">
              Join to a ClassRoom
            </h1>
            <h6 className="text-sm text-center">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolor
              numquam maxime ab maiores nihil quisquam asperiores a
            </h6>
            <JoinClass />
          </div>

          <div className="p-6 sm:hidden w-full space-y-3">
            <h1 className="font-bold text-center  text-3xl sm:text-4xl font-serif">
              Create a ClassRoom
            </h1>
            <h6 className="text-center">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolor
              numquam maxime ab maiores nihil quisquam asperiores
            </h6>
            <CreateClass />
          </div>

          <div className="hidden sm:block p-6 w-[40%]">
            <Image
              src={landingGroup}
              alt="Login image"
              className="object-cover -z-10"
            />
          </div>

          <div className="hidden lg:block p-6 w-[50%]">
            <Image
              src={landingGroup2}
              alt="Login image"
              className="object-cover -z-10 w-full h-auto"
            />
          </div>
        </div>
        <div className=" p-6 rounded-lg shadow-md text-center">
          <h1 className="font-bold text-2xl sm:text-5xl mb-4">
            Upgrade to Premium
          </h1>
          <h3 className="text-xs sm:text-sm md:text-base text-center text-gray-700">
            Unlock exclusive features and maximize your experience by
            subscribing now! Gain access to premium content, advanced tools, and
            personalized benefits. Elevate your journey with us and enjoy a
            seamless, enhanced user experience. Subscribe today and unlock the
            full potential of our platform.
          </h3>
          {/* Optional button for subscription */}
          <button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Subscribe Now
          </button>
        </div>

        <Footer />
      </main>
    </div>
  );
};

export default Home;
