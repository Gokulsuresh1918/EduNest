"use client";

import Cookie from "js-cookie";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const Router = useRouter();
  const [login, setLogin] = useState(false);
  useEffect(() => {
    const checkToken = async () => {
      const token = Cookie.get("token");
      if (token) {
        setLogin(true);
      } else {
        Router.push('/login');
      }
    };
    checkToken();
  }, [Router]);

  return <>{login && children}</>;
}
