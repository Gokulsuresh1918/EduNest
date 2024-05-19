import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function SideBarRight() {
  return (
    <Sheet  defaultOpen={true}>
      <SheetContent className="bg-white">
        <SheetHeader>
          <SheetTitle className="font-extrabold text-2xl">Control Students</SheetTitle>
          <SheetDescription>
            Make Controll to your Students here. Click save when you're done.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-3 py-4">
          <div className="grid  justify-between gap-4">
            <h1 className="text-[#0A0118]">Name Of User </h1>
            <SheetClose asChild>
              <Button className="border rounded-xl" type="submit">
                Block
              </Button>
            </SheetClose>
          </div>
          <div className="grid  justify-between  gap-4">
            <h1>Name Of User </h1>
            <SheetClose asChild>
              <Button className="border rounded-xl" type="submit">
                Block
              </Button>
            </SheetClose>
          </div>
        </div>

        <SheetFooter>
          <SheetClose asChild>
            <Button className="border rounded-xl bg-red-600 text-white" type="submit">
              Delete Class
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
