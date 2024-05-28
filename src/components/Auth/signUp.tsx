"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";
import githubimg from "../../../public/images/githublogo.png";
import googleimg from "../../../public/images/google logo.png";
import Logo from "../../../public/images/logo.png";
import imageUrl from "../../../public/images/signupimage.png";



const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL;
const handleGoogleSignIn = () => {
  window.open(`${BASE_URL}/auth/google/callback`, "_self");
};
const handleGithubSignIn = () => {
  window.open(`${BASE_URL}/auth/github/callback`, "_self");
};

const schema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6,{message:'password must be minimum 6 character'}),
  confirmPassword: z.string().min(6),
});

type FormField = z.infer<typeof schema>;

const SignUpPage = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setError,
    formState: { isSubmitting, errors },
  } = useForm<FormField>({
    resolver: zodResolver(schema),
  });

  async function onSubmit(values: FormField) {
    try {
      if (values.password !== values.confirmPassword) {
        toast.error("confirm password and password must be equal", {
          position: "top-right",
        });        
        return;
      }
      const response = await axios.post(`${BASE_URL}/auth/signup`, values);

      if (response) {
        console.log(response.data);
        router.replace('/otpPage')
      }
    } catch (error) {
      console.log("error");
      
      if (axios.isAxiosError(error) && error.response?.data?.error) {
        toast.error(error.response.data.error, {
          position: "top-right",
        });
        console.log("error in post ", error.response.data.error);
      } else {
        console.log("An unexpected error occurred:", error);
      }
    }
  }

  return (
    <div className="flex justify-center w-screen overflow-hidden">
      <div className="w-[50%] flex bg-white flex-col justify-start">
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
            onClick={handleGoogleSignIn}
            src={googleimg}
            alt="google logo"
            width={40}
            height={45}
          />
          <Image
            onClick={handleGithubSignIn}
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

export default SignUpPage;
