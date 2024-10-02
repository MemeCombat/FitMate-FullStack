import React from "react";

const NeoButton = ({ children, className }) => (
  <button
    className={`px-4 py-2 bg-yellow-400 text-black font-bold border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] transition-all ${className}`}
  >
    {children}
  </button>
);

export default NeoButton;
