import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Nav from "../components/Home/Navbar";
import { NextAuthProvider } from "../app/provider";
import { ThemeProvider } from "../components/others/theme-provider";
import { EdgeStoreProvider } from "../lib/edgestore";
import { ToastContainer } from "react-toastify";
import Head from "next/head";
import { title } from "process";
import { cn } from "@/utils/cn";

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
    <html lang="en" className="h-full">
      <Head>
        <title>EduNest</title>

        <meta name="description" content={metadata.description ?? ""} />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      </Head>
      <body
        className={cn("relative h-full font-sans antialiased", inter.className)}
      >
        <main className="relative flex flex-col min-h-screen">
          <div className="flex-grow flex-1">
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
                <ToastContainer />
              </EdgeStoreProvider>
            </NextAuthProvider>
          </div>
        </main>

        <ToastContainer />
      </body>
    </html>
  );
}
