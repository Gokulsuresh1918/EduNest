"use client";
import Head from "next/head";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { TextGenerateEffect } from "../Ui/text-generate-effect";
import Loading from "../others/Loading";
import Image from "next/image";

type NasaApodData = {
  date: string;
  explanation: string;
  hdurl: string;
  title: string;
};

const NasaApi = () => {
  const [apodData, setApodData] = useState<NasaApodData | null>(null);

  useEffect(() => {
    const fetchApodData = async () => {
      try {
        const response = await axios.get<NasaApodData>(
          "https://api.nasa.gov/planetary/apod",
          {
            params: {
              api_key: "23Tiiz7jAc6DD5PaeCQmxj7Mgb6ah34CcBSudXdA",
            },
          }
        );

        setApodData(response.data);
      } catch (error) {
        console.error("Error fetching NASA APOD data:", error);
      }
    };

    fetchApodData();
  }, []);

  if (!apodData) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  const words = "   NASA Astronomy Picture of the Day";

  return (
    <div>
      <Head>
        <title>Next.js NASA APOD Example</title>
        <meta
          name="description"
          content="Fetch and display NASA APOD using Next.js"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="text-black bg-red-100 h-screen p-1 overflow-auto">
        <h1 className="text-xl text-center text-black animate-in font-serif font-semibold ">
          <TextGenerateEffect words={words} />
        </h1>
        <hr />
        <div className="text-center text-xs">
          <h2 className="p-2 text-rose-700 text-lg font-semibold">
            {apodData.title}
          </h2>
          <p className="text-amber-700 text-sm font-medium">{apodData.date}</p>
          <Image
            src={apodData.hdurl}
            alt={apodData.title}
            width={600}
            height={400}
            style={{ maxWidth: "100%" }}
          />
          <p>{apodData.explanation}</p>
        </div>
      </main>

      <footer>
        <p>© {new Date().getFullYear()}, Your Name</p>
      </footer>
    </div>
  );
};

export default NasaApi;
