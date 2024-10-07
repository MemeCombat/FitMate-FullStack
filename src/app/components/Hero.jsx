import React from "react";
import NeoButton from "./NeoButton";

const Hero = () => {
  return (
    <section className="bg-gradient-to-r from-yellow-200 via-purple-200 to-pink-200 rounded-2xl p-8 border-4 border-black flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6 w-full">
      <div className="flex-1 text-center md:text-left">
        <div className="flex items-center justify-center md:justify-start space-x-4 mb-4">
          <h1 className="text-7xl md:text-9xl text-black">FitMate</h1>
        </div>
        <p className="text-black text-lg mb-6 font-comfortaa">
          Try on clothes that suit your body shape effortlessly with our
          innovative platform.
        </p>
        <NeoButton>GET STARTED</NeoButton>
      </div>
      <div className="flex-1">
        <div className="relative w-full h-64 md:h-80 overflow-hidden rounded-lg">
          <img
            src="https://i.pinimg.com/originals/9e/01/90/9e0190df022b65af7556107fc4a3c4ee.gif"
            alt="FitMate"
            className="flex border-4 border-black w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
