import React from "react";
import Image from "next/image";
import imageUrl from "../../../../public/images/signupimage.png";
import Link from "next/link";
import Logo from "../../../../public/images/logo.png";
import googleimg from "../../../../public/images/google logo.png";
import githubimg from "../../../../public/images/github-removebg-preview.png";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const signUpPage = () => {
  return (
    <div className=" flex justify-center w-screen overflow-hidden">
      <div className="w-[50%] flex flex-col justify-center ">
        <div className="w-full flex justify-center">
          <Link href="/">
            <Image src={Logo} alt="Logo" width={170} height={50} />
          </Link>
        </div>
        <div className=" flex flex-col px-44 w-full gap-5">
          <Input type="text" placeholder="Name" className="bg-blue-300 " />
          {/* bg-[#645FB7] */}
          <Input type="email" placeholder="Email" className="bg-blue-300  " />
          <Input
            type="password"
            placeholder="Password"
            className="bg-blue-300 "
          />
          <Input
            type="password"
            placeholder="Confirm Password"
            className="bg-blue-300 "
          />
          <Button className="bg-blue-800 text-white " variant="outline">
            Sign Up
          </Button>
          <h3 className="text-sm text-red-500">
            Already User ?{" "}
            <a href="/login" className="text-black">
              Click Here
            </a>
          </h3>
          <div className="flex justify-center items-center space-x-5">
            <Image src={googleimg} alt="google logo" width={40} height={45} />
            <Image src={githubimg} alt="github logo" width={60} height={60} />
          </div>
        </div>
      </div>

      <div className="w-[50%] hidden h-screen sm:block">
        <Image
          src={imageUrl}
          alt="Login image"
          className="object-cover h-full w-full"
        />
      </div>
    </div>
  );
};

export default signUpPage;
