import React from "react";
import NeoButton from "./NeoButton";

const Slider = () => {
  const services = [
    {
      title: "Asset Management",
      description:
        "Institutional-grade fund offerings across active and passive strategies.",
      color: "bg-yellow-300",
    },
    {
      title: "Investment Banking",
      description:
        "Full lifecycle finding, strategic advisory, and general corporate services for blockchain.",
      color: "bg-green-300",
    },
    {
      title: "Chorke Ventures",
      description:
        "Direct investments in early-stage and late-stage venture, liquid cryptocurrency.",
      color: "bg-pink-300",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-black">
      {services.map((service, index) => (
        <div
          key={index}
          className={`${service.color} p-6 border-4 border-black flex flex-col justify-between rounded-2xl`}
        >
          <div>
            <h2 className="text-2xl font-bold mb-4">{service.title}</h2>
            <p className="mb-4">{service.description}</p>
          </div>
          <NeoButton className="w-full mt-auto">Learn More →</NeoButton>
        </div>
      ))}
    </div>
  );
};

export default Slider;
