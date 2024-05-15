import React from "react";
import Sidenav from "../../components/classroom/Sidenav";
import NavBar from "../../components/classroom/NavBar";
import ClassDetails from "../../components/classroom/ResourseSection/ClassDetails";
import Image from "next/image";

const CreatedClass = ({ params }: { params: { classId: string } }) => {
  const classId = params?.classId;
  console.log("classid", classId);
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
              <ClassDetails classId={classId} />
            </div>

            <div className="w-[26%] h-screen bg-slate-400 ">
              <h1 className="text-black font-bold flex justify-center items-center text-xl ">
                Upgrade to remove Ads
              </h1>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreatedClass;
