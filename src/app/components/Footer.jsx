import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-[#333] to-[#1c1c1c] text-white py-4">
      <div className="container mx-auto text-center px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-4">
          <div className="mb-4 md:mb-0 text-center md:text-left">
            <h2 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-pink-500">
              FitMate
            </h2>
            <p className="text-xs mt-1 italic">
              Your perfect fit, just a click away.
            </p>
          </div>
          <nav className="mb-4 md:mb-0">
            <ul className="flex flex-col md:flex-row justify-center space-y-2 md:space-y-0 md:space-x-6">
              {["About Us", "Services", "Contact", "Privacy Policy"].map(
                (item) => (
                  <li key={item}>
                    <a
                      href={`/${item.toLowerCase().replace(" ", "-")}`}
                      className="hover:text-yellow-400 transition duration-300 text-md bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-red-500"
                    >
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul>
          </nav>
        </div>
        <div className="flex justify-center mb-4">
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="mx-2 hover:text-yellow-400 transition duration-300"
          >
            <svg
              className="w-5 h-5 md:w-6 md:h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M23 3a10.9 10.9 0 01-3.14.86A4.48 4.48 0 0022.4 1.6a9.16 9.16 0 01-2.89 1.1A4.5 4.5 0 0016.2 0c-2.49 0-4.5 2.2-4.5 4.9 0 .38.04.75.1 1.1C7.68 5.7 4.06 3.73 1.64.96a4.9 4.9 0 00-.61 2.46c0 1.69.88 3.22 2.2 4.1A4.45 4.45 0 01.96 7.3v.06c0 2.27 1.61 4.19 3.74 4.63a4.5 4.5 0 01-2.03.08c.57 1.67 2.25 2.88 4.24 2.93A9.02 9.02 0 010 19.54a12.83 12.83 0 006.93 2.03c8.32 0 12.87-6.89 12.87-12.87 0-.2 0-.41-.02-.61A9.1 9.1 0 0023 3z"
              />
            </svg>
          </a>
        </div>
        <p className="text-xs font-bold">
          © {new Date().getFullYear()} FitMate. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
