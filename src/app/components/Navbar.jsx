"use client";
import { useState } from "react";
import Link from "next/link"; // Import Link from Next.js
import NeoButton from "./NeoButton";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="flex justify-between items-center p-4 bg-gradient-to-r from-yellow-200 via-purple-200 to-pink-200 border-4 border-black shadow-lg rounded-2xl mx-6">
      {/* Logo Section */}
      <Link href="/" className="flex items-center space-x-2 cursor-pointer">
        <span className="text-4xl font-monument">❄️</span>
        <span className="text-3xl text-black font-extrabold tracking-wide font-monument">
          FitMate
        </span>
      </Link>

      {/* Navigation Links */}
      <nav
        className={`md:flex space-x-8 ${isOpen ? "block" : "hidden"} md:block`}
      >
        {["Shop Affiliates", "Fitting Room", "Insights", "Company"].map(
          (item) => (
            <Link
              key={item}
              href={
                item === "Fitting Room"
                  ? "/fitting"
                  : item === "Shop Affiliates"
                  ? "/shop-affiliates"
                  : `/${item.toLowerCase().replace(" ", "-")}`
              }
              className="text-lg font-semibold text-black hover:text-indigo-600 transition-colors duration-300 font-monument"
            >
              {item}
            </Link>
          )
        )}
      </nav>

      {/* Contact Button */}
      <NeoButton className="hidden md:block font-monument">CONTACT</NeoButton>

      {/* Mobile Menu Button (Hamburger icon) */}
      <div className="md:hidden flex items-center">
        <button
          className="text-3xl focus:outline-none text-black"
          onClick={() => setIsOpen(!isOpen)} // Toggle mobile menu
        >
          ☰
        </button>
      </div>
    </header>
  );
};

export default Navbar;
