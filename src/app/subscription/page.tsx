import NavBar from "@/components/Home/Navbar";
import Footer from "@/components/Footer/footer";
import { EvervaultCardDemo } from "@/components/SubscriptionCard";
import PricingCards from "@/components/SubscriptionDetails";
import React from "react";
import { TextGenerateEffect } from "@/components/Ui/text-generate-effect";

const SubscriptionPage = () => {
  const words = 'Subscribe and Enjoy Premium Plan';
  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 w-full z-50">
        <NavBar />
      </header>
      <main className="flex-grow flex flex-col items-center justify-center p-4 mt-10">
        <div className="hidden sm:block">
          <TextGenerateEffect words={words} />
        </div>
        <div className="w-full max-w-6xl flex flex-col lg:flex-row items-center lg:items-start justify-center gap-10 py-5 mx-auto">
          {/* EvervaultCardDemo Component */}
          <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
            <EvervaultCardDemo />
          </div>
          {/* PricingCards Component */}
          <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
            <PricingCards />
          </div>
        </div>
      </main>
      {/* <footer className="w-full">
        <Footer />
      </footer> */}
    </div>
  );
};

export default SubscriptionPage;
