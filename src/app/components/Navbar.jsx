import React from "react";
import NeoButton from "./NeoButton";

const Navbar = () => {
  return (
    <header className="flex justify-between items-center p-6 bg-white border-b-4 border-black">
      <div className="flex items-center space-x-2">
        <span className="text-3xl">❄️</span>
        <span className="text-2xl text-black font-bold">FitMate</span>
      </div>
      <nav className="space-x-6">
        {["Shop Affiliates", "Wishlist", "Insights", "Company"].map((item) => (
          <a
            key={item}
            href="#"
            className="text-black hover:underline font-bold"
          >
            {item}
          </a>
        ))}
      </nav>
      <NeoButton>CONTACT</NeoButton>
    </header>
  );
};

export default Navbar;
