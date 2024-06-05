import React from "react";
import WhiteBoardCanvas from "../../components/classRoom/created/WhiteBoardCanvas";

const WhiteBoard = () => {
  return (
    <main className=" flex min-h-screen flex-col items-center p-12">
      <h1 className="text-4xl font-bold mb-8">WhiteBoard</h1>
      <WhiteBoardCanvas/>
    </main>
  );
};

export default WhiteBoard;
