"use client";
import React from "react";
import LayoutWithNavbar from "../with-navbar";

const Generate = ({ searchParams }) => {
  // Destructure the images from searchParams
  const { userImage, outfitImage } = searchParams;

  return (
    <LayoutWithNavbar>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
        <h1 className="text-4xl font-bold mb-4">Generated Fitting Result</h1>
        <div className="flex flex-col space-y-4">
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
          {userImage && outfitImage && (
            <div className="p-4 bg-white border-2 border-black rounded-lg shadow-md mt-4">
              <h2 className="text-2xl font-semibold mb-2">Generated Fitting</h2>
              <img
                src={userImage}
                alt="Generated Fitting"
                className="rounded-lg border-4 border-black shadow-lg"
              />
            </div>
          )}
        </div>
      </div>
    </LayoutWithNavbar>
  );
};

export default Generate;
