import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/Ui/button";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/Ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/Ui/drawer";
import { Input } from "@/components/Ui/input";
import { Textarea } from "@/components/Ui/textarea";
import { useParams } from "next/navigation";
import { FaEnvelope } from "react-icons/fa";
import Checkbox from "@mui/material/Checkbox";
import { toast } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";

const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL;

interface Student {
  _id: string;
  name: string;
  email: string;
}

const BulkEmail = () => {
  const [email, setEmail] = useState(false);
  const [students, setStudents] = useState<Student[]>([]);
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
  const subjectRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLTextAreaElement>(null);
  const [errors, setErrors] = useState({ email: "" });
  const params = useParams();
  const classCode = params.classCode;
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/class/getClassData/${classCode}`
        );

        const stuId = response.data?.classroom[0]?.students;

        const extractIds = (stuId: any[]) => stuId.map((item) => item._id);
        const idsArray = extractIds(stuId);

        const res = await Promise.all(
          idsArray.map((id) =>
            axios.get(`${BASE_URL}/class/getStudentData/${id}`)
          )
        );

        const studentsData = res.map((ele) => ele.data.Students);
        if (Array.isArray(studentsData)) {
          setStudents(studentsData);
        }
      } catch (error) {
        console.error("Failed to fetch class data:", error);
      }
    };
    fetchData();
  }, [classCode]);

  const handleCheckboxChange = (email: string) => {
    setSelectedStudents((prevSelected) =>
      prevSelected.includes(email)
        ? prevSelected.filter((e) => e !== email)
        : [...prevSelected, email]
    );
  };

  const handleShareEmail = async () => {
    const subject = subjectRef.current ? subjectRef.current.value : "";
    const body = bodyRef.current ? bodyRef.current.value : "";
    const emailAddresses = selectedStudents.join(",");

    try {
      const response = await axios.post(`${BASE_URL}/class/bulkEmail`, {
        subject,
        body,
        emailAddresses,
      });
      console.log("Email sent successfully:", response.data);
      toast.success("Email sent successfully");

      setTimeout(() => {
        router.push(`/createdClass/${classCode}`);
      }, 2000);
    } catch (error) {
      console.error("Error sending email:", error);
      setErrors({ email: "Failed to send email. Please try again later." });
    }
  };

  return (
    <Dialog defaultOpen={true}>
      <DialogContent className="sm:max-w-[425px] text-orange-300">
        <DialogHeader>
          <DialogTitle className="text-orange-200 text-lg">
            Direct E-mail
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className="text-sm text-center text-orange-200">
          Share email to students that you want
        </DialogDescription>
        <div className="grid py-2">
          <div className="items-center space-y-3 text-orange-200">
            <Input
              ref={subjectRef}
              id="Subject"
              placeholder="Subject"
              className="col-span-3 border-cyan-800 rounded-xl"
            />
            <Textarea
              ref={bodyRef}
              className="rounded-xl text-center"
              placeholder="Body of the Email"
            />
            <Drawer>
              <DrawerTrigger className="border rounded-xl w-full p-1">
                Select Students
              </DrawerTrigger>
              <DrawerContent className="bg-yellow-50">
                <DrawerHeader>
                  <DrawerTitle className="text-3xl font-serif font-bold">
                    Select Student to share Mail
                  </DrawerTitle>
                  <DrawerDescription>
                    You can share email to your students. This feature is
                    limited to access full potential upgrade.
                  </DrawerDescription>
                </DrawerHeader>
                <DrawerFooter>
                  {students.map((item, index) => (
                    <div key={item._id} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id={`terms-${index}`}
                        onChange={() => handleCheckboxChange(item.email)}
                      />
                      <label
                        htmlFor={`terms-${index}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {item.email}
                      </label>
                    </div>
                  ))}
                  {errors.email && (
                    <div className="text-red-500 text-sm mt-2">
                      {errors.email}
                    </div>
                  )}
                  <DialogFooter
                    onClick={handleShareEmail}
                    className="rounded-xl w-28 px-2 bg-red-700"
                  >
                    <Button
                      className="flex justify-evenly w-full"
                      type="button"
                    >
                      Send <FaEnvelope />
                    </Button>
                  </DialogFooter>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          </div>
        </div>
        <div className="flex justify-evenly items-center"></div>
      </DialogContent>
    </Dialog>
  );
};

export default BulkEmail;
