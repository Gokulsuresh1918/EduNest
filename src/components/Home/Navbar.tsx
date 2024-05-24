"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Logo from "../../../public/images/logo.png";
import { Button } from "@/components/ui/button";
import { destroyCookie, parseCookies } from "nookies";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import Cookies from "js-cookie";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Nav = () => {
  const { status } = useSession();
  const router = useRouter();
  const cookies = parseCookies();
  // Check if the code is running in the browser before accessing localStorage
  const value =
    typeof window !== "undefined" ? localStorage.getItem("User") || "" : "";

  const handleLogin = () => {
    router.push("/login");
  };

  const handleSignout = () => {
    // Remove the token cookie
    Cookies.remove("token", {
      secure: true,
      sameSite: "strict",
    });

    // Remove the User item from localStorage
    if (typeof window !== "undefined") {
      localStorage.removeItem("User");
    }

    // Perform the sign out operation
    signOut();
  };

  const { theme, setTheme } = useTheme();

  // Update body class based on the theme
  useEffect(() => {
    if (theme === "dark") {
      document.body.classList.add("theme-dark");
      document.body.classList.remove("theme-light");
    } else {
      document.body.classList.add("theme-light");
      document.body.classList.remove("theme-dark");
    }
  }, [theme]);

  return (
    <nav className="absolute w-full text-white h-10">
      <div className="flex items-center justify-between">
        <div>
          <Image
            onClick={() => router.push("/")}
            className=""
            src={Logo}
            alt="Logo"
            width={90}
            height={40}
          />
        </div>

        <div className="hidden md:flex gap-4 rounded">
          <Button
            className={`text-gray-400 text-lg ${theme === "dark"?'text-gray-100':'text-gray-900'} font-bold hover:text-white transition-colors tracking-widest`}
            variant="ghost"
          >
            ClassRooms
          </Button>
        </div>

        {status == "authenticated" || value ? (
          <div className="flex items-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <Sun color="#333"
                    onClick={() => setTheme("dark")}
                    className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
                  />
                  <Moon color="#ffffff"
                    onClick={() => setTheme("light")}
                    className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
                  />
                </Button>
              </DropdownMenuTrigger>
            </DropdownMenu>
            <Button
              className={`m-4 border ${theme === "dark"?'text-gray-100 border-gray-400':'text-gray-900 border-gray-950'}  rounded-xl`}
              onClick={handleSignout}
              variant="secondary"
            >
              Sign Out
            </Button>
          </div>
        ) : (
          <div className="flex items-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <Sun color="#333"
                    onClick={() => setTheme("dark")}
                    className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
                  />
                  <Moon 
                    onClick={() => setTheme("light")}
                    className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
                  />
                </Button>
              </DropdownMenuTrigger>
            </DropdownMenu>
            <Button
              onClick={handleLogin}
              className={`m-4 border ${theme==='dark'?'text-slate-300':'text-slate-950 '} border-gray-400 rounded-xl`}
              variant="secondary"
            >
              Login
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Nav;
