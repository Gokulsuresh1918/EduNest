"use client";

import Image from "next/image";
import React, { useEffect } from "react";
import { CardBody, CardContainer, CardItem } from "../ui/3d-card";
import Link from "next/link";
import { Video } from "lucide-react";

type file = {
  filename: string;
  fileUrl: string;
  fileType: String;
};
interface Props {
  file: file;
}
export function Card({ file }: Props) {
  // console.log("file", file.filename); // Original filename

  const parts = file.filename.split("_"||" ");
  const truncatedFilename = parts[0];

  // console.log("file", truncatedFilename);
  const handleCardClick = () => {
    window.open(file.fileUrl, '_blank');
  };

  return (
    <div onClick={handleCardClick} >
    <CardContainer className="inter-var h-10 my-2 w-52 sm:flex-row">
      <CardBody  className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1]  dark:border-white/[0.2] border-black/[0.1] w-[16rem] h-[12rem] rounded-xl p-3 border">
        {" "}
        {/* Adjusted width and height */}
      

       
        <CardItem translateZ="50" className="text-lg font-bold text-black ">
          {truncatedFilename}
        </CardItem>
        <CardItem
          as="p"
          translateZ="60"
          className=" text-xs max-w-sm mt-2 text-black"
        >
          {file.fileType}
        </CardItem>
        <CardItem translateZ="100" className="w-full mt-4">
          {file.fileType === "video/mp4" ? (
            <video
              controls
              className="max-h-20 max-w-52 w-full object-cover rounded-xl group-hover/card:shadow-xl"
            >
              <source src={file.fileUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : file.fileType === "image/png" ||
            file.fileType === "image/jpeg" ? (
            <Image
              src={file.fileUrl}
              height="1000"
              width="1000"
              className="h-20 w-full max-h-20 max-w-52 object-cover rounded-xl group-hover/card:shadow-xl"
              alt="thumbnail"
            />
          ) : file.fileType === "application/pdf" ? (
            <iframe
              src={file.fileUrl}
              className="h-20 w-full rounded-xl group-hover/card:shadow-xl scroll-smooth"
              title="PDF viewer"
            />
          ) : (
            <p>This file type is not supported.</p>
          )}
        </CardItem>
      </CardBody>
    </CardContainer>
    </div>
  );
}

export default Card;
