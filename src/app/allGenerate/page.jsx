"use client";

import React, { useEffect, useState } from "react";
import GenerateCard from "../components/GenerateCard";
import { useRouter } from "next/navigation";
import LayoutWithNavbar from "../with-navbar";

const AllGeneratePage = () => {
  const [photos, setPhotos] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/generatedPhoto/userId")
      .then((response) => response.json())
      .then((data) => setPhotos(data))
      .catch((error) => console.error("Error fetching photos:", error));
  }, []);

  const handleCardClick = (id) => {
    if (id) {
      router.push(`/result?productId=${id}`);
    } else {
      console.error("Invalid ID, cannot navigate.");
    }
  };

  return (
    <LayoutWithNavbar>
      <section className="p-8 bg-gradient-to-r from-pink-300 via-purple-300 to-blue-300 min-h-screen mx-6 mt-6 mb-6 rounded-2xl border-4 border-black shadow-xl">
        <h1 className="text-center text-3xl font-extrabold my-6 text-gray-800">
          Generated Photos
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-black">
          {photos.map((photo, index) => (
            <GenerateCard
              key={photo._id}
              photo={photo}
              index={index}
              onClick={() => handleCardClick(photo._id)}
            />
          ))}
        </div>
      </section>
    </LayoutWithNavbar>
  );
};

export default AllGeneratePage;
