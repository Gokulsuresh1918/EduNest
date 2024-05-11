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

export function CreateClass() {
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
    const uniqueCode = uniqueCodeElement? (uniqueCodeElement as HTMLInputElement).value : '';    const message = `Here is your unique code: ${uniqueCode}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };
  

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-slate-700 px-7 border-none rounded-xl hover:bg-black">
          Create &rarr;
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create ClassRooms</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="items-center gap-4">
            <Input
              id="name"
              defaultValue="title"
              placeholder="title"
              className="col-span-3"
            />
          </div>
          <div className="items-center gap-4">
            <Input
              id="username"
              defaultValue="Description"
              className="col-span-3"
            />
          </div>
          <div className="items-center gap-4">
            <div className="relative">
              <Input
                id="uniqueCode"
                defaultValue="089123764"
                className="col-span-3"
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
          <DialogDescription>
            You can create a classroom and copy the unique code.
          </DialogDescription>
        </div>

        <DialogFooter>
          <Button type="submit">Create</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default CreateClass;
