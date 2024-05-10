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
  const isLoggedIn = !!cookies.token;

  console.log("statuss", isLoggedIn);
  const handleLogin = () => {
    router.push("/login");
  };

  const { theme, setTheme } = useTheme();

  return (
    <nav className="absolute w-full text-white h-13">
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
            className="text-gray-400 text-lg font-bold hover:text-white transition-colors tracking-widest"
            variant="ghost"
          >
            ClassRooms
          </Button>
        </div>

        {/* //todo here login using signup signout not changed */}
        {status == "authenticated" ? (
          <div className="flex items-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                  <span className="sr-only">Toggle theme</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme("light")}>
                  Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                  Dark
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>
                  System
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button
              className="m-4 border border-gray-400 rounded-xl"
              onClick={() => signOut()}
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
                  <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                  <span className="sr-only">Toggle theme</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme("light")}>
                  Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                  Dark
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>
                  System
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button
              onClick={handleLogin}
              className="m-4 border border-gray-400 rounded-xl"
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
