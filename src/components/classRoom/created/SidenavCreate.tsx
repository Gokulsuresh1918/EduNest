"use client";
import {
  BadgeIcon,
  BookAIcon,
  BookOpen,
  GraduationCap,
  ListTodo,
  Mail,
  VideoIcon,
} from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import logo from "../../../../../public/images/Animation - 1715593245274.gif";
import { FaChalkboardTeacher } from "react-icons/fa";
import { useParams, useRouter } from "next/navigation";
import AddStudent from "../../Modal/AddStudent";
import { createPortal } from "react-dom";
import AssignTask from "../../Modal/AssignTask";
import AddTeacher from "../../Modal/AddTeacher";
import BulkEmail from "../../Modal/BulkEmail";
import VideoCallConfirm from "../../Modal/videoCallConfirm";
import { FiMenu, FiX } from "react-icons/fi";
import { toast } from "react-toastify";

const Sidenav = () => {
  const router = useRouter();
  const [isOpen, setOpen] = useState(false);
  const [teacher, setTeacher] = useState(false);
  const [task, setTask] = useState(false);
  const [bulkemail, setbulkemail] = useState(false);
  const [video, setVideo] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const { classCode } = useParams();

  const handleClick = () => {
    router.push("/");
  };
  const handleAssignTask = () => {
    setTask(true);
    setMenuOpen(false);
  };
  const handleAddStudent = () => {
    setOpen(true);
    setMenuOpen(false);
  };
  const handleAddTeacher = () => {
    setTeacher(true);
    setMenuOpen(false);
  };
  const handleBulkEmail = () => {
    setbulkemail(true);
    setMenuOpen(false);
  };
  const handleTodo = () => {
    toast("quiz also under condtruction ", {
      position: "top-center",
      autoClose: 3000,
    });
    setMenuOpen(false);
  };
  const handleQuiz = () => {
    toast(
      "This feature is under construction. We will update soon when work finishes",
      {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      }
    );

    setMenuOpen(false);
  };
  const handleStartClass = () => {
    setVideo(true);
    setMenuOpen(false);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div>
      <button
        onClick={toggleMenu}
        className={`text-3xl ${
          menuOpen ? "sm:block" : "sm:hidden"
        } text-cyan-800`}
      >
        {menuOpen ? <FiX /> : <FiMenu />}
      </button>

      {menuOpen && (
        <>
          <div className="sm:hidden flex justify-between p-4 bg-[#f1eff3]">
            <h1 className="font-bold text-2xl text-cyan-800">EduNest</h1>
          </div>
          <div className="sm:hidden flex flex-col bg-[#f1eff3] p-4">
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
              onClick={handleStartClass}
              className="group flex gap-3 mt-2 p-3 text-[18px] items-center text-gray-500 cursor-pointer hover:bg-[#624DE3] hover:text-white rounded-md transition-all ease-in-out duration-200"
            >
              <VideoIcon className="group-hover:animate-bounce" />
              <h2>Start Class</h2>
            </div>
          </div>
        </>
      )}
      <div className="sm:w-56 hidden h-screen bg-[#f1eff3] sm:block flex-row">
        {isOpen && createPortal(<AddStudent />, document.body)}
        {teacher && createPortal(<AddTeacher />, document.body)}
        {task && createPortal(<AssignTask />, document.body)}
        {bulkemail && createPortal(<BulkEmail />, document.body)}
        {video &&
          createPortal(
            <VideoCallConfirm params={{ classCode: classCode as string }} />,
            document.body
          )}
        <div
          onClick={handleClick}
          className="flex flex-col space-x-2 justify-center cursor-pointer items-center pt-5 w-[80%]"
        >
          <h1 className="font-bold text-4xl text-cyan-800">EduNest</h1>
          <h1 className="text-xs text-cyan-800">👑 Upgrade to Pro 👑</h1>
          <hr className="mt-3"></hr>
        </div>
        <div className="mt-5">
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
            onClick={handleStartClass}
            className="group flex gap-3 mt-2 p-3 text-[18px] items-center text-gray-500 cursor-pointer hover:bg-[#624DE3] hover:text-white rounded-md transition-all ease-in-out duration-200"
          >
            <VideoIcon className="group-hover:animate-bounce" />
            <h2>Start Class</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidenav;
