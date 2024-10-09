import React from "react";
import Button from "../components/Button";

const PricingCard = ({ type, price, description, isPopular, token, color }) => {
  const backgroundColor = getBackgroundColor(type, color);

  return (
    <div
      className={`border-4 border-black p-6 ${backgroundColor} shadow-[8px_8px_0_rgba(0,0,0,1)] relative flex flex-col justify-between h-full w-full`}
    >
      {isPopular && <PopularBadge />}
      <PricingCardHeader type={type} />
      <PricingCardBody price={price} token={token} description={description} />
      <PricingCardFooter />
    </div>
  );
};

const getBackgroundColor = (type, color) => {
  switch (type.toUpperCase()) {
    case "GOLD":
      return "bg-yellow-400";
    case "SILVER":
      return "bg-gray-400";
    case "BRONZE":
      return "bg-yellow-700";
    default:
      return color;
  }
};

const PopularBadge = () => (
  <div className="bg-black text-white font-bold py-1 px-4 absolute top-0 right-0">
    Popular
  </div>
);

const PricingCardHeader = ({ type }) => (
  <h2 className="text-4xl font-black text-black mb-2">{type}</h2>
);

const PricingCardBody = ({ price, token, description }) => (
  <div>
    <p className="text-5xl font-black text-black mb-4">{price}</p>
    <p className="text-xl text-black mb-6 font-bold">
      get {token} token for fitting
    </p>
    <p className="text-xl text-black mb-6 font-bold">{description}</p>
    <ul className="space-y-3 text-black mb-8"></ul>
  </div>
);

const PricingCardFooter = () => (
  <div className="mt-auto">
    <Button className="w-full justify-center">Click here to buy</Button>
  </div>
);

export default PricingCard;