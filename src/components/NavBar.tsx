'use client'

import Image from "next/image";
import React, { useEffect, useState } from "react";
import logo from "../../public/images/logo.png";
import { userStore, classroomStore } from "../../globalStore/store";
import { useRouter } from "next/navigation";
import { createPortal } from "react-dom";
import ProfilePge from "../components/Profile";
import Link from "next/link";
import { toast } from "react-toastify";

const useForceUpdate = () => {
  const [value, setValue] = useState(0);
  return () => setValue(value => value + 1);
};

interface UserStatus {
  isSubscribed: boolean;
}

const NavBar = () => {
  const user = userStore((state) => state.user);
  const [profile, setProfile] = useState(false);
  const Router = useRouter();
  const [userStat, setUserStat] = useState<UserStatus | null>(null);
  const forceUpdate = useForceUpdate();

  function handleProfile() {
    setProfile(!profile);
  }

  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "User") {
        forceUpdate();
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [forceUpdate]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userJSON = localStorage.getItem("User");
      const user = userJSON ? JSON.parse(userJSON) : null;
      setUserStat(user ? user.isSubscribed : null);
    }
  }, [profile]); 

  return (
    <>
      {profile && createPortal(<ProfilePge status={setProfile} />, document.body)}
      <div className="flex justify-between border bg-[#f1eff3] h-12 w-full">
        <div className="flex justify-center items-center">
          {userStat ? (
            <Link href={"/subscription"}>
              <button className="md:block hidden hover:px-6 text-black bg-amber-500 border rounded-xl shadow-md px-5">
                Premium Plan Member
              </button>
            </Link>
          ) : (
            <Link href={"/subscription"}>
              <button className="md:block hidden hover:px-6 text-black bg-amber-500 border rounded-xl shadow-md px-5">
                Buy Pro
              </button>
            </Link>
          )}
        </div>
        <div onClick={handleProfile} className="flex justify-center items-center">
          <h2 className="text-black p-1 font-serif text-lg hidden sm:block shadow-2xl mr-2">
            {user?.name || "Guest"}
          </h2>
          <div onClick={handleProfile} className="rounded-full bg-black mr-3 w-10 h-10 sm:w-11 sm:h-11">
            <Image src={logo} alt="logo" width={50} height={50} />
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBar;
