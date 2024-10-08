"use client";

import { useState } from "react";
import { Settings } from "lucide-react";

export default function Dropdown({ items, children }) {
  const [isActiveDropdown, setIsActiveDropdown] = useState(false);

  return (
    <div
      data-state={isActiveDropdown ? "open" : "closed"}
      className="relative group text-text"
    >
      <button
        aria-haspopup="listbox"
        aria-expanded={isActiveDropdown}
        onBlur={() => {
          setIsActiveDropdown(false);
        }}
        onClick={() => {
          setIsActiveDropdown(!isActiveDropdown);
        }}
        className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-pink-500 to-yellow-500 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none"
      >
        <div
          className={`transition-transform duration-300 ${
            isActiveDropdown ? "rotate-90" : ""
          }`}
        >
          {children || <Settings className="h-5 w-5 text-white" />}
        </div>
      </button>
      <div
        role="listbox"
        className="absolute right-0 w-40 mt-2 overflow-hidden opacity-0 invisible group-data-[state=open]:opacity-100 group-data-[state=open]:visible rounded-md border-2 border-black bg-white text-center font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all"
      >
        {items.map((item, index) => (
          <a
            key={index}
            href={item.link}
            className={`block w-full border-b-2 border-black last:border-b-0 px-4 py-2 no-underline transition-colors ${
              index % 2 === 0
                ? "bg-red-500 text-white hover:bg-red-700"
                : "bg-blue-500 text-white hover:bg-blue-700"
            }`}
          >
            {item.name}
          </a>
        ))}
      </div>
    </div>
  );
}
