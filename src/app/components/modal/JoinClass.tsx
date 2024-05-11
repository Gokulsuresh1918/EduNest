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

export function JoinClass() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className=" bg-[#624DE3]  px-7  border-none rounded-xl hover:bg-black">
          Join
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]    ">
        <DialogHeader>
          <DialogTitle>Join ClassRooms</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="items-center gap-4">
            <Input
              id="name"
              placeholder="Classroom code"
              className="col-span-3"
            />
          </div>

        </div>

        <DialogFooter className=" rounded-xl w-[17%]   bg-[#624DE3]">
          <Button type="submit">Join</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
export default JoinClass;
