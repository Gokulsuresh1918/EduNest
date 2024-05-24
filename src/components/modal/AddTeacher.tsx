import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { toast } from "react-toastify";
import { FaWhatsapp, FaEnvelope } from "react-icons/fa";
import axios from "axios";
import { classroomStore } from "../../../globalStore/store";
import { useParams } from "next/navigation";

const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL;

const emailSchema = z.object({
  code: z.string().min(1, "Class code is required").optional(),
  email: z.string().email("Invalid email address").optional(),
});

const AddTeacher = () => {
  const [email, setEmail] = useState(false);
  const [classcode, setClasscode] = useState("");
  const codeRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const [errors, setErrors] = useState({ code: "", email: "" });

  const params = useParams();
  const classCode = params.classCode;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/class/getClassData/${classCode}`
        );
        const classcode = response.data.classroom[0].teacherCode;
        // console.log('class teacher code',classcode);

        setClasscode(classcode);
      } catch (error) {
        console.error("Failed to fetch class data:", error);
      }
    };
    fetchData();
  }, [classCode]);

  const handleShareWhatsApp = () => {
    const uniqueCodeElement = codeRef.current;
    const uniqueCode = uniqueCodeElement ? uniqueCodeElement.value : classcode;
    const message = `🎉 Exciting news! Your unique code to join our Edunest classroom is: ${uniqueCode}. 🚀 Start your learning journey today and unlock a world of knowledge. Click the link below to join us: https://edunest.com/join-classroom`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  const handleShareEmail = () => {
    const uniqueCodeElement = codeRef.current;
    const uniqueCode = uniqueCodeElement ? uniqueCodeElement.value : classcode;
    const emailElement = emailRef.current;
    const emailToSend = emailElement ? emailElement.value : "";

    const validationResult = emailSchema.safeParse({
      code: !email ? uniqueCode : undefined,
      email: email ? emailToSend : undefined,
    });

    if (!validationResult.success) {
      const errorMessages = validationResult.error.format();
      setErrors({
        code: errorMessages.code?._errors[0] || "",
        email: errorMessages.email?._errors[0] || "",
      });
      return;
    }

    setErrors({ code: "", email: "" });

    const subject = "Exciting News: Your Unique Code to Join Our Classroom";
    const body = `🎉 Exciting news! Your unique code to join our Edunest classroom is: ${uniqueCode}. 🚀 Start your learning journey today and unlock a world of knowledge.`;
    const emailUrl = `mailto:${emailToSend}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    window.open(emailUrl, "_blank");
  };

  return (
    <Dialog defaultOpen={true}>
      <DialogContent className="sm:max-w-[425px] text-orange-300">
        <DialogHeader>
          <DialogTitle className="text-orange-200 text-lg">
            Add Teacher
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className="text-sm text-center text-orange-200">
          Share this code with your teacher so they can join the classroom.
        </DialogDescription>
        <div className="grid gap-4 py-2">
          <div className="items-center text-orange-200 gap-4">
            <>
              <Input
                ref={codeRef}
                id="code"
                placeholder={classcode}
                value={classcode}
                className="col-span-3 border-cyan-800 rounded-xl"
              />
              {errors.code && <div className="text-red-600">{errors.code}</div>}
            </>
          </div>
        </div>
        <div className="flex justify-evenly items-center">
          <DialogFooter className="rounded-xl w-[17%] px-2 bg-green-700">
            <Button onClick={handleShareWhatsApp} type="button">
              <FaWhatsapp />
            </Button>
          </DialogFooter>
          <DialogFooter className="rounded-xl w-[17%] px-2 bg-red-800">
            <Button onClick={handleShareEmail} type="button">
              <FaEnvelope />
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddTeacher;
