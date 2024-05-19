import React from "react";
import Sidenav from "../../components/classroom/created/SidenavCreate";
import NavBar from "../../components/classroom/NavBar";
import ClassDetails from "../../components/classroom/created/CreateClassDetails";
import Image from "next/image";
import AdsSection from "@/app/components/classroom/AdsSection";

const CreatedClass = ({ params }: { params: { classCode: string } }) => {
  const classCode = params?.classCode;
  console.log("classCode", classCode);
  return (
    <>
      <div className="bg-white flex overflow-hidden h-screen ">
        <div>
          <Sidenav />
        </div>
        <div className="w-full ">
          <NavBar />
          <div className="flex ">
            <div className=" h-80 w-[74%]   ">
              <ClassDetails classCode={classCode} />
            </div>

            <AdsSection />
          </div>
        </div>
      </div>
    </>
  );
};

export default CreatedClass;
