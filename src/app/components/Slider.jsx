import React from "react";
import NeoButton from "./NeoButton";

const Slider = () => {
  const services = [
    {
      title: "Personalized Fitting",
      description:
        "Get tailored fitting suggestions based on your unique body shape and size.",
      color: "bg-yellow-300",
    },
    {
      title: "Virtual Try-On",
      description:
        "Experience clothes virtually before buying, ensuring the perfect fit and style.",
      color: "bg-green-300",
    },
    {
      title: "Seamless Integration",
      description:
        "Easily integrate with your favorite e-commerce platforms for a smooth shopping experience.",
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
            <p className="text-lg mb-4 font-comfortaa">{service.description}</p>
          </div>
          {/* <NeoButton className="w-full mt-auto">Learn More →</NeoButton> */}
        </div>
      ))}
    </div>
  );
};

export default Slider;
