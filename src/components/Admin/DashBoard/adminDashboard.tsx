"use client";
import React, { useEffect, useState } from "react";
import Navbar from "../navbar";
import Sidebar from "../sidebar";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { uiStore } from "../../../../globalStore/store";
import UserController from "../../../components/Admin/DashBoard/userController";

const Dashboard: React.FC = () => {
  const router = useRouter();
  const [login, setLogin] = useState(true);
  const { activeSection } = uiStore((state) => state);

  useEffect(() => {
    const checkToken = async () => {
      const token = Cookies.get("token");
      if (!token) {
        setLogin(false);
        router.push("/adminLogin");
      }
    };
    checkToken();
  }, [router]);

  return (
    <>
      {login && (
        <div className="flex min-h-screen">
          <Sidebar />
          <div className="flex flex-col flex-1">
            <Navbar />
            <main className="p-10 font-bold text-3xl text-black">
              {activeSection === "UserController" && <UserController />}
              {activeSection === "ClassroomControl" && <div>Classroom Control Component</div>}
            </main>
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;
