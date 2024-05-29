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
import { motion } from "framer-motion";
import axios, { AxiosError } from 'axios';
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import { useTheme } from "next-themes";

const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL;

export function JoinClass() {
  const { theme, setTheme } = useTheme();
  const [ownerId, setOwnerId] = useState("");
  const Router = useRouter();
  const [classCode, setClassCode] = useState("");

  // Safely access localStorage only in the browser
  useEffect(() => {
    if (typeof window !== "undefined") {
      let userData = localStorage.getItem("UserZustand");
      if (userData) {
        let parsedData = JSON.parse(userData);
        let userId = parsedData?.state?.user?._id;
        // console.log('this is parsced data',userId);
        setOwnerId(userId);
      }
    }
  }, []);
  let data = {
    classcode: classCode,
    ownerId: ownerId,
  };
  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    try {
      let response = await axios.post(`${BASE_URL}/class/joinClass`, {
        data,
      });
      console.log("chummma", response);

      if (response.status === 200) {
        Router.push(`/joinedClass/${classCode}`);
      } 
    } catch (error) {
      console.error( error);
      if (error instanceof AxiosError && error.response) {
        toast.error(` ${error.response.data.message || "Something went Wrong Try Again"}`);
    } else {
        toast.error("Failed to join class. Try Again Later");
    }
    }
  };
  const getTextColor = () => {
    return theme === "dark" ? "white" : "orange-200 ";
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <motion.button
          whileHover={{ scale: 1.3 }}
          className={`text-${getTextColor()} bg-[#624DE3]  px-14 py-4 text-xl font-bold  border-none rounded-xl hover:bg-slate-700 hover:text-white`}
        >
          Join
        </motion.button>
      </DialogTrigger>
      <DialogContent className={` text-${getTextColor()} sm:max-w-[425px]`}>
        <DialogHeader>
          <DialogTitle>Join ClassRooms</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="items-center gap-4">
              <Input
                id="name"
                placeholder="Classroom code"
                className="col-span-3 border-cyan-800 rounded-xl"
                onChange={(e) => setClassCode(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter className="rounded-xl w-[17%] bg-[#624DE3]">
            <Button type="submit">Join</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
export default JoinClass;
