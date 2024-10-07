import React from "react";
import Button from "../components/Button";
const PricingCard = ({
  title,
  price,
  description,
  features,
  buttonText,
  isPopular,
  color,
}) => (
  <div
    className={`border-4 border-black p-6 ${color} shadow-[8px_8px_0_rgba(0,0,0,1)] relative flex flex-col justify-between h-full w-full`}
  >
    {isPopular && (
      <div className="bg-black text-white font-bold py-1 px-4 absolute top-0 right-0">
        Popular
      </div>
    )}
    <h2 className="text-4xl font-black text-black mb-2">{title}</h2>
    <p className="text-5xl font-black text-black mb-4">{price}</p>
    <p className="text-xl text-black mb-6 font-bold">{description}</p>
    <ul className="space-y-3 text-black mb-8">
      {features.map((feature, index) => (
        <li key={index} className="flex items-start">
          <span className="text-black font-black mr-2 text-xl">→</span>
          <span className="font-bold">{feature}</span>
        </li>
      ))}
    </ul>
    <div className="mt-auto">
      <Button className="w-full justify-center" label={buttonText} />
    </div>
  </div>
);

export default PricingCard;
