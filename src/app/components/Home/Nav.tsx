import React from "react";
import Image from "next/image";
import Logo from "../../../../public/images/logo.png";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Nav = () => {
  return (
    <nav className="bg-white -md h-13">
      <div>
        <div className="flex items-center justify-between">
          <Link href='/'>
          <Image
            className="ml-5"
            src={Logo}
            alt="Logo"
            width={80}
            height={30}
          />
          </Link>
      

          <div className="hidden md:flex gap-4 rounded ">
            <a
              href="#"
              className="text-gray-700 hover:text-gray-600 transition-colors"
              aria-current="page"
            >
              ClassRooms
            </a>
          </div>

          <div className="flex items-center">
            {/* Wrapping the Button component with Link for navigation */}
            <Link href="/login">
              <Button className="m-4" variant="secondary">
                login
              </Button>
            </Link>
            <Button className="mr-5" asChild>
              <Link href="/signup">signup</Link>
            </Button>
          
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
