"use client";
import Head from "next/head";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { TextGenerateEffect } from "../Ui/text-generate-effect";
import Loading from "../others/Loading";
import Image from "next/image";

type MarsRoverPhoto = {
  id: number;
  img_src: string;
  earth_date: string;
  rover: {
    name: string;
  };
  camera: {
    full_name: string;
  };
};

const MarsRoverPhotos = () => {
  const [photos, setPhotos] = useState<MarsRoverPhoto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchMarsRoverPhotos = async () => {
      try {
        const response = await axios.get(
          "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos",
          {
            params: {
              sol: 1000,
              api_key: "23Tiiz7jAc6DD5PaeCQmxj7Mgb6ah34CcBSudXdA",
            },
          }
        );

        setPhotos(response.data.photos);
      } catch (error) {
        console.error("Error fetching Mars Rover photos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMarsRoverPhotos();
  }, []);

  if (loading) {
    return <Loading />;
  }

  const words = "NASA Mars Rover Photos";

  return (
    <div>
      <Head>
        <title>Next.js NASA Mars Rover Photos Example</title>
        <meta
          name="description"
          content="Fetch and display NASA Mars Rover Photos using Next.js"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="text-black bg-red-100 h-screen p-1 overflow-auto">
        <h1 className="text-xl text-center text-black animate-in font-serif font-semibold ">
          <TextGenerateEffect words={words} />
        </h1>
        <hr />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
          {photos.map((photo) => (
            <div key={photo.id} className="text-center">
              <Image
                src={photo.img_src}
                alt={`Mars Rover ${photo.rover.name}`}
                width={600} // Specify the width of the image
                height={400} // Specify the height of the image
                className="max-w-full h-auto" // Optional: Additional CSS classes for styling
              />
              <p className="text-amber-700 text-sm font-medium">
                {photo.earth_date}
              </p>
              <p className="text-rose-700 text-lg font-semibold">
                {photo.rover.name}
              </p>
              <p className="text-gray-700 text-sm">{photo.camera.full_name}</p>
            </div>
          ))}
        </div>
      </main>

      <footer>
        <p>© {new Date().getFullYear()}, Your Name</p>
      </footer>
    </div>
  );
};

export default MarsRoverPhotos;
