import Image from "next/image";
import React from "react";

const Loading = () => {
  return (
    <div className="h-full w-full flex justify-center items-center">
      <Image className="animate-pulse duration-700" src={'../../public/images/logo.png'} alt=" loading" width={120} height={120} />
    </div>
  );
};

export default Loading;
