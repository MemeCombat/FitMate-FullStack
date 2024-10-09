"use client";
import React, { useState, useRef, useEffect } from "react";

export default function ProfileDropdown({ items, children, colors }) {
  const [isActiveDropdown, setIsActiveDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsActiveDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <div className="relative font-mono" ref={dropdownRef}>
      <button
        aria-haspopup="listbox"
        aria-expanded={isActiveDropdown}
        onClick={() => setIsActiveDropdown(!isActiveDropdown)}
        className="flex items-center justify-center w-11 h-11 border-4 mr-4 border-black bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-x-[6px] active:translate-y-[6px] active:shadow-none transition-all duration-150 ease-in-out rounded-full"
      >
        {children}
      </button>
      {isActiveDropdown && (
        <div
          role="listbox"
          className={`absolute right-0 top-10 mt-4 w-50 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] overflow-hidden z-10 ${colors[0]} justify-center items-center`}
        >
          {items.map((item, index) => (
            <div
              key={index}
              className={`p-3 border-b-4 border-black last:border-b-0 hover:text-white transition-colors duration-150 ease-in-out ${
                colors[index % colors.length]
              }`}
            >
              {item.component} 
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
