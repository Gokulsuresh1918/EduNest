"use client";
import { Button } from "@/components/Ui/button";
import { Input } from "@/components/Ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import Cookie from "js-cookie";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";
import Cookies from "js-cookie";
import { userStore } from "../../../../globalStore/store";
import githubimg from "../../../../public/images/githublogo.png";
import googleimg from "../../../../public/images/google logo.png";
import Logo from "../../../../public/images/logo.png";
import imageUrl from "../../../../public/images/adminilogin.jpeg";

const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL;
const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});
type FormField = z.infer<typeof schema>;

const AdminLoginPage = () => {
  const { data, status } = useSession();
  const setUser = userStore((state) => state.setUser);
  const user = userStore((state) => state.user);
  const [loading, SetLoading] = useState(true);
  const [login, setLogin] = useState(false);


  const router = useRouter();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormField>({
    defaultValues: {
      email: "edunestofficials@gmail.com",
      password: "asdfasdf",
    },
    resolver: zodResolver(schema),
  });
  useEffect(() => {
    const checkToken = async () => {
      const token = Cookies.get('token');
      console.log(token)
      if (!token) {
        setLogin(true);
      }else{
        router.push('/adminDashboard')
      }
    };
    checkToken();
  }, [router]);

  const onSubmit: SubmitHandler<FormField> = async (data) => {
    try {
      const response = await axios.post(`${BASE_URL}/auth/login`, data);

      if (
        response.data &&
        response.data.accessToken &&
        response.data.user.role === "admin"
      ) {
        Cookie.set("token", response.data.accessToken, {
          expires: 7,
          secure: true,
          sameSite: "strict",
        });

        setUser(response.data.user);
        localStorage.setItem("User", JSON.stringify(response.data.user));
        // console.log("linke 63 login.tsx");

        router.push("/adminDashboard");
      } else {
        toast.error("Not authorized as admin", {
          position: "top-right",
        });
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data?.error) {
        toast.error(error.response.data.error, {
          position: "top-right",
        });
      } else {
        toast.error("Unexpected error occurred", {
          position: "top-right",
        });
      }
    }
  };

  return (
    <>
     {login && (
      <div className="flex justify-center w-screen overflow-hidden">
        <div className="w-[50%] hidden h-screen sm:block">
          <Image
            src={imageUrl}
            alt="Login image"
            className="object-cover h-full w-full "
          />
        </div>
        <div className="w-[50%] flex flex-col justify-center bg-white">
          <div className="w-full flex justify-center">
            <Link href="/">
              <Image src={Logo} alt="Logo" width={170} height={50} />
            </Link>
          </div>
          <div className="flex flex-col lg:px-40 md:px-32 w-full gap-5">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col w-full gap-5"
            >
              <Input
                {...register("email")}
                type="email"
                placeholder="Email"
                className="bg-blue-300 rounded-xl border-red-50"
              />
              {errors.email && (
                <p className="text-red-700 text-sm animate-pulse">
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
                <p className="text-red-600 text-sm animate-pulse">
                  {errors.password.message}
                </p>
              )}

              <Button
                disabled={isSubmitting}
                className="bg-blue-800 rounded-xl text-white"
                variant="outline"
              >
                {isSubmitting ? "...Loading" : "Log In"}
              </Button>
              {errors.root && (
                <p className="text-red-500 text-xl animate-pulse">
                  {errors.root.message}
                </p>
              )}
            </form>
            <div className="flex justify-center">
              <h3 className="text-lg text-red-800 flex justify-center">
                New User?{" "}
                <a href="/signup" className="text-black">
                  SIGN UP
                </a>
              </h3>
            </div>

            <div className="flex justify-center items-center space-x-5">
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
     )}
    </>
  );
};

export default AdminLoginPage;
