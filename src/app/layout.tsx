import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Nav from "./components/Home/Navbar";
import { NextAuthProvider } from "../app/provider";
import { ThemeProvider } from "../app/components/theme-provider";
import { EdgeStoreProvider } from "../lib/edgestore";
import { ToastContainer } from "react-toastify";
import Head from "next/head";
import { title } from "process";

const inter = Poppins({
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
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
      <Head>
        <title>EduNest</title>
        <meta name="description" content={metadata.description ?? ""} />
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      </Head>
      <body className={inter.className}>
        <NextAuthProvider>
          <EdgeStoreProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              {children}
            </ThemeProvider>
          </EdgeStoreProvider>
        </NextAuthProvider>
        <ToastContainer />
      </body>
    </html>
  );
}
