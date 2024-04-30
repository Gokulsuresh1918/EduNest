import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Nav from "./components/Home/Nav";


const inter = Poppins({
  weight:['200','300','400','500','600','700','800'],
  subsets:['latin']
});

export const metadata: Metadata = {
  title: "EduNest",
  description: "new era of learning",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Nav/>
        {children}</body>
    </html>
  );
}
