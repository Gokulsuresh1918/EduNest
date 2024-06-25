import React, { useEffect, useState } from "react";
import { Button } from "@/components/Ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/Ui/dialog";
import { Input } from "@/components/Ui/input";
import { Label } from "@/components/Ui/label";
import { FaCopy, FaShareAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import { FaWhatsapp, FaEnvelope } from "react-icons/fa";
import axios from "axios";
import { classroomStore } from "../../../globalStore/store";

const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL;

const handleShareWhatsApp = () => {
  const uniqueCodeElement = document.getElementById("name");
  const uniqueCode = uniqueCodeElement
    ? (uniqueCodeElement as HTMLInputElement).value
    : "";
  //todo include domain name
  const message = `🎉 Exciting news Your unique code to join our Edunest classroom is: ${uniqueCode}. 🚀 Start your learning journey today and unlock a world of knowledge. Click the link below to join us: https://edunest.com/join-classroom`;
  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
  window.open(whatsappUrl, "_blank");
};

const AddStudent = () => {
  const [code, setCode] = useState("");
  const classData = classroomStore(
    (state: { classrooms: any }) => state.classrooms
  );
  // console.log('this is calas data',classData);

  useEffect(() => {
    const uniqueCodeElement = document.getElementById("name");
    const uniqueCode = uniqueCodeElement
      ? (uniqueCodeElement as HTMLInputElement).value
      : "";
    const response = axios.post(
      `${BASE_URL}/class/classrooomUpdate`,
      uniqueCode
    );
  }, []);

  return (
    <Dialog defaultOpen={true}>
      <DialogContent className="sm:max-w-[425px]    ">
        <DialogHeader>
          <DialogTitle className="text-orange-200 text-lg">
            Add Student{" "}
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className="text-sm text-center text-orange-200">
          Share this code to your students then they can Join Classroom
        </DialogDescription>
        <div className="grid gap-4 py-2">
          <div className="items-center gap-4 text-orange-200">
            <Input
              id="name"
              value={classData[0].code}
              placeholder={classData[0].code}
              className="col-span-3  border-cyan-800 rounded-xl"
            />
          </div>
        </div>

        <div className="flex justify-evenly items-center">
          <DialogFooter className=" rounded-xl w-[17%] px-2 bg-green-700">
            <Button onClick={handleShareWhatsApp} type="submit">
              <FaWhatsapp />
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddStudent;
