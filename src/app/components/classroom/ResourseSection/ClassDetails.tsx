import React from "react";
import AddMedia from "./AddMedia";
import AvatarGroups from "./AvatarGroups";

function ClassDetails() {
  return (
    <div className="flex flex-col h-screen">
      <div className="relative h-40 md:h-120 bg-orange-100">
        <h1 className="absolute left-10 top-1/3 transform -translate-y-1/3 font-bold text-gray-700 md:text-lg">
          Title of Class
        </h1>
        <h1 className="absolute left-10 top-[60%] transform -translate-y-1/2 text-gray-700 md:text-lg">
          Description of Class
        </h1>
        <div className="flex justify-end">

        <AvatarGroups/>
        </div>
      </div>

      <div className="absolute right-72 flex justify-end bottom-0  items-baseline md:h-auto ">
        
          <AddMedia />
        
      </div>
    </div>
  );
}
export default ClassDetails;
