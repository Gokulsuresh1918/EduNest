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
import { EditIcon, EyeIcon, EyeOffIcon } from "./Ui/icons";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./Ui/sheet";
import axios from "axios";

interface UserData {
  name: string;
  password: string;
}
const BASE_URL=process.env.NEXT_PUBLIC_SERVER_URL
const ProfilePge: React.FC = () => {
  const [isEditingUsername, setIsEditingUsername] = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [username, setUsername] = useState("your name");
  const [password, setPassword] = useState("********");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const rawData = localStorage.getItem("User");
    const fetchData = async () => {
        const userData = JSON.parse(rawData || '{}');
        const response = await axios.post(`${BASE_URL}/user`, userData.email);
        console.log('this ',response.data);
        
    }
    fetchData();
  }, []);
  const handleEditUsername = () => {
    setIsEditingUsername(true);
  };

  const handleEditPassword = () => {
    setIsEditingPassword(true);
  };

  const handleSaveChanges = () => {
    setIsEditingUsername(false);
    setIsEditingPassword(false);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
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
            <Label htmlFor="password" className="text-right">
              Password
            </Label>
            <div className="flex col-span-3 items-center gap-2">
              {isEditingPassword ? (
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  className="flex-1"
                  onChange={(e) => setPassword(e.target.value)}
                />
              ) : (
                <span className="flex-1">
                  {showPassword ? password : "********"}
                </span>
              )}
              <IconButton
                aria-label="Toggle password visibility"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <EyeOffIcon /> : <EyeIcon />}
              </IconButton>
              <IconButton
                aria-label="Edit password"
                onClick={handleEditPassword}
              >
                <EditIcon />
              </IconButton>
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="joined-class" className="text-right">
              Joined Class
            </Label>
            <div className="flex col-span-3 items-center gap-2">
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select class" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="class1">Class 1</SelectItem>
                  <SelectItem value="class2">Class 2</SelectItem>
                  <SelectItem value="class3">Class 3</SelectItem>
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
                  <SelectValue placeholder="Select class" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="class1">Class 1</SelectItem>
                  <SelectItem value="class2">Class 2</SelectItem>
                  <SelectItem value="class3">Class 3</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button type="button" onClick={handleSaveChanges}>
              Save changes
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default ProfilePge;
