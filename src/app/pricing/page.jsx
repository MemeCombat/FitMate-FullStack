"use client";
import React from "react";
import PricingCard from "../components/PricingCard";
const Pricing = () => {
  const plans = [
    {
      title: "Free",
      price: "$0",
      description: "All freely available components",
      features: [
        "Growing library of components",
        "React / Next.js / Tailwind CSS",
        "MIT License for commercial use",
        "Community support",
      ],
      buttonText: "Browse Components",
      color: "bg-cyan-300",
    },
    {
      title: "Custom",
      price: "$3499",
      description: "Tailored standalone components",
      features: [
        "As many components as possible",
        "React / Next.js / Tailwind CSS",
        "Unlimited revisions",
        "24-hour response time",
      ],
      buttonText: "Buy Now",
      color: "bg-pink-300",
    },
    {
      title: "Pages",
      price: "$4995",
      description: "For early-stage startups",
      features: [
        "One request/page at a time",
        "Design + Development",
        "SEO Integration",
        "CMS Integration",
      ],
      buttonText: "Buy Now",
      isPopular: true,
      color: "bg-yellow-300",
    },
    {
      title: "Website",
      price: "$12,49",
      description: "For small businesses and startups",
      features: [
        "Multi-page website",
        "Web apps and SaaS",
        "Unlimited revisions",
        "24-hour response time",
      ],
      buttonText: "Contact Us",
      color: "bg-green-300",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-500 to-pink-500 p-8 md:p-16 mx-6 mt-6 mb-6 rounded-2xl border-4 border-black">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-7xl font-black text-black mb-6">
            Need custom components
            <br />
            or websites?
          </h1>
          <p className="text-2xl text-black font-bold">
            From components to complete websites, tailored just for you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {plans.map((plan, index) => (
            <PricingCard key={index} {...plan} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Pricing;
