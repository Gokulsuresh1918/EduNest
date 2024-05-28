
'use client'

import Link from "next/link";
import image from "../../../public/images/logo.png";
import Image from "next/image";
import { useRouter } from 'next/navigation';
import { useEffect } from "react";

const Verify = () => {
  const router = useRouter(); 

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/login');
    }, 1000);

    return () => clearTimeout(timer); 
  }, [router]); // Depend on router to avoid unnecessary rerenders

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md text-center">
        <Image alt="logo" className="w-32 mx-auto mb-4" src={image} />

        <h1 className="text-2xl font-semibold mb-4 text-black">
          Email Verified Successfully
        </h1>
        <p className="text-gray-600 mb-6">
          Thank you for verifying your email. You can now proceed to login.
        </p>
        <Link href="/login">
          <button className="inline-block bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition duration-300">
            Go to Login
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Verify;
