import React, { useState } from 'react';
import { useRouter } from "next/navigation";import { Button } from "@/components/ui/button";
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
import axios from 'axios'; // Import axios

export function CreateClass() {
  const router = useRouter();  const [name, setName] = useState('title');
  const [username, setUsername] = useState('Description');

  const handleSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault(); // Prevent default form submission behavior

    try {
      const response = await axios.post('/your-backend-endpoint', {
        name,
        username,
        // Add other fields as needed
      });

      if (response.status === 200) {
        // Redirect to a new route upon successful submission
        router.push("/createdClass");      }
    } catch (error) {
      console.error('Error submitting data:', error);
      // Handle error (e.g., show an error message)
    }
  };

  const handleCopy = (id: string) => {
    const inputElement = document.getElementById(id) as HTMLInputElement;
    if (inputElement) {
      inputElement.select();
      document.execCommand("copy");
      alert("Code copied to clipboard!");
    }
  };

  const handleShareWhatsApp = () => {
    const uniqueCodeElement = document.getElementById("uniqueCode");
    const uniqueCode = uniqueCodeElement
     ? (uniqueCodeElement as HTMLInputElement).value
      : "";
    const message = `Here is your unique code: ${uniqueCode}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-slate-700 text-lg px-14 py-7 border-none rounded-xl hover:bg-black">
          Create &rarr;
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create ClassRooms</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}> {/* Wrap inputs in a form */}
          <div className="grid gap-4 py-4">
            <div className="items-center gap-4">
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="title"
                className="col-span-3  border-cyan-800 rounded-xl"
              />
            </div>
            <div className="items-center gap-4">
              <Input
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="col-span-3  border-cyan-800 rounded-xl"
              />
            </div>
            <div className="items-center gap-4">
              <div className="relative">
                <Input
                  id="uniqueCode"
                  defaultValue="089123764"
                  className="col-span-3 border-cyan-800 rounded-xl"
                />
                <button
                  onClick={handleShareWhatsApp}
                  className="absolute right-8 top-1/2 transform -translate-y-1/2 bg-transparent border-0 focus:outline-none ml-2"
                >
                  <FaShareAlt />
                </button>
                <button
                  onClick={() => handleCopy("uniqueCode")}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-transparent border-0 focus:outline-none"
                >
                  <FaCopy />
                </button>
              </div>
            </div>
          </div>

          <DialogFooter className="rounded-xl w-[22%]   bg-[#624DE3]">
            <Button type="submit">Create</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default CreateClass;
