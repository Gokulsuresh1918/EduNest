import {
  BadgeIcon,
  BookAIcon,
  BookOpen,
  GraduationCap,
  ListTodo,
  Mail,
} from "lucide-react";
import Image from "next/image";
import React from "react";
import logo from "../../../../public/images/Animation - 1715593245274.gif";
import {
  FaChalkboardTeacher,

} from "react-icons/fa";
const Sidenav = () => {
  const menu = [
    { id: 1, name: "Assigned Task", icon: BookOpen },
    { id: 2, name: "Add Student", icon: BookAIcon },
    { id: 3, name: "Add Student", icon: FaChalkboardTeacher },
    { id: 4, name: "Bulk Email", icon: Mail },
    { id: 5, name: "Todo", icon: ListTodo },
    { id: 6, name: "Quiz", icon: GraduationCap },
  ];
  return (
    <div className="sm:w-64 hidden  h-screen bg-[#0A0118] sm:block    flex-row ">
      {/* <Image src={logo} alt="logo" width={60} height={50} /> */}
      <div className="flex flex-col space-x-2 justify-center items-center pt-5 w-[80%] ">
        <h1 className="  font-bold text-4xl text-cyan-800">EduNest</h1>
        <h1 className=" text-xs  text-cyan-800">Upgrage to pro </h1>
        <hr className="mt-3"></hr>
      </div>
      <div className=" mt-5">
        {menu.map((item, index) => (
          <div className="group flex gap-3 mt-2 p-3 text-[18px] items-center text-gray-500 cursor-pointer hover:bg-[#624DE3] hover:text-white rounded-md transition-all ease-in-out duration-200">
            <item.icon key={index} className="group-hover:animate-bounce" />
            <h2>{item.name}</h2>
          </div>
        ))}
      </div>
      <div className=" flex justify-between items-baseline">
        <Image src={logo} alt="logo" width={150} height={130} />
      </div>
    </div>
  );
};

export default Sidenav;
