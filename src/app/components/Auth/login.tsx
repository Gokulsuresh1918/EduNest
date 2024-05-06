"use client";

import React from "react";
import Image from "next/image";
import imageUrl from "../../../../public/images/signupimage.png";
import Link from "next/link";
import Logo from "../../../../public/images/logo.png";
import googleimg from "../../../../public/images/google logo.png";
import githubimg from "../../../../public/images/github-removebg-preview.png";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { signIn, useSession } from "next-auth/react";

const loginPage = () => {
  const { data, status } = useSession();
  console.log("status", status);

  return (
    <div className=" flex justify-center w-screen overflow-hidden">
      <div className="w-[50%] hidden h-screen sm:block">
        <Image
          src={imageUrl}
          alt="Login image"
          className="object-cover h-full w-full "
        />
      </div>
      <div className="w-[50%] flex flex-col justify-center ">
        <div className="w-full flex justify-center ">
          <Link href="/">
            <Image src={Logo} alt="Logo" width={170} height={50} />
          </Link>
        </div>
        <div className=" flex flex-col px-44 w-full gap-5 ">
          {/* bg-[#645FB7] */}
          <Input
            type="email"
            placeholder="Email"
            className="bg-blue-300 rounded-xl  border-red-50"
          />
          <Input
            type="password"
            placeholder="Password"
            className="bg-blue-300 rounded-xl border-red-50 "
          />

          <Button
            className="bg-blue-800 rounded-xl text-white  "
            variant="outline"
          >
            Log In
          </Button>
          <h3 className="text-sm text-red-500">
            New User ?{" "}
            <a href="/signup" className="text-black">
              Click Here
            </a>
          </h3>
          <div className="flex justify-center items-center space-x-5 animate-pulse">
            <Image
              onClick={() => signIn("google")}
              src={googleimg}
              alt="google logo"
              width={40}
              height={45}
            />
            <Image
              onClick={() => signIn("github")}
              src={githubimg}
              alt="github logo"
              width={60}
              height={60}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default loginPage;
