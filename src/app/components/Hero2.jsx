import React from "react";
import NeoButton from "./NeoButton";

const Hero2 = () => {
  return (
    <section className="bg-gradient-to-r rounded-2xl from-yellow-200 via-purple-200 to-pink-200 p-8 border-4 border-black flex flex-col md:flex-row items-center space-y-4 w-full md:space-y-0 md:space-x-6">
      <div className="flex-1">
        <div className="flex items-center space-x-4 mb-4">
          <div className="w-12 h-12 bg-gray-300 rounded-full border-2 border-black"></div>
          <h1 className="text-3xl text-black font-bold">FitMate</h1>
        </div>
        <p className="text-black text-lg mb-6">
          Try on clothes that suit your body shape effortlessly with our
          innovative platform.
        </p>
        <NeoButton>GET STARTED</NeoButton>
      </div>
      <div className="flex-1">
        <div className="relative w-full h-80 overflow-hidden rounded-lg border-4 border-black">
          <img
            src="https://i.pinimg.com/originals/dd/b8/5d/ddb85dc58883b87a2ea5324dd37b0fdf.gif"
            alt="FitMate"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero2;
