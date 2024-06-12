import React from "react";
import { EvervaultCard, Icon } from "./Ui/evervault-card";

export function EvervaultCardDemo() {
  return (
    <div className="border border-black/[0.2] dark:border-white/[0.2] flex flex-col items-start max-w-sm mx-auto p-4 relative h-[25rem]">
      <Icon className="absolute h-6 w-6 -top-3 -left-3 dark:text-white text-black" />
      <Icon className="absolute h-6 w-6 -bottom-3 -left-3 dark:text-white text-black" />
      <Icon className="absolute h-6 w-6 -top-3 -right-3 dark:text-white text-black" />
      <Icon className="absolute h-6 w-6 -bottom-3 -right-3 dark:text-white text-black" />

      <EvervaultCard text="Subscribe" />

      <h2 className="dark:text-white text-center text-black mt-4 text-sm font-light">
      Subscribe to our service to enjoy exclusive benefits and updates. Stay connected!

      </h2>
      {/* <p className="text-sm border font-light dark:border-white/[0.2] border-black/[0.2] rounded-full mt-4 text-black dark:text-white px-2 py-0.5">
      Click to subscribe
      </p> */}
    </div>
  );
}
