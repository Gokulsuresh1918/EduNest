import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/Ui/sheet";
import { useEdgeStore } from "@/lib/edgestore";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { Fab } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL;

interface Student {
  title: string;
  dueDate: string;
  status: string;
}

export function SideBarJoin({ classCode }: { classCode: string }) {
  const [assignment, setAssignment] = useState([]);
  const userString = localStorage.getItem("User");
  let userData;
  if (userString) {
    userData = JSON.parse(userString);
  } else {
    userData = {};
  }
  const id = userData._id;
  // console.log("User", userData._id);
  useEffect(() => {
    const fetchdata = async (id: String) => {
      const responce = await axios.get(
        `${BASE_URL}/class/assignedStudent/${id}`
      );
      setAssignment(responce.data.Students);
      // console.log("this sis responce", responce.data.Students[0]);
    };
    fetchdata(id);
    // console.log("this sis ", assignment);
  }, [id]);

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
    <Sheet defaultOpen={true}>
      <SheetContent className="bg-slate-300 text-black  overflow-scroll">
        <SheetHeader>
          <SheetTitle>Assigned Task</SheetTitle>
          <SheetDescription>
            Your Assigned Task Will Be Shown Here and you can submit task
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-1 py-4">
          {assignment.map((student: Student, index) => (
            <div
              key={index}
              className="grid justify-between border px-4 py-3 border-black rounded-xl"
            >
              <h1 className="font-bold">
                Title: <span className="font-normal">{student.title}</span>
              </h1>
              <h1 className="font-bold">
                Due Date:{" "}
                <span className="font-normal">
                  {new Date(student.dueDate).toLocaleDateString()}
                </span>
              </h1>
              <h1 className="font-bold">
                Status: <span className="font-normal">{student.status}</span>
              </h1>

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
                  <AssignmentIcon />
                </Fab>
              )}
            </div>
          ))}
        </div>
        {/* <SheetFooter>
          <SheetClose asChild>
            <Button type="submit">Save changes</Button>
          </SheetClose>
        </SheetFooter> */}
      </SheetContent>
    </Sheet>
  );
}
