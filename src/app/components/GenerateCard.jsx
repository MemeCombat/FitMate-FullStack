import React from "react";

const GenerateCard = ({ photo, index, onClick }) => {
  const cardColors = [
    "bg-yellow-300",
    "bg-blue-300",
    "bg-green-300",
    "bg-red-300",
    "bg-purple-300",
  ];

  return (
    <div
      className={`${
        cardColors[index % cardColors.length]
      } transform transition-all duration-300 hover:scale-105 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden cursor-pointer`}
      onClick={() => onClick(photo._id)}
    >
      <div className="relative h-[500px] overflow-hidden">
        <img
          src={photo.imageUrl || photo.imgUrl}
          alt={photo.prompt || photo.title}
          className="w-full h-[500px] object-cover"
        />
      </div>
      <div className="p-4">
        <h5 className="text-lg font-semibold">Photo {index + 1}</h5>
        <h2 className="font-black text-black text-lg mb-1 line-clamp-2">
          {photo.prompt || photo.title}
        </h2>
      </div>
    </div>
  );
};

export default GenerateCard;
