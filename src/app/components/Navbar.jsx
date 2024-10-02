import React from "react";
import NeoButton from "./NeoButton";

const Navbar = () => {
  return (
    <header className="flex justify-between items-center p-4 bg-gradient-to-r from-yellow-200 via-purple-200 to-pink-200 border-4 border-black shadow-lg rounded-2xl mx-6">
      {/* Logo Section */}
      <div className="flex items-center space-x-2 cursor-pointer">
        <span className="text-4xl">❄️</span>
        <span className="text-3xl text-black font-extrabold tracking-wide">
          FitMate
        </span>
      </div>

      {/* Navigation Links */}
      <nav className="hidden md:flex space-x-8">
        {["Shop Affiliates", "Wishlist", "Insights", "Company"].map((item) => (
          <a
            key={item}
            href="#"
            className="text-lg font-semibold text-black hover:text-indigo-600 transition-colors duration-300"
          >
            {item}
          </a>
        ))}
      </nav>

      {/* Contact Button */}
      <NeoButton className="hidden md:block">CONTACT</NeoButton>

      {/* Mobile Menu Button (Hamburger icon) */}
      <div className="md:hidden flex items-center">
        <button className="text-3xl focus:outline-none text-black">☰</button>
      </div>
    </header>
  );
};

export default Navbar;
