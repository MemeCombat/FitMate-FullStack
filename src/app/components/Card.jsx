import React from "react";

const Card = ({ title, description, image }) => {
  return (
    <div className="bg-white border-4 border-black p-6 shadow-neoBrutalism max-w-sm">
      <div className="overflow-hidden mb-4">
        <img
          src={image}
          alt={title}
          className="w-full h-48 object-cover border-b-4 border-black"
        />
      </div>
      <h2 className="text-3xl font-bold text-black mb-2">{title}</h2>
      <p className="text-lg text-black">{description}</p>
    </div>
  );
};

export default Card;
