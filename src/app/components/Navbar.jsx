"use client";
import { useState, useEffect, use } from "react";
import Link from "next/link";
import NeoButton from "./NeoButton";
import { useCookies } from "next-client-cookies";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [token, setToken] = useState(null);
  const cookies = useCookies();
  useEffect(() => {
    const tokenFromCookies = document.cookie
      .split("; ")
      .find((row) => row.startsWith("Authorization="))
      ?.split("=")[1];

    setToken(tokenFromCookies);
  }, []);

  // const handleLogout = () => {
  //   cookies.remove("Authorization");
  // };

  return (
    <header className="flex justify-between mt-1 items-center p-4 bg-gradient-to-r from-yellow-200 via-purple-200 to-pink-200 border-4 border-black shadow-lg rounded-2xl mx-6">
      <Link href="/" className="flex items-center space-x-2 cursor-pointer">
        <span className="text-4xl">❄️</span>
        <span className="text-3xl text-black font-extrabold tracking-wide">
          FitMate
        </span>
      </Link>

      <nav
        className={`md:flex space-x-8 ${isOpen ? "block" : "hidden"} md:block`}
      >
        {["Shop Affiliates", "Fitting Room", "Product", "Company"].map(
          (item) => (
            <Link
              key={item}
              href={
                item === "Fitting Room"
                  ? "/fitting"
                  : item === "Shop Affiliates"
                  ? "/shop"
                  : `/${item.toLowerCase().replace(" ", "-")}`
              }
              className="text-2xl font-black text-black border-b-2 border-red-500 hover:border-b-0 transition-all duration-300"
            >
              {item}
            </Link>
          )
        )}
      </nav>

      {token ? (
        <NeoButton
          onClick={() => cookies.remove("Authorization")}
          className="hidden md:block"
        >
          LOGOUT
        </NeoButton>
      ) : (
        <Link href="/login" className="hidden md:block">
          <NeoButton>LOGIN</NeoButton>
        </Link>
      )}

      <div className="md:hidden flex items-center">
        <button
          className="text-3xl focus:outline-none text-black"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>
      </div>
    </header>
  );
};

export default Navbar;
