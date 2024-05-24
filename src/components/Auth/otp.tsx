"use client";

import React, { useEffect, useState } from "react";

import Image from "next/image";
import imageUrl from "../../../public/images/signupimage.png";
import Link from "next/link";
import Logo from "../../../public/images/logo.png";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL;

const OtpPage = () => {
  const router = useRouter();
  const [timer, setTimer] = useState<number>(45);
  const [otpValue, setOtpValue] = useState<string>("");
  const [otp, setOTP] = useState("");

  useEffect(() => {
    let interval: any;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }
    return () => {
      clearInterval(interval);
    };
  }, [timer]);

  const handleReset = async (e: React.MouseEvent<HTMLButtonElement>) => {
    setTimer(30);
    // const email = localStorage.getIstem("email");

    try {
      const response = await axios.post(`${BASE_URL}/auth/resendOtp`);
      if (response) {
        toast.success("Resend Otp Send To Mail", {
          position: "top-left",
        });
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data) {
        toast.error(error.response.data.error, { position: "top-left" });
      } else {
        console.log("An unexpected error occurred:", error);
      }
    }
  };

  const handleCheckOtp = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const userEnteredOTP = otp;
    // console.log("userEnteredOTP is :", userEnteredOTP);
    const data = {
      userEnteredOTP,
    };

    try {
      const response = await axios.post(
        `${BASE_URL}/auth/otpVerification`,
        data,
        {
          withCredentials: true,
        }
      );

      if (response) {
        toast.success("OTP Verification completed login ", {
          position: "top-left",
        });

        router.push("/login");
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data) {
        toast.error(error.response.data.error, { position: "top-left" });
      } else {
        console.log("An unexpected error occurred:", error);
      }
    }
  };


  const handleOTPChange = (newOTP: React.SetStateAction<string>) => {
    setOTP(newOTP);
  };
  return (
    <div className="flex justify-center w-screen overflow-hidden">
      <div className="w-[50%] flex flex-col bg-white text-black">
        <div className="w-full flex  justify-center ">
          <Link href="/">
            <Image src={Logo} alt="Logo" width={170} height={50} />
          </Link>
        </div>
        <div className="flex flex-col px-44 w-full gap-5">
          <form className="flex flex-col w-full gap-5">
            <h2 className="flex justify-center text-lg font-semibold">
              Enter Your OTP
            </h2>
            <InputOTP value={otp} onChange={handleOTPChange} maxLength={6}>
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
            <p className="text-sm">
              Please enter the one-time password sent to your Email.
            </p>

            <Button
              type="submit"
              onClick={handleCheckOtp}
              className="bg-blue-400 text-white rounded-xl"
              variant="outline"
            >
              Submit
            </Button>
            <p>--------------OR-------------</p>

            {timer > 0 ? (
              <div className="flex justify-center  text-black rounded-xl">
                Resend OTP After :
                <span className="text-red-600 text-base  font-semibold  ">
                  {timer}
                </span>
              </div>
            ) : (
              <Button
                onClick={handleReset}
                className=" bg-blue-500 mb-5 rounded-3xl text-white"
              >
                Resend
              </Button>
            )}
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

export default OtpPage;
