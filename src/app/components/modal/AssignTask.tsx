import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useTheme } from "next-themes";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { FaCopy, FaShareAlt } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";
import { useEdgeStore } from "../../../lib/edgestore";
import { userStore, classroomStore } from "../../../../globalStore/store";
import {motion} from 'framer-motion'

const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL;

export function CreateClass() {

const theme=useTheme()
  const getTextColor = () => {
    return theme === "dark" ? "white" : "orange-200 ";
  };

  return (
    <div>
      
        <Dialog>
          <DialogTrigger asChild>
            <motion.button whileHover={{scale:1.3}}
              className={`text-${getTextColor()}  bg-slate-700 text-xl font-bold px-14 py-4 border-none rounded-xl hover:bg-[#624DE3]`}
            >
              Create &rarr;
            </motion.button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className={`text-2xl text-${getTextColor()}`}>
                Create ClassRooms
              </DialogTitle>
            </DialogHeader>
            {/* <form onSubmit={handleSubmit}> */}
              <div className={` text-${getTextColor()} grid gap-4 py-4`}>
                <div className="items-center gap-4">
                  <Input
                    id="title"
                    // value={title}
                    // onChange={(e) => setTitle(e.target.value)}
                    placeholder="title"
                    className="col-span-3  border-cyan-800 rounded-xl"
                  />
                </div>
                <div className="items-center gap-4">
                  <label htmlFor="profilePicture" className="cursor-pointer">
                    <Input
                      id="profilePicture"
                      type="file"
                      onChange={(e) => {
                        if (e.target.files && e.target.files.length > 0) {
                        //   setProfilePicture(e.target.files[0]);
                        }
                      }}
                      className="col-span-3 border-cyan-800 rounded-xl"
                    />
                  </label>
                </div>
                <div className="items-center gap-4">
                  <Input
                    id="description"
                    // value={description}
                    placeholder="Description"
                    // onChange={(e) => setDescription(e.target.value)}
                    className="col-span-3  border-cyan-800 rounded-xl"
                  />
                </div>
                <div className="items-center gap-4">
                  <div className="relative">
                    <Input
                      id="uniqueCode"
                    //   defaultValue={code}
                      className="col-span-3 border-cyan-800 rounded-xl"
                    />
                    <button
                    //   onClick={handleShareWhatsApp}
                      className="absolute right-8 top-1/2 transform -translate-y-1/2 bg-transparent border-0 focus:outline-none ml-2"
                    >
                      <FaShareAlt />
                    </button>
                    <button
                    //   onClick={() => handleCopy("uniqueCode")}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-transparent border-0 focus:outline-none"
                    >
                      <FaCopy />
                    </button>
                  </div>
                </div>
              </div>
              <DialogFooter className={`rounded-xl w-[22%]  text-${getTextColor()}  bg-[#624DE3] `}>
                <Button type="submit">Create</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
    </div>
  );
}

export default CreateClass;
