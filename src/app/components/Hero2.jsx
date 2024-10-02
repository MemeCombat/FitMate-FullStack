import React from "react";
import NeoButton from "./NeoButton";

const Hero2 = () => {
  return (
    <section className="bg-gradient-to-r from-purple-200 via-pink-200 to-yellow-200 p-8 border-4 border-black flex flex-col md:flex-row items-center space-y-4 w-full md:space-y-0 md:space-x-6 rounded-2xl shadow-lg">
      <div className="flex-1 text-center md:text-left">
        <div className="flex items-center justify-center md:justify-start space-x-4 mb-4">
          <div className="w-12 h-12 bg-gray-300 rounded-full border-2 border-black flex items-center justify-center">
            {/* You can place a logo or icon here */}
            <span className="text-2xl">👗</span> {/* Clothing icon */}
          </div>
          <h1 className="text-3xl text-black font-bold font-monument">
            FitMate
          </h1>
        </div>
        <p className="text-black text-lg mb-6 font-monument">
          Revolutionize your wardrobe with FitMate! Effortlessly find styles
          that enhance your unique shape.
        </p>
        <p className="text-black text-md mb-6 font-monument">
          Our platform uses advanced technology to provide personalized clothing
          recommendations tailored to you.
        </p>
        <NeoButton className="bg-black text-white hover:bg-gray-800 transition-colors duration-300">
          START TRYING ON
        </NeoButton>
      </div>
      <div className="flex-1">
        <div className="relative w-full h-80 overflow-hidden rounded-lg border-4 border-black shadow-md">
          <img
            src="https://i.pinimg.com/originals/dd/b8/5d/ddb85dc58883b87a2ea5324dd37b0fdf.gif"
            alt="FitMate"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 transform hover:scale-110"
          />
          <div className="absolute inset-0 bg-black opacity-0 hover:opacity-50 transition-opacity duration-300"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero2;
