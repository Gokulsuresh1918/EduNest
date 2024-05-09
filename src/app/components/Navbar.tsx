"use client";

import React from "react";
import Image from "next/image";
import Logo from "../../../public/images/logo.png";
import { Button } from "@/components/ui/button";

import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

const Nav = () => {
  const { status } = useSession();
  // let status='authenticated'
  return (
    <nav className="absolute w-full text-white h-13">
      <div className="flex items-center justify-between">
        <div>
          <Link href="/">
            <Image className="" src={Logo} alt="Logo" width={90} height={40} />
          </Link>
        </div>

        <div className="hidden md:flex gap-4 rounded">
          <Button
            className="text-gray-400 text-lg font-bold hover:text-white transition-colors tracking-widest"
            variant="ghost"
          >
            ClassRooms
          </Button>
        </div>

        {status == "authenticated" ? (
          <div className="flex items-center">
            <Link href="/login">
              <Button
                className="m-4 border border-gray-400 rounded-xl"
                onClick={() => signOut()}
                variant="secondary"
              >
                Sign Out
              </Button>
            </Link>
          </div>
        ) : (
          <div className="flex  items-center">
            <Link href="/login">
              <Button
                className="m-4 border border-gray-400 rounded-xl"
                variant="secondary"
              >
                Login
              </Button>
            </Link>

            {/* <Button className="mr-5" asChild>
                <Link href="/signup">signup</Link>
              </Button> */}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Nav;
