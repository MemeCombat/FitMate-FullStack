"use client";

import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import { useRouter } from "next/navigation";

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
    router.push(`/allGenerate/${id}`);
  };

  return (
    <section className="p-8 bg-gradient-to-r from-pink-300 via-purple-300 to-blue-300 min-h-screen mx-6 mt-6 mb-6 rounded-2xl border-4 border-black shadow-lg">
      <h1 className="text-center text-2xl font-bold my-4">Generated Photos</h1>
      <div className="container mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {photos.map((photo, index) => (
            <div
              key={index}
              className="mb-4 cursor-pointer transform hover:scale-105 transition-transform duration-300"
              onClick={() => handleCardClick(photo.id)}
            >
              <Card>
                <img
                  src={photo.imgUrl}
                  alt={`Generated ${index}`}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <div className="card-body p-4">
                  <h5 className="text-lg font-semibold">Photo {index + 1}</h5>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AllGeneratePage;
