import React from "react";

const Card = ({ image, children, cardColor, rotation, DropdownComponent }) => {
  return (
    <div
      className={`${cardColor} ${rotation} transform transition-all duration-300 hover:scale-105 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-2xl overflow-hidden`}
    >
      <div className="relative h-[300px] overflow-hidden">
        <img
          className="w-full h-full object-cover transition-transform duration-300 ease-in-out hover:scale-110"
          src={image}
          alt="product"
        />
        <div className="absolute top-0 right-0 m-2">{DropdownComponent}</div>
      </div>
      <div className="p-4 bg-blue-300 text-black dark:text-gray-200">
        {children}
      </div>
    </div>
  );
};

export default Card;
