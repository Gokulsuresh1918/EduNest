"use client";
import Nav from "@/components/Home/Navbar";
import { GlareCard } from "@/components/Ui/glare-card";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL;
const Classrooms = () => {
  const [togleSelection, settogleSelection] = useState(false);
  const [userDetails, setUserDetails] = useState(null);

  function handleSelection() {
    settogleSelection(true);
  }
  function handleSelectioncre() {
    settogleSelection(false);
  }
  useEffect(() => {
    const fetchUserDetails = async () => {
      const userJson = localStorage.getItem("User");
      if (userJson) {
        try {
          const user = JSON.parse(userJson);
          const userId = user?._id;

          if (userId) {
            const response = await axios.get(
              `${BASE_URL}/user/userData/${userId}`
            );
            setUserDetails(response.data);
          } else {
            toast.error("User ID not found in localStorage");
          }
        } catch (error) {
          console.error("Error parsing user data or fetching details:", error);
          toast.error("Failed to fetch user details");
        }
      } else {
        toast.error("Pls Login No user data found");
        console.log("No user data found in localStorage");
      }
    };

    fetchUserDetails();
  }, []);
  return (
    <>
      <div className="flex flex-col h-screen gap-16  sm:gap-24">
        <nav className="w-full">
          <Nav />
        </nav>

        <main className="flex-grow p-4 flex flex-col items-center">
          <div className="flex space-x-4 mb-4">
            <button
              onClick={handleSelection}
              className="inline-flex h-12 animate-shimmer items-center justify-center rounded-xl border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-200 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
            >
              Joined
            </button>
            <button
              onClick={handleSelectioncre}
              className="inline-flex h-12 animate-shimmer items-center justify-center rounded-xl border border-slate-700 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-200 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
            >
              Created
            </button>
          </div>
          <div className="flex flex-wrap justify-center gap-4 ">
            {togleSelection ? (
              <GlareCard className="relative flex flex-col items-start justify-end py-8 px-6">
                <img
                  className="h-full w-full absolute inset-0 object-cover"
                  src="https://images.unsplash.com/photo-1512618831669-521d4b375f5d?q=80&w=3388&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                />
                <div className="relative z-10">
                  <p className="font-bold font-serif text-white text-xl">
                    Joined
                  </p>
                  <p className="font-normal text-base text-neutral-200 mt-4">
                    The greatest trick the devil ever pulled was to convince the
                    world that he didn&apos;t exist.
                  </p>
                </div>
              </GlareCard>
            ) : (
              <GlareCard className="relative flex flex-col items-start justify-end py-8 px-6">
                <img
                  className="h-full w-full absolute inset-0 object-cover"
                  src="https://images.unsplash.com/photo-1512618831669-521d4b375f5d?q=80&w=3388&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                />
                <div className="relative z-10">
                  <p className="font-bold font-serif text-white text-xl">
                    Created
                  </p>
                  <p className="font-normal text-base text-neutral-200 mt-4">
                    The greatest trick the devil ever pulled was to convince the
                    world that he didn&apos;t exist.
                  </p>
                </div>
              </GlareCard>
            )}
          </div>
        </main>
      </div>
      <ToastContainer />
    </>
  );
};

export default Classrooms;
