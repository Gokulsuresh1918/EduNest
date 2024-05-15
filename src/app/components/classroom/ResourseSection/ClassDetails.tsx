"use client"


import React, { useEffect, useState } from "react";
import AddMedia from "./AddMedia";
import AvatarGroups from "./AvatarGroups";
import logo from "../../../../../public/images/google logo.png";
import Image from "next/image";
import axios from "axios";
import { userStore, classroomStore } from "../../../../../globalStore/store";

const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL;


function ClassDetails({classId}:{classId:string}) {
  const [classData,setClassData]=useState(null)
  console.log('classId in ClassDetails:', classId);

  // const userId = userStore(state => (state.user as any)?._id);
  // console.log("qswsds",userId)
  
  const classroomData = classroomStore(state => state.classrooms); 
  console.log('data classroom,',classroomData);
  

  return (
    <div className="flex flex-col h-screen">
      <div className="relative h-40 md:h-120 bg-orange-100">
        <h1 className="absolute left-10 top-1/3 transform -translate-y-1/3 font-bold text-gray-700 md:text-lg">
         {classroomData[0]?.title}
        </h1>
        <h1 className="absolute left-10 top-[60%] transform -translate-y-1/2 text-gray-700 md:text-lg">
        {classroomData[0]?.description}

        </h1>
        <div className="flex justify-end">
          <AvatarGroups />
        </div>
        <Image
          className="absolute  -bottom-7 left-10  rounded-full "
          width={70}
          height={70}
          src={classroomData[0]?.profilePicture}
          alt="profile"
        />
      </div>

      <div className="absolute right-72 flex justify-end bottom-0  items-baseline md:h-auto ">
        <AddMedia />
      </div>
    </div>
  );
}
export default ClassDetails;
