import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/Ui/alert-dialog";
import { Button } from "@/components/Ui/button";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { FaWhatsapp } from "react-icons/fa";

const BASEURL = process.env.NEXT_PUBLIC_SERVER_URL;
const CLIENT = process.env.NEXT_PUBLIC_CLIENT_URL;

const VideoCallConfirm = ({ params }: { params: { classCode: string } }) => {
  const classCode = params?.classCode;

  const Router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `${BASEURL}/class/getClassData/${classCode}`
      );
    };
    fetchData();
  }, [classCode]);
  const handleShareWhatsApp = () => {
    // Refined message
    const message = `Hello 🌟\n\nWe're thrilled to invite you to join our exclusive Edunest
     video call. Your unique access code is: ${classCode}.\n\nEmbark on your learning adventure 
     now and discover endless opportunities!\n\nClick the link below to join
      us:\n${CLIENT}/room/${classCode}`;

    // URL encoding the message for WhatsApp
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;

    // Opening the WhatsApp share dialog with the encoded message
    window.open(whatsappUrl, "_blank");
  };
  const handleClick = () => {
    Router.push(`${CLIENT}/room/${classCode}`);
    // console.log("dfghj");
  };

  return (
    <>
      <AlertDialog defaultOpen={true}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Shall We Start Class</AlertDialogTitle>
            <AlertDialogDescription>
              This is your unique Code :
              <span className="text-green-700 font-bold text-xl">
                {classCode}
              </span>{" "}
              .To join to the class you can send this code to student to join
              this class
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Button
              className=" bg-green-700   rounded-2xl text-xl"
              onClick={handleShareWhatsApp}
              type="submit"
            >
              <FaWhatsapp />
              Invite
            </Button>
            <AlertDialogAction onClick={handleClick}>
              Start Class
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
export default VideoCallConfirm;
