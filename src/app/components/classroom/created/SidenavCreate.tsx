"use client";
import {
  BadgeIcon,
  BookAIcon,
  BookOpen,
  GraduationCap,
  ListTodo,
  Mail,
  VideoIcon
} from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import logo from "../../../../../public/images/Animation - 1715593245274.gif";
import { FaChalkboardTeacher } from "react-icons/fa";
import { useRouter } from "next/navigation";
import AddStudent from "../../modal/AddStudent";
import { createPortal } from "react-dom";
import AssignTask from "../../modal/AssignTask";
import AddTeacher from "../../modal/AddTeacher";

const Sidenav = () => {
  const router = useRouter();
  const [isOpen, setOpen] = useState(false);
  const [teacher, setTeacher] = useState(false);
  const [task, setTask] = useState(false);

  const handleClick = () => {
    router.push("/");
  };
  const handleAssignTask = () => {
    setTask(true);
  };
  const handleAddStudent = () => {
    setOpen(true);
  };
  const handleAddTeacher = () => {
    setTeacher(true)
  };
  const handleBulkEmail = () => {
    router.push("/");
  };
  const handleTodo = () => {
    router.push("/");
  };
  const handleQuiz = () => {
    router.push("/");
  };
  return (
    <div className="sm:w-64 hidden  h-screen bg-[#f1eff3] sm:block    flex-row ">
      {isOpen && createPortal(<AddStudent />, document.body)}
      {teacher && createPortal(<AddTeacher />, document.body)}
      {task && createPortal(<AssignTask/>, document.body)}

      {/* <Image src={logo} alt="logo" width={60} height={50} /> */}
      <div
        onClick={handleClick}
        className="flex flex-col space-x-2 justify-center cursor-pointer  items-center pt-5 w-[80%]"
      >
        <h1 className="font-bold text-4xl text-cyan-800">EduNest</h1>
        <h1 className="text-xs text-cyan-800">👑 Upgrade to Pro 👑</h1>

        <hr className="mt-3"></hr>
      </div>
      <div className=" mt-5">
        <div
          onClick={handleAssignTask}
          className="group flex gap-3 mt-2 p-3 text-[18px] items-center text-gray-500 cursor-pointer hover:bg-[#624DE3] hover:text-white rounded-md transition-all ease-in-out duration-200"
        >
          <BookOpen className="group-hover:animate-bounce" />
          <h2>Assign Task</h2>
        </div>
        <div
          onClick={handleAddStudent}
          className="group flex gap-3 mt-2 p-3 text-[18px] items-center text-gray-500 cursor-pointer hover:bg-[#624DE3] hover:text-white rounded-md transition-all ease-in-out duration-200"
        >
          <BookAIcon className="group-hover:animate-bounce" />
          <h2>Add Student</h2>
        </div>
        <div
          onClick={handleAddTeacher}
          className="group flex gap-3 mt-2 p-3 text-[18px] items-center text-gray-500 cursor-pointer hover:bg-[#624DE3] hover:text-white rounded-md transition-all ease-in-out duration-200"
        >
          <FaChalkboardTeacher className="group-hover:animate-bounce" />
          <h2>Add Teacher</h2>
        </div>
        <div
          onClick={handleBulkEmail}
          className="group flex gap-3 mt-2 p-3 text-[18px] items-center text-gray-500 cursor-pointer hover:bg-[#624DE3] hover:text-white rounded-md transition-all ease-in-out duration-200"
        >
          <Mail className="group-hover:animate-bounce" />
          <h2>Bulk Email</h2>
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
          <h2>Start Class</h2>
        </div>
      </div>
      {/* <div className=" flex justify-between  bottom-0">
        <Image src={logo} alt="logo" width={80} height={80} />
      </div> */}
    </div>
  );
};

export default Sidenav;
