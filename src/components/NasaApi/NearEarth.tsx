"use client";
import Head from "next/head";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { TextGenerateEffect } from "../Ui/text-generate-effect";
import Loading from "../others/Loading";

type NearEarthObject = {
  id: string;
  name: string;
  nasa_jpl_url: string;
  absolute_magnitude_h: number;
  estimated_diameter: {
    kilometers: {
      estimated_diameter_min: number;
      estimated_diameter_max: number;
    };
  };
  close_approach_data: {
    close_approach_date: string;
    relative_velocity: {
      kilometers_per_hour: string;
    };
    miss_distance: {
      kilometers: string;
    };
  }[];
};

const NearEarthObjects = () => {
  const [neos, setNeos] = useState<NearEarthObject[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchNeoData = async () => {
      try {
        const response = await axios.get(
          "https://api.nasa.gov/neo/rest/v1/feed",
          {
            params: {
              start_date: "2023-06-01", 
              end_date: "2023-06-07",   
              api_key: "23Tiiz7jAc6DD5PaeCQmxj7Mgb6ah34CcBSudXdA",      // Replace with your NASA API key
            },
          }
        );
        const neoData = Object.values(response.data.near_earth_objects).flat();
        setNeos(neoData as NearEarthObject[]);

      } catch (error) {
        console.error("Error fetching NEO data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNeoData();
  }, []);

  if (loading) {
    return <Loading />;
  }

  const words = "NASA Near Earth Objects";

  return (
    <div>
      <Head>
        <title>Next.js NASA NEO Example</title>
        <meta
          name="description"
          content="Fetch and display NASA NEO data using Next.js"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="text-black bg-blue-100 h-screen p-1 overflow-auto">
        <h1 className="text-xl text-center text-black animate-in font-serif font-semibold ">
          <TextGenerateEffect words={words} />
        </h1>
        <hr />
        <div className="p-4">
          {neos.map((neo) => (
            <div key={neo.id} className="mb-4 p-4 border-b-2 border-gray-300">
              <h2 className="text-lg text-rose-700 font-semibold">{neo.name}</h2>
              <p>
                <strong>Close Approach Date:</strong>{" "}
                {neo.close_approach_data[0].close_approach_date}
              </p>
              <p>
                <strong>Relative Velocity:</strong>{" "}
                {neo.close_approach_data[0].relative_velocity.kilometers_per_hour}{" "}
                km/h
              </p>
              <p>
                <strong>Miss Distance:</strong>{" "}
                {neo.close_approach_data[0].miss_distance.kilometers} km
              </p>
              <p>
                <strong>Estimated Diameter:</strong>{" "}
                {neo.estimated_diameter.kilometers.estimated_diameter_min.toFixed(
                  2
                )}{" "}
                -{" "}
                {neo.estimated_diameter.kilometers.estimated_diameter_max.toFixed(
                  2
                )}{" "}
                km
              </p>
              <a
                href={neo.nasa_jpl_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                More Info
              </a>
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

export default NearEarthObjects;
