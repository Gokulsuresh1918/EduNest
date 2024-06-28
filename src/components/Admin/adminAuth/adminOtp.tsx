"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/Ui/input-otp";
import { Button } from "@/components/Ui/button";
import Logo from "../../../../public/images/logo.png";
import imageurl from "../../../../public/images/opt_looking-transformed.jpeg";

const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL;

const OtpPage = () => {
  const router = useRouter();
  const [timer, setTimer] = useState<number>(45);
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
    try {
      const response = await axios.post(`${BASE_URL}/auth/resendOtp`);
      if (response) {
        toast.success("Resend OTP sent to your email", {
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
    const data = { userEnteredOTP };

    try {
      const response = await axios.post(
        `${BASE_URL}/auth/otpVerification`,
        data,
        {
          withCredentials: true,
        }
      );

      if (response) {
        toast.success("OTP Verification completed. Redirecting to login.", {
          position: "top-left",
        });

        router.push("/adminLogin");
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
    <div className="flex flex-col md:flex-row justify-center w-screen overflow-hidden bg-gray-100">
      <div className="w-full md:w-[50%] flex flex-col bg-white text-black p-5 md:p-10">
        <div className="w-full flex justify-center mb-5">
          <Link href="/">
            <Image src={Logo} alt="Logo" width={170} height={50} />
          </Link>
        </div>
        <div className="flex flex-col w-full gap-5">
          <form className="flex flex-col w-full gap-5">
            <h2 className="flex justify-center text-lg font-semibold">
              Admin OTP Verification
            </h2>
            <div className="flex justify-center">
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
            </div>
            <p className="text-sm text-gray-600 text-center">
              Please enter the one-time password sent to your email.
            </p>

            <Button
              type="submit"
              onClick={handleCheckOtp}
              className="bg-blue-600 text-white rounded-xl"
              variant="outline"
            >
              Submit
            </Button>
            <p className="text-center">--------------OR-------------</p>

            {timer > 0 ? (
              <div className="flex justify-center text-black rounded-xl">
                Resend OTP After:
                <span className="text-red-600 text-base font-semibold ml-2">
                  {timer}
                </span>
              </div>
            ) : (
              <Button
                onClick={handleReset}
                className="bg-blue-500 mt-5 rounded-3xl text-white"
              >
                Resend
              </Button>
            )}
          </form>
        </div>
      </div>

      <div className="hidden md:block w-[50%] h-screen">
        <Image
          src={imageurl}
          alt="Admin OTP Verification"
          className="object-cover h-full w-full"
        />
      </div>
    </div>
  );
};

export default OtpPage;
