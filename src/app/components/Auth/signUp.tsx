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
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
// import { signIn } from "next-auth/react";

const schema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6),
  confirmPassword: z.string().min(6),
});
type FormField = z.infer<typeof schema>;

const signUpPage = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setError,
    formState: { isSubmitting, errors },
  } = useForm<FormField>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormField> = async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // throw new Error();
      console.log("hello", data);
    } catch (error) {
      setError("root", {
        message: "Error from the backend",
      });
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
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col w-full gap-5"
          >
            <Input
              type="text"
              placeholder="name"
              {...register("name")}
              className="bg-blue-300 rounded-xl border-red-50"
            />
            {errors.name && (
              <p className="text-red-600 text-xs animate-pulse">
                {errors.name.message}
              </p>
            )}

            <Input
              type="email"
              {...register("email")}
              placeholder="Email"
              className="bg-blue-300 rounded-xl border-red-50"
            />
            {errors.email && (
              <p className="text-red-600 text-xs animate-pulse">
                {errors.email.message}
              </p>
            )}

            <Input
              type="password"
              {...register("password")}
              placeholder="Password"
              className="bg-blue-300 rounded-xl border-red-50"
            />
            {errors.password && (
              <p className="text-red-600 text-xs animate-pulse">
                {errors.password.message}
              </p>
            )}

            <Input
              type="password"
              {...register("confirmPassword")}
              placeholder="Confirm Password"
              className="bg-blue-300 rounded-xl border-red-50"
            />
            {errors.confirmPassword && (
              <p className="text-red-600 text-xs animate-pulse">
                {errors.confirmPassword.message}
              </p>
            )}
            <Button
              disabled={isSubmitting}
              type="submit"
              className="bg-blue-800 text-white rounded-xl"
              variant="outline"
            >
              {isSubmitting ? "...Submitting" : " Sign Up"}
            </Button>
            {errors.root && (
              <p className="text-red-500 text-sm animate-pulse">
                {errors.root.message}
              </p>
            )}
          </form>

          <h3 className="text-sm text-red-500">
            Already a User?{" "}
            <a href="/login" className="text-black">
              Click Here
            </a>
          </h3>
        </div>
        <div className="flex justify-center items-center space-x-5 ">
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
