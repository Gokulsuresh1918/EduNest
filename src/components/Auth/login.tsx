"use client";
import { Button } from "@/components/Ui/button";
import { Input } from "@/components/Ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import Cookies from "js-cookie";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import { z } from "zod";
import { userStore } from "../../../globalStore/store";
import githubimg from "../../../public/images/githublogo.png";
import googleimg from "../../../public/images/google logo.png";
import Logo from "../../../public/images/logo.png";
import imageUrl from "../../../public/images/signupimage.png";

const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL;

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

type FormField = z.infer<typeof schema>;

const LoginPage = () => {
  const { data, status } = useSession();
  const setUser = userStore((state) => state.setUser);
  const user = userStore((state) => state.user);
  const [pass, setPass] = useState(true);
  const [emailSent, setEmailSent] = useState(false);
  const [login, setLogin] = useState(false);
  const [foremail, setForeEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormField>({
    defaultValues: {
      email: "gokulanandhu1571@gmail.com",
      password: "asdfasdf",
    },
    resolver: zodResolver(schema),
  });

  const router = useRouter();

  useEffect(() => {
    const checkToken = async () => {
      const token = Cookies.get("token");
      if (!token) {
        setLogin(true);
      } else {
        router.back();
      }
    };
    checkToken();
  }, [router]);

  const onSubmit: SubmitHandler<FormField> = async (data) => {
    try {
      const response = await axios.post(`${BASE_URL}/auth/login`, data);
      if (response.data && response.data.accessToken) {
        document.cookie = `token=${response.data.accessToken}; path=/; max-age=604800; Secure; SameSite=Strict`;
        setUser(response.data.user);
        localStorage.setItem("User", JSON.stringify(response.data.user));
        router.push("/");
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data?.error) {
        toast.error(error.response.data.error, {
          position: "top-right",
        });
      } else {
        console.error("Unexpected Error occurred", error);
      }
    }
  };

  const handleSendCode = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${BASE_URL}/user/findUser`, {
        email: foremail,
      });

      if (response.status === 200) {
        setEmailSent(true);
        toast.success("Now you can Change password", { position: "top-right" });
      } else {
        toast.error("User Not Found, Please Sign Up", {
          position: "top-right",
        });
      }
    } catch (error) {
      console.error("Error during user lookup:", error);
      toast.error("An error occurred while sending the code", {
        position: "top-right",
      });
    }
  };

  const handleChangePassword = async () => {
    if (newPassword !== confirmNewPassword) {
      toast.error("Passwords do not match", { position: "top-right" });
      return;
    }

    try {
      const response = await axios.post(`${BASE_URL}/user/findUser`, {
        email: foremail,
        newPassword: newPassword,
      });
   


      if (response.status === 200) {
        toast.success("Password changed successfully, Log In with New PassWord", {
          position: "top-right",
        });
        router.push('/login')
        setPass(true);
        setEmailSent(false);
      }
    } catch (error) {
      console.error("Error changing password:", error);
      toast.error("An error occurred while changing the password .Try Sign Up", {
        position: "top-right",
      });
    }
  };

  const ForgetPass = () => {
    setPass(!pass);
    setEmailSent(false);
  };

  return (
    <>
      {login && (
        <div className="flex justify-center w-screen overflow-hidden">
          <div className="w-[50%] hidden h-screen sm:block">
            <Image
              src={imageUrl}
              alt="Login image"
              className="object-cover h-full w-full"
            />
          </div>
          <div className="w-[50%] flex flex-col justify-center bg-white">
            <div className="w-full flex justify-center">
              <Link href="/">
                <Image src={Logo} alt="Logo" width={170} height={50} />
              </Link>
            </div>
            <div>
              {pass ? (
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="flex flex-col px-44 w-full gap-4"
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
              ) : (
                <form
                  onSubmit={handleSendCode}
                  className="flex flex-col px-44 w-full gap-4"
                >
                  {!emailSent && (
                    <>
                      <h1 className=" font-semibold  text-center overflow-hidden">
                        <span
                          className="scrolling-text text-red-500 inline-block"
                          style={{ animation: "marquee 10s linear infinite" }}
                        >
                          Enter Your Email to Change Password
                        </span>
                      </h1>

                      <Input
                        type="email"
                        value={foremail}
                        onChange={(e) => setForeEmail(e.target.value)}
                        placeholder="Enter your Email"
                        className="bg-blue-300 rounded-xl border-red-50"
                      />
                      <Button
                        type="submit" // Add type attribute as submit
                        className="bg-blue-800 rounded-xl text-white"
                        variant="outline"
                      >
                        Send Code
                      </Button>
                    </>
                  )}
                </form>
              )}
              {emailSent && (
                <div className="flex flex-col px-44 w-full gap-4">
                  <Input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter New Password"
                    className="bg-blue-300 rounded-xl border-red-50"
                  />
                  <Input
                    type="password"
                    value={confirmNewPassword}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                    placeholder="Confirm New Password"
                    className="bg-blue-300 rounded-xl border-red-50"
                  />
                  <Button
                    onClick={handleChangePassword}
                    className="bg-blue-800 rounded-xl text-white"
                    variant="outline"
                  >
                    Change Password
                  </Button>
                </div>
              )}
              {pass && (
                <div className="flex justify-center">
                  <h3
                    onClick={ForgetPass}
                    className="text-sm p-4 text-red-800 flex justify-center cursor-pointer"
                  >
                    Forget Password?
                  </h3>
                </div>
              )}
              <div className="flex justify-center">
                <h3 className="text-lg text-red-800 flex justify-center">
                  New User?{" "}
                  <Link href="/signup" className="text-black">
                    SIGN UP
                  </Link>
                </h3>
              </div>
              <div className="flex justify-center items-center space-x-5">
                <Image
                  onClick={() => signIn("google")}
                  src={googleimg}
                  alt="google logo"
                  width={40}
                  height={45}
                  className="cursor-pointer"
                />
                <Image
                  onClick={() => signIn("github")}
                  src={githubimg}
                  alt="github logo"
                  width={60}
                  height={60}
                  className="cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>
      )}
      <ToastContainer />
      <style jsx>{`
      @keyframes marquee {
        0% {
          transform: translateX(100%);
        }
        100% {
          transform: translateX(-100%);
        }
      }
    `}</style>
    </>
  );
};

export default LoginPage;
