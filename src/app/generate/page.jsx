"use client"; // Ensure this is a client component
import React from "react";

const Generate = ({ searchParams }) => {
  // Destructure the images from searchParams
  const { userImage, outfitImage } = searchParams;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-bold mb-4">Generated Fitting Result</h1>
      <div className="flex flex-col space-y-4">
        {/* Display User Image */}
        {userImage && (
          <div className="p-4 bg-white border-2 border-black rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-2">Your Photo</h2>
            <img
              src={userImage}
              alt="User"
              className="rounded-lg border-4 border-black shadow-lg"
            />
          </div>
        )}
        {/* Display Outfit Image */}
        {outfitImage && (
          <div className="p-4 bg-white border-2 border-black rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-2">Outfit Photo</h2>
            <img
              src={outfitImage}
              alt="Outfit"
              className="rounded-lg border-4 border-black shadow-lg"
            />
          </div>
        )}
        {/* Simulate Generated Fitting Result */}
        {userImage && outfitImage && (
          <div className="p-4 bg-white border-2 border-black rounded-lg shadow-md mt-4">
            <h2 className="text-2xl font-semibold mb-2">Generated Fitting</h2>
            <img
              src={userImage} // Here you would show the processed result
              alt="Generated Fitting"
              className="rounded-lg border-4 border-black shadow-lg"
            />
            {/* You can add overlay of outfit over userImage if you have processing logic */}
          </div>
        )}
      </div>
    </div>
  );
};

export default Generate;
