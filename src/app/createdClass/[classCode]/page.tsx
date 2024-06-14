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
import NasaApi from "../../../components/NasaApi/NasaApi";
import MarsRoverPhotos from "@/components/NasaApi/MarsApi";
import NearEarthObjects from "@/components/NasaApi/NearEarth";

const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL;

const CreatedClass = ({ params }: { params: { classCode: string } }) => {
  const classCode = params?.classCode;
  const Router = useRouter();
  const [file, setFile] = useState([]);
  const [userstat, setUserStat] = useState<boolean | null>(null);
  const [currentComponentIndex, setCurrentComponentIndex] = useState(0);

  const components = [<NasaApi key="nasa-api" />, <MarsRoverPhotos key="mars-api" />, <NearEarthObjects key="near-earth" />];

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userJSON = localStorage.getItem("User");
      const user = userJSON ? JSON.parse(userJSON) : null;
      setUserStat(user ? user.isSubscribed : null);
    }
  }, []);

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
      try {
        const response = await axios.get(`${BASE_URL}/class/fileData/${classCode}`);
        const data = response.data.files;
        setFile(data);
      } catch (error) {
        console.error("Error fetching files:", error);
      }
    };
    fetchFile();
  }, [classCode]);

  useEffect(() => {
    if (userstat) {
      const interval = setInterval(() => {
        setCurrentComponentIndex((prevIndex) => (prevIndex + 1) % components.length);
      }, 50000); 
      return () => clearInterval(interval);
    }
  }, [userstat]);

  return (
    <>
      <div className="bg-white flex w-screen overflow-hidden h-screen">
        <Sidenav />
        <div className="w-full">
          <NavBar />
          <div className="w-full flex">
            <div className="w-3/4">
              <ClassDetails classCode={classCode} />
              <div className="w-full h-full">
                <div className="grid grid-cols-1 overflow-scroll h-[28rem] rounded-xl md:grid-cols-3 m-6">
                  {file.map((item, index) => (
                    <Card key={index} file={item} />
                  ))}
                </div>
                <UploadMedia classCode={classCode} />
              </div>
            </div>
            <div className="w-1/4 overflow-y-scroll">
              {userstat ? (
                components[currentComponentIndex]
              ) : (
                <AdsSection
                  dataAdSlot="1549962104"
                  dataAdFormat="auto"
                  dataFullWidthResponsive={true}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default CreatedClass;
