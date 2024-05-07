"use client";

import React, { useState } from "react";
import Image from "next/image";
import imageUrl from "../../../../public/images/signupimage.png";
import Link from "next/link";
import Logo from "../../../../public/images/logo.png";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const otpPage = () => {
  return (
    <div className="flex justify-center w-screen overflow-hidden">
      <div className="w-[50%] flex flex-col r">
        <div className="w-full flex  justify-center">
          <Link href="/">
            <Image src={Logo} alt="Logo" width={170} height={50} />
          </Link>
        </div>
        <div className="flex flex-col px-44 w-full gap-5">
          <form className="flex flex-col w-full gap-5">
            <h2 className="flex justify-center text-lg font-semibold">Enter Your OTP</h2>
            <InputOTP maxLength={6}>
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
              </InputOTPGroup>
              <InputOTPSeparator />
              <InputOTPGroup>
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
            <p className="text-sm">Please enter the one-time password sent to your Email.</p>

            <Button
              type="submit"
              className="bg-blue-400 text-white rounded-xl"
              variant="outline"
            >
              {" "}
              Submit
            </Button>
            <p>--------------OR-------------</p>
        
            
            <Button
              type="submit"
              className="bg-blue-400 text-white rounded-xl"
              variant="outline"
            >
              Resend OTP
            </Button>
          </form>
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

export default otpPage;
