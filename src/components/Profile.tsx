import React, { useEffect, useState } from "react";
import { Button } from "./Ui/button";
import { Input } from "./Ui/input";
import { Label } from "./Ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "./Ui/select";
import { IconButton } from "./Ui/iconButton";
import { EditIcon } from "./Ui/icons";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "./Ui/sheet";
import axios from "axios";
import { toast } from "react-toastify";

// Interface for user data
interface UserData {
  name: string;
  password: string;
  _id: string;
  email: string;
  createdClassrooms: string[];
  joinedClassrooms: string[];
}

// Environment variable for base URL
const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL;
interface ProfilePgeProps {
  status: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProfilePge: React.FC<ProfilePgeProps> = ({ status }) => {
  // console.log('samad',status);
  
  const [isEditingUsername, setIsEditingUsername] = useState(false);
  const [username, setUsername] = useState("your name");
  const [email, setEmail] = useState("");
  const [createdClassrooms, setCreatedClassrooms] = useState<string[]>([]);
  const [joinedClassrooms, setJoinedClassrooms] = useState<string[]>([]);

  // Fetch user data on component mount
  useEffect(() => {
    const rawData = localStorage.getItem("User");
    const fetchData = async () => {
      if (!rawData) return;
      const userData: UserData = JSON.parse(rawData);
      if (!userData._id) return;

      try {
        const response = await axios.get(
          `${BASE_URL}/user/userData/${userData._id}`
        );
        const data = response.data;

        setUsername(data.name);
        setEmail(data.email);
        setCreatedClassrooms(data.createdClassrooms || []);
        setJoinedClassrooms(data.joinedClassrooms || []);

        const classroomNames = await Promise.all(
          data.joinedClassrooms.map((classroomId: string) =>
            getClassData(classroomId)
          )
        );
        const creatclassroomNames = await Promise.all(
          data.createdClassrooms.map((classroomId: string) =>
            getClassData(classroomId)
          )
        );
        setCreatedClassrooms(creatclassroomNames);
        setJoinedClassrooms(classroomNames);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchData();
  }, []);

  // Fetch classroom data by ID
  const getClassData = async (classroomId: string) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/user/getClassData/${classroomId}`
      );
      return response.data.classroom;
    } catch (error) {
      console.error(
        `Failed to fetch classroom data for ID: ${classroomId}`,
        error
      );
      return "";
    }
  };

  const handleEditUsername = () => {
    console.log("Current username:", username);
    setIsEditingUsername(true);
  };

  // Save changes and send updated username to the backend
  const handleSaveChanges = async () => {
    setIsEditingUsername(false);
    const rawData = localStorage.getItem("User");
    if (!rawData) return;
    const userData: UserData = JSON.parse(rawData);

    try {
      await axios.post(`${BASE_URL}/user/updateUsername`, {
        userId: userData._id,
        newUsername: username,
      });
      console.log("Username updated successfully");
      toast('Username updated successfully')
    } catch (error) {
      console.error("Failed to update username:", error);
    }
  };

  return (
    <Sheet defaultOpen={true}>
      <SheetContent className="bg-gray-300 text-black">
        <SheetHeader>
          <SheetTitle>User Profile</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you're done.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <div className="flex col-span-3 items-center gap-2">
              {isEditingUsername ? (
                <Input
                  id="username"
                  value={username}
                  className="flex-1"
                  onChange={(e) => setUsername(e.target.value)}
                />
              ) : (
                <span className="flex-1">{username}</span>
              )}
              <IconButton
                aria-label="Edit username"
                onClick={handleEditUsername}
              >
                <EditIcon />
              </IconButton>
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              E-Mail
            </Label>
            <div className="flex col-span-3 items-center gap-2">
              <span className="flex-1">{email}</span>
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="joined-class" className="text-right">
              Joined Class
            </Label>
            <div className="flex col-span-3 items-center gap-2">
              <Select>
                <SelectTrigger>
                  <SelectValue
                    placeholder={joinedClassrooms[0] || "Joined class"}
                  />
                </SelectTrigger>
                <SelectContent className="text-black bg-slate-400">
                  {Array.isArray(joinedClassrooms) &&
                    joinedClassrooms.map((data, index) => (
                      <SelectItem key={index} value={data}>
                        {data}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="created-class" className="text-right">
              Created Class
            </Label>
            <div className="flex col-span-3 items-center gap-2">
              <Select>
                <SelectTrigger>
                  <SelectValue
                    placeholder={createdClassrooms[0] || "Joined class"}
                  />
                </SelectTrigger>
                <SelectContent className="text-black bg-slate-400">
                  {Array.isArray(createdClassrooms) &&
                    createdClassrooms.map((data, index) => (
                      <SelectItem key={index} value={data}>
                        {data}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button className="rounded-xl border bg-orange-300" type="button" onClick={handleSaveChanges}>
              Save changes
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default ProfilePge;
