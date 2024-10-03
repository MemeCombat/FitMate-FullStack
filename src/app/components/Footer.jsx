import React from "react";

const Footer = () => {
  return (
    <footer className="bg-black text-white font-mono">
      <div className="container mx-auto p-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div className="bg-blue-500 p-6 transform -rotate-3 border-4 border-pink-500">
            <h2 className="text-5xl font-bold mb-4 text-yellow-300 tracking-wide">
              FitMate
            </h2>
            <p className="text-xl font-bold bg-red-500 text-white p-3 inline-block transform rotate-2 shadow-lg">
              Your perfect fit, just a click away.
            </p>
          </div>

          <nav className="bg-green-500 p-6 transform rotate-2 border-4 border-black">
            <ul className="space-y-4">
              {["About Us", "Services", "Contact", "Privacy"].map((item) => (
                <li
                  key={item}
                  className="transform hover:-translate-y-1 transition-transform border-l-4 border-yellow-400 pl-2"
                >
                  <a
                    href={`/${item.toLowerCase().replace(" ", "-")}`}
                    className="text-2xl font-bold hover:bg-purple-600 hover:text-yellow-300 p-3 transition-colors block"
                  >
                    {item.toUpperCase()}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Social Connect */}
          <div className="bg-yellow-400 p-6 text-black transform -rotate-1 border-4 border-blue-700">
            <h3 className="text-3xl font-bold mb-4">Connect</h3>
            <div className="flex space-x-4">
              {["twitter", "facebook", "instagram"].map((social) => (
                <a
                  key={social}
                  href={`https://${social}.com`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-black text-yellow-400 p-3 hover:bg-red-500 hover:text-white transition-colors border-4 border-green-500"
                >
                  <svg
                    className="w-8 h-8"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 border-t-4 border-white pt-4 justify-center align-middle items-center mx-auto flex">
          <p className="text-xl font-bold bg-pink-500 text-white p-4 inline-block transform -skew-x-6 border-4 border-yellow-500">
            © {new Date().getFullYear()} FitMate. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
