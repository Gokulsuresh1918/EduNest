"use client";

import React, { useEffect, useState } from "react";
import Sidenav from "../../../components/classRoom/created/SidenavCreate";
import NavBar from "../../../components/NavBar";
import ClassDetails from "../../../components/classRoom/created/CreateClassDetails";
import Image from "next/image";
import AdsSection from "../../../components/classRoom/AdsSection";
import { toast, ToastContainer } from "react-toastify";
import Card from "../../../components/classRoom/card";
import UploadMedia from "@/components/classRoom/created/UploadMedia";
import axios from "axios";
import Cookie from "js-cookie";

import { fetchData } from "next-auth/client/_utils";
import { useRouter } from "next/navigation";

const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL;

const CreatedClass = ({ params }: { params: { classCode: string } }) => {
  const classCode = params?.classCode;
  const Router = useRouter();
  const [file, SetFile] = useState([]);
  useEffect(() => {
    const checkToken = async () => {
      const token = Cookie.get("token");
      if (!token) {
        Router.back();
      }
    };
    checkToken();
  }, []);

  useEffect(() => {
    const fetchFile = async () => {
      const responce = await axios.get(
        `${BASE_URL}/class/fileData/${classCode}`
      );
      const data = responce.data.files;
      console.log("responce", data);

      SetFile(data);
      // console.log('thid iud stat ',file);
    };
    fetchFile();
  }, []);

  return (
    <>
      <div className="bg-white flex w-screen overflow-hidden  h-screen">
        <Sidenav />

        <div className="w-full">
          <NavBar />
          <div className="w-full flex">
            <div className="w-3/4">
              <ClassDetails classCode={classCode} />
              {/* display content */}
              <div className=" w-full h-full ">
                <div className="grid grid-cols-1 overflow-scroll h-[28rem]  rounded-xl md:grid-cols-3 m-6">
                  {file.map((item, index) => (
                    <Card key={index} file={item} />
                  ))}
                </div>

                <UploadMedia classCode={classCode} />
              </div>
            </div>
            <div className="w-1/4">
              <AdsSection
                dataAdFormat="auto"
                dataFullWidthResponsive={true}
                dataAdSlot="1549962104"
              />
            </div>
          </div>
        </div>
      </div>

      <ToastContainer />
    </>
  );
};

export default CreatedClass;
