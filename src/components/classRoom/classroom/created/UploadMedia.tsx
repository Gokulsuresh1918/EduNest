'use client'

import React, { useRef, useState } from 'react'
import { useEdgeStore } from "@/lib/edgestore";
import { Fab } from "@mui/material";
import axios from "axios";
import AddIcon from "@mui/icons-material/Add";

import CircularProgress from "@mui/material/CircularProgress";
import { toast } from 'react-toastify';

const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL;

const UploadMedia = ({ classCode }: { classCode: string }) => {
    const [uploadProgress, setUploadProgress] = useState(0);
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const { edgestore } = useEdgeStore();
  
    const handleButtonClick = () => {
      if (fileInputRef.current) {
        fileInputRef.current.click();
      }
    };
  
    const handleFileChange = async (
      event: React.ChangeEvent<HTMLInputElement>
    ) => {
      const file =
        event.target && event.target.files ? event.target.files[0] : null;
      // console.log('file', file);
  
      if (file) {
        try {
          const res = await edgestore.publicFiles.upload({
            file,
            onProgressChange: (progress: any) => {
              setUploadProgress(progress);
              if (progress > 96) {
                setUploadProgress(0);
                toast.success("File uploaded successfully!");
              }
              // console.log(progress);
            },
          });
          const userJSON = localStorage.getItem("User");
          // Parse the JSON string back into a JavaScript object
          const user = userJSON ? JSON.parse(userJSON) : {};
          console.log("res", user._id);
          const fileData = {
            filename: file?.name,
            fileType: file?.type,
            fileSize: file?.size,
            fileUrl: res?.url,
            uploaderId: user._id,
            classCode,
          };
          const responce = await axios.post(
            `${BASE_URL}/class/fileUpload`,
            fileData
          );
  
          const resData = responce.data;
          console.log("responce file:", resData);
        } catch (error) {
          console.error("Error uploading file:", error);
        }
      }
    };
  return (
    <div className="absolute right-[22%] bottom-4 flex justify-end items-baseline md:h-auto">
    <input
      type="file"
      ref={fileInputRef}
      style={{ display: "none" }}
      onChange={handleFileChange}
    />

    {uploadProgress ? (
      <div className="w-full mt-2">
        <CircularProgress
          variant="determinate"
          value={uploadProgress}
        />
      </div>
    ) : (
      <Fab
        size="medium"
        color="primary"
        aria-label="add"
        onClick={handleButtonClick}
      >
        <AddIcon />
      </Fab>
    )}
  </div>
  )
}

export default UploadMedia