"use client";
import { useEffect, useState } from "react";
import { motion, stagger, useAnimate } from "framer-motion";
import { cn } from "@/utils/cn";

export const TextGenerateEffect = ({
  words,
  className,
}: {
  words: string;
  className?: string;
}) => {
  const [scope, animate] = useAnimate();
  const [style, setStyle] = useState({ textClass: "text-xl text-black", marginTop: "" });
  
  let wordsArray = words.split(" ");

  useEffect(() => {
    animate(
      "span",
      {
        opacity: 1,
      },
      {
        duration: 2,
        delay: stagger(0.2),
      }
    );
  }, [scope]);

  useEffect(() => {
     if (words === 'Subscribe and Enjoy Premium Plan') {
      setStyle({ textClass: 'text-4xl text-white', marginTop: 'mt-4' });
    } else {
      setStyle({ textClass: 'text-xl text-black', marginTop: '' });
    }
  }, [words]);

  const renderWords = () => {
    return (
      <motion.div ref={scope}>
        {wordsArray.map((word, idx) => {
          return (
            <motion.span
              key={word + idx}
              className={`opacity-0 ${style.textClass}`}
            >
              {word}{" "}
            </motion.span>
          );
        })}
      </motion.div>
    );
  };

  return (
    <div className={cn("font-bold", className)}>
      <div className={style.marginTop}>
        <div className={`font-serif leading-snug tracking-wide`}>
          {renderWords()}
        </div>
      </div>
    </div>
  );
};
