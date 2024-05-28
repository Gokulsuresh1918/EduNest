"use client";
import { BookOpen, GraduationCap, ListTodo, VideoIcon } from "lucide-react";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {SideBarJoin} from "../joined/SideBarRightJoin";
const Sidenav = () => {
  const router = useRouter();
  const [side, setSide] = useState(false);

  const handleClick = () => {
    router.push("/");
  };

  const handleAssignTask = () => {
    // Add your logic here
    setSide(true);
  };

  const handleTodo = () => {
    router.push("/");
  };

  const handleQuiz = () => {
    router.push("/");
  };

  return (
    <div className="sm:w-56 hidden h-screen bg-[#f1eff3] sm:block flex-row">
      {side && <SideBarJoin />}
      <div
        onClick={handleClick}
        className="flex flex-col space-x-2 justify-center cursor-pointer items-center pt-5 w-[80%]"
      >
        <h1 className="font-bold text-4xl text-cyan-800">EduNest</h1>
        <h1 className="text-xs text-cyan-800">👑 Upgrade to Pro 👑</h1>
        <hr className="mt-3" />
      </div>
      <div className="mt-5">
        <div
          onClick={handleAssignTask}
          className="group flex gap-3 mt-2 p-3 text-[18px] items-center text-gray-500 cursor-pointer hover:bg-[#624DE3] hover:text-white rounded-md transition-all ease-in-out duration-200"
        >
          <BookOpen className="group-hover:animate-bounce" />
          <h2>Assigned Task</h2>
        </div>
        <div
          onClick={handleTodo}
          className="group flex gap-3 mt-2 p-3 text-[18px] items-center text-gray-500 cursor-pointer hover:bg-[#624DE3] hover:text-white rounded-md transition-all ease-in-out duration-200"
        >
          <ListTodo className="group-hover:animate-bounce" />
          <h2>Todo</h2>
        </div>
        <div
          onClick={handleQuiz}
          className="group flex gap-3 mt-2 p-3 text-[18px] items-center text-gray-500 cursor-pointer hover:bg-[#624DE3] hover:text-white rounded-md transition-all ease-in-out duration-200"
        >
          <GraduationCap className="group-hover:animate-bounce" />
          <h2>Quiz</h2>
        </div>
        <div
          onClick={handleQuiz}
          className="group flex gap-3 mt-2 p-3 text-[18px] items-center text-gray-500 cursor-pointer hover:bg-[#624DE3] hover:text-white rounded-md transition-all ease-in-out duration-200"
        >
          <VideoIcon className="group-hover:animate-bounce" />
          <h2>Join Class</h2>
        </div>
      </div>
    </div>
  );
};

export default Sidenav;
