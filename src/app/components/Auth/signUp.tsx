"use client";

import React, { useState } from "react";
import Image from "next/image";
import imageUrl from "../../../../public/images/signupimage.png";
import Link from "next/link";
import Logo from "../../../../public/images/logo.png";
import googleimg from "../../../../public/images/google logo.png";
import githubimg from "../../../../public/images/github-removebg-preview.png";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import  { useRouter } from "next/navigation";
// import { signIn } from "next-auth/react";

const signUpPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const isValidEmail = (email: string) => {
    let emailRegex = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };
  const isValidName = (name: string) => {
    var usernameRegex = /^[A-Za-z0-9_]{5,25}$/;
    return usernameRegex.test(name);
  };
  const isValidPassword = (password: string) => {
    var passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{7,15}$/;
    return passwordRegex.test(password);
  };

  const handleSubmit = async (e: any) => {
    console.log('vannu');
    
    e.preventDefault();
    if (!isValidEmail(email)) {
      setError("email is invalid");

      return;
    }
    if (!isValidName(name)) {
      setError("name is invalid ");
      return;
    }
    if (!isValidPassword(password)) {
      setError("password is invalid");
      return;
    }
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      const data = await res.json(); 
      if (res.ok) {
        //todo here route to the ohter page
        console.log('this responce oky now redirect ');
          router.push("/login");
        
      } else {
        if (res.status === 400) {
          setError("This user already exists");
        } else {
          setError(data.message || "An error occurred");
        }
      }
    } catch (error) {
      setError("Please try again");
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center w-screen overflow-hidden">
      <div className="w-[50%] flex flex-col justify-center">
        <div className="w-full flex justify-center">
          <Link href="/">
            <Image src={Logo} alt="Logo" width={170} height={50} />
          </Link>
        </div>
        <div className="flex flex-col px-44 w-full gap-5">
          <form className="flex flex-col w-full gap-5"  onSubmit={handleSubmit}>
            <Input
              type="text"
              placeholder="name"
              // value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-blue-300 rounded-xl border-red-50"
            />
            <Input
              type="email"
              placeholder="Email"
            
              onChange={(e) => setEmail(e.target.value)}
              className="bg-blue-300 rounded-xl border-red-50"
            />
            <Input
              type="password"
              placeholder="Password"
              // value='Gokul@123'
              onChange={(e) => setPassword(e.target.value)}
              className="bg-blue-300 rounded-xl border-red-50"
            />
            <Input
              type="password"
              placeholder="Confirm Password"
              // value='Gokul@123'
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="bg-blue-300 rounded-xl border-red-50"
            />
            <p className="text-red-600 mb-4 text-[16px]">{error && error}</p>
            <Button
              type="submit"
              className="bg-blue-800 text-white rounded-xl"
              variant="outline"
            >
              Sign Up
            </Button>
          </form>

          <h3 className="text-sm text-red-500">
            Already a User?{" "}
            <a href="/login" className="text-black">
              Click Here
            </a>
          </h3>
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
