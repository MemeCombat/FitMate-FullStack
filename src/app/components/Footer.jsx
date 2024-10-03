import React from "react";
import { Twitter, Facebook, Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-pink-200 via-yellow-200 to-purple-200 text-white font-mono rounded-2xl p-4 mx-6 border-4 border-black">
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-500 p-4 transform -rotate-2 border-2 border-pink-500 rounded-2xl">
            <h2 className="text-2xl font-bold mb-2 text-yellow-300 tracking-wide">
              FitMate
            </h2>
            <p className="text-sm font-bold bg-red-500 text-white p-1 inline-block transform rotate-1 shadow-md">
              Your perfect fit, just a click away!
            </p>
          </div>
          <div className="bg-green-500 p-4 transform rotate-1 border-2 border-black rounded-2xl">
            <div className="grid grid-cols-2 gap-2">
              <ul className="space-y-2">
                {["About Us", "Services"].map((item) => (
                  <li
                    key={item}
                    className="transform hover:-translate-y-1 transition-transform border-l-2 border-yellow-400 pl-1"
                  >
                    <a
                      href={`/${item.toLowerCase().replace(" ", "-")}`}
                      className="text-base font-bold hover:bg-purple-600 hover:text-yellow-300 p-1 transition-colors block"
                    >
                      {item.toUpperCase()}
                    </a>
                  </li>
                ))}
              </ul>
              <ul className="space-y-2">
                {["Contact", "Privacy"].map((item) => (
                  <li
                    key={item}
                    className="transform hover:-translate-y-1 transition-transform border-l-2 border-yellow-400 pl-1"
                  >
                    <a
                      href={`/${item.toLowerCase().replace(" ", "-")}`}
                      className="text-base font-bold hover:bg-purple-600 hover:text-yellow-300 p-1 transition-colors block"
                    >
                      {item.toUpperCase()}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="bg-yellow-400 p-4 text-black transform -rotate-1 border-2 border-blue-700 rounded-2xl">
            <h3 className="text-xl font-bold mb-2">Connect</h3>
            <div className="flex space-x-4">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:bg-red-500 hover:text-white transition-colors p-2"
              >
                <Twitter className="w-6 h-6" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:bg-red-500 hover:text-white transition-colors p-2"
              >
                <Facebook className="w-6 h-6" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:bg-red-500 hover:text-white transition-colors p-2"
              >
                <Instagram className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-4 border-t-2 border-black pt-2 flex justify-center items-center">
          <p className="mx-auto mt-4 text-s font-bold bg-pink-500 text-white p-1 inline-block transform -skew-x-6 border-2 border-yellow-500">
            © {new Date().getFullYear()} FitMate. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
