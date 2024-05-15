import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FaCopy, FaShareAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import { FaWhatsapp, FaEnvelope } from "react-icons/fa";
import axios from "axios";

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
const handleShareEmail = () => {
  // setEmail(false)
  const uniqueCodeElement = document.getElementById("name");
  const emailtoSend = document.getElementById("email");
  const uniqueCode = uniqueCodeElement
    ? (uniqueCodeElement as HTMLInputElement).value
    : "";

  // Define the email content
  const subject = "Exciting News Your Unique Code to Join Our Classroom";
  const body = `🎉 Exciting news Your unique code to join our Edunest classroom is: ${uniqueCode}. 🚀 Start your learning journey today and unlock a world of knowledge.`;

  // Construct the mailto URL
  const emailUrl = `${emailtoSend}:?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}`;

  // Open the email client with the constructed URL
  window.open(emailUrl, "_blank");
};

const AddStudent = () => {
  const [email, setEmail] = useState(true);
  const [code, setCode] = useState("");
  

  useEffect(() => {
    const uniqueCodeElement = document.getElementById("name");
    const uniqueCode = uniqueCodeElement
      ? (uniqueCodeElement as HTMLInputElement).value
      : "";
    const response = axios.post(`${BASE_URL}/class/classrooomUpdate`, uniqueCode);
  }, []);

  return (
    <Dialog defaultOpen={true}>
     
      <DialogContent className="sm:max-w-[425px]    ">
        <DialogHeader>
          <DialogTitle className="text-orange-200">Add Student </DialogTitle>
        </DialogHeader>
        <DialogDescription className="text-sm text-center">
          Share this code to your students then they can Join Classroom
        </DialogDescription>
        <div className="grid gap-4 py-2">
          <div className="items-center gap-4">
            {email ? (
              <Input
                id="name"
                value={code}
                placeholder={code}
                className="col-span-3  border-cyan-800 rounded-xl"
              />
            ) : (
              <Input
                id="email"
                placeholder="Enter Student Email"
                className="col-span-3  border-cyan-800 rounded-xl"
              />
            )}
          </div>
        </div>

        <div className="flex justify-evenly items-center">
          <DialogFooter className=" rounded-xl w-[17%] px-2 bg-green-700">
            <Button onClick={handleShareWhatsApp} type="submit">
              {" "}
              <FaWhatsapp />
            </Button>
          </DialogFooter>
          <DialogFooter className=" rounded-xl w-[17%] px-2 bg-red-800">
            <Button onClick={handleShareEmail} type="submit">
              <FaEnvelope />
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddStudent;
