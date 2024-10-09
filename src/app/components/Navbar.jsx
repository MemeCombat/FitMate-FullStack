"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import NeoButton from "./NeoButton";
import { useCookies } from "next-client-cookies";
import Swal from "sweetalert2";
import Dropdown from "./ProfileDropdown";
import { UserCircle, Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [token, setToken] = useState(null);
  const cookies = useCookies();
  const router = useRouter();

  useEffect(() => {
    const tokenFromCookies = cookies.get("Authorization");
    setToken(tokenFromCookies);
  }, [cookies]);

  const handleLogout = () => {
    Swal.fire({
      icon: "success",
      title: "Logged Out",
      text: "You have been logged out.",
      confirmButtonText: "OK",
      confirmButtonColor: "#3085d6",
    }).then(() => {
      cookies.remove("Authorization");
      setToken(null);
      router.push("/");
    });
  };

  const dropdownItems = [
    {
      name: "Logout",
      component: (
        <NeoButton
          onClick={handleLogout}
          className="w-full mr-10 bg-yellow-300 hover:bg-blue-400"
        >
          LOGOUT
        </NeoButton>
      ),
    },
    {
      name: "Token",
      component: (
        <NeoButton
          onClick={() => alert(`Your token is: ${token}`)}
          className="w-full mr-10 bg-blue-300 hover:bg-rose-400"
        >
          VIEW TOKEN
        </NeoButton>
      ),
    },
    {
      name: "My Gallery",
      component: (
        <NeoButton
          onClick={() => router.push("/allGenerate")}
          className="w-full mr-10 bg-blue-300 hover:bg-indigo-400"
        >
          My Gallery
        </NeoButton>
      ),
    },
  ];

  return (
    <header className="relative mt-3 lg:mt-1 bg-gradient-to-r from-yellow-200 via-purple-200 to-pink-200 border-4 border-black shadow-lg rounded-2xl mx-2 sm:mx-5">
      <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <div className="flex items-center">
            <Link
              href="/"
              className="flex items-center space-x-2 cursor-pointer"
            >
              <span className="text-4xl">❄️</span>
              <span className="text-2xl sm:text-3xl text-black font-extrabold tracking-wide">
                FitMate
              </span>
            </Link>
          </div>
          <div className="hidden md:flex md:items-center md:space-x-8 lg:space-x-8">
            {["My Store", "Fitting Room", "Product", "Pricing"].map((item) => (
              <Link
                key={item}
                href={
                  item === "Fitting Room"
                    ? "/fitting"
                    : item === "My Store"
                    ? "/store"
                    : `/${item.toLowerCase().replace(" ", "-")}`
                }
                className="text-xl lg:text-3xl font-bold text-black border-b-4 border-black hover:border-b-0 transition-all duration-300"
              >
                {item}
              </Link>
            ))}
          </div>
          <div className="hidden md:flex items-center">
            {token ? (
              <Dropdown
                items={dropdownItems}
                colors={["bg-pink-300", "bg-purple-300", "bg-blue-300"]}
              >
                <UserCircle size={40} className="text-black cursor-pointer" />
              </Dropdown>
            ) : (
              <Link href="/login">
                <NeoButton className="w-full">LOGIN</NeoButton>
              </Link>
            )}
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-black hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {["My Store", "Fitting Room", "Product", "Pricing"].map((item) => (
              <Link
                key={item}
                href={
                  item === "Fitting Room"
                    ? "/fitting"
                    : item === "My Store"
                    ? "/store"
                    : `/${item.toLowerCase().replace(" ", "-")}`
                }
                className="text-black hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsOpen(false)}
              >
                {item}
              </Link>
            ))}
            {token ? (
              dropdownItems.map((item, index) => (
                <div key={index} className="px-3 py-2">
                  {item.component}
                </div>
              ))
            ) : (
              <Link
                href="/login"
                className="block px-3 py-2"
                onClick={() => setIsOpen(false)}
              >
                <NeoButton className="w-full">LOGIN</NeoButton>
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
