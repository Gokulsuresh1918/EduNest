"use client"
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const router = useRouter();
  const { data, status } = useSession();
  useEffect(()=>{
    console.log(status);
      if(status==="loading"){
        router.push('/')
      } 
  },[])

  return (<>{status === "unauthenticated"?<>{children}</>:<div>{status}</div>}</>)
};

export default Layout;
