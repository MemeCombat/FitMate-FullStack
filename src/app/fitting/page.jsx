"use client";
import React, { useState } from "react";
import NeoButton from "../components/NeoButton";

const Fitting = () => {
  const [userImage, setUserImage] = useState(null);
  const [outfitImage, setOutfitImage] = useState(null);
  const [resultImage, setResultImage] = useState(null);

  const handleUserImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUserImage(URL.createObjectURL(file));
    }
  };

  const handleOutfitImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setOutfitImage(URL.createObjectURL(file));
    }
  };

  const handleGenerate = () => {
    // Simulate the image generation process
    if (userImage && outfitImage) {
      // Here you would usually call an API to generate the image
      // For demonstration, we can just use the user's image
      setResultImage(userImage);
    }
  };

  return (
    <div className="flex flex-col mt-6 mb-6 items-center justify-center min-h-screen mx-4 md:mx-6 bg-gradient-to-r from-yellow-200 via-purple-200 to-pink-200 p-8 border-4 border-black rounded-2xl shadow-lg">
      <h1 className="text-5xl font-bold text-black mb-6 drop-shadow-md">
        Virtual Fitting Room
      </h1>
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 w-full max-w-3xl">
        <div className="flex-1 p-4 bg-white border-2 border-black rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-black mb-2">
            Upload Your Photo
          </h2>
          <input
            type="file"
            accept="image/*"
            onChange={handleUserImageChange}
            className="border-2 border-gray-300 rounded-lg p-2 mb-4 w-full hover:border-yellow-400 transition duration-300"
          />
        </div>
        <div className="flex-1 p-4 bg-white border-2 border-black rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-black mb-2">
            Upload Outfit Photo
          </h2>
          <input
            type="file"
            accept="image/*"
            onChange={handleOutfitImageChange}
            className="border-2 border-gray-300 rounded-lg p-2 mb-4 w-full hover:border-yellow-400 transition duration-300"
          />
        </div>
      </div>
      <NeoButton onClick={handleGenerate} className="mt-6 mb-6">
        Generate Fitting
      </NeoButton>

      {resultImage && (
        <div className="mt-8 p-4 bg-white border-2 border-black rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-black mb-2">
            Generated Result
          </h2>
          <img
            src={resultImage}
            alt="Generated Fitting"
            className="rounded-lg border-4 border-black shadow-lg w-full max-w-md"
          />
        </div>
      )}
    </div>
  );
};

export default Fitting;
