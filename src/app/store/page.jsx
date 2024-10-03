"use client";
import React from "react";
import { ChevronLeft, ChevronRight, ShoppingCart } from "lucide-react";

const ShopDetail = () => {
  return (
    <div className="flex flex-col md:flex-row p-8 bg-gradient-to-br from-yellow-400 to-orange-500 min-h-screen font-mono">
      <div className="w-full md:w-1/4 flex flex-col items-center space-y-4 mb-8 md:mb-0">
        {["Main", "Detail", "Back"].map((view, index) => (
          <div
            key={index}
            className="border-4 border-black p-2 bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-shadow duration-300"
          >
            <img
              src={`/api/placeholder/200/200?text=${view}`}
              alt={`${view} view of the t-shirt`}
              className="w-full h-auto transition-transform duration-300 hover:scale-105"
            />
          </div>
        ))}
      </div>

      <div className="w-full md:w-1/2 flex flex-col items-center relative mb-8 md:mb-0 mr-2">
        <div className="border-8 border-black text-black bg-white p-4 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative">
          <img
            src="/api/placeholder/500/500?text=Greenlight+T-Shirt"
            alt="Greenlight Men's T-Shirt"
            className="w-full h-auto"
          />
          <div className="absolute top-4 left-4 bg-red-500 text-white px-4 py-2 font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            NEW
          </div>
        </div>
        <div className="absolute inset-y-0 left-0 flex items-center">
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-none p-3 transition duration-300 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            <ChevronLeft size={24} />
          </button>
        </div>
        <div className="absolute inset-y-0 right-0 flex items-center">
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-none p-3 transition duration-300 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            <ChevronRight size={24} />
          </button>
        </div>
      </div>

      <div className="w-full md:w-1/4 space-y-6">
        <h1 className="text-4xl font-black text-white bg-blue-600 p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          Greenlight Men's T-Shirt
        </h1>
        <div className="bg-white border-4 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <div className="flex justify-between items-center mb-4">
            <span className="text-3xl font-bold text-black">Description</span>
          </div>
          <p className="text-black mb-4">
            Greenlight Kaos Pria Lengan Pendek Heavyweight -- Cocok banget buat
            yang suka tampil simpel tapi tetap kece. Bahan katunnya bikin adem
            dan nyaman dipakai sehari-hari.
          </p>
        </div>

        <button className="w-full bg-green-500 hover:bg-green-600 text-white text-xl font-bold py-4 px-6 transition duration-300 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center">
          <ShoppingCart className="mr-2" size={24} />
          Go Shopping Now
        </button>
      </div>
    </div>
  );
};

export default ShopDetail;
