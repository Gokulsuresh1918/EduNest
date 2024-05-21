"use client";

import React, { useEffect, useState } from "react";
import AddMedia from "../created/AddMedia";
import { AnimatedTooltipPreview } from "../AvatarGroups";
import logo from "../../../../../public/images/google logo.png";
import Image from "next/image";
import axios from "axios";
import { userStore, classroomStore } from "../../../../../globalStore/store";

const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL;

function ClassDetails({ classCode }: { classCode: string }) {
  const classData = classroomStore((state) => state.classrooms);
  const createClassroom = classroomStore((state) => state.createClassroom);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/class/getClassData/${classCode}`
        );
        const resData = response.data.classroom;
        // console.log("fjhfdakjsdhflkj", resData);
        // console.log("profike",resData[0].profilePicture)

        let data = {
          id: resData[0]._id,
          title: resData[0].title,
          description: resData[0].description,
          code: resData[0].roomCode,
          profilePicture: resData[0].profilePicture,
          ownerId: resData[0].owner,
          students: resData[0].students,
          teachers: resData[0].teacher,
        };
        // console.log("data",data)
        createClassroom(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  // console.log("classdatatt an   aii", classData);

  return (
    <div className="flex flex-col h-screen">
      <div className="relative h-40 md:h-120 bg-orange-100">
        <h1 className="absolute left-10 top-1/3 transform -translate-y-1/3 font-bold text-gray-700 md:text-lg">
          {classData[0]?.title}
        </h1>
        <h1 className="absolute left-10 top-[60%] transform -translate-y-1/2 text-gray-700 md:text-lg">
          {classData[0]?.description}
        </h1>
        {/* <div className="flex ">
          <AnimatedTooltipPreview />
        </div> */}
        <Image
          className="absolute max-h-64  max-w-64  -bottom-7 left-10  rounded-3xl "
          width={120}
          height={90}
          src={classData[0]?.profilePicture}
          alt="profile"
        />
      </div>
    </div>
  );
}
export default ClassDetails;
