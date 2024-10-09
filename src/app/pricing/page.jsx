"use client";
import React, { useEffect, useState } from "react";
import PricingCard from "../components/PricingCard";
import LayoutWithNavbar from "../with-navbar";

const Pricing = () => {
  const [plans, setPlans] = useState([]);
  const fetchPricing = async () => {
    try {
      const response = await fetch("/api/pack");
      const data = await response.json();
      if (response.ok) {
        setPlans(data);
      } else {
        throw data;
      }
    } catch (error) {
      console.error("Error fetching pricing data:", error);
    }
  };

  useEffect(() => {
    fetchPricing();
  }, []);

  return (
    <LayoutWithNavbar>
      <div className="min-h-screen bg-gradient-to-r from-indigo-500 to-pink-500 p-8 md:p-16 mx-6 mt-6 mb-6 rounded-2xl border-4 border-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="lg:text-7xl text-4xl font-black text-black mb-6">
              Need more fitting?
            </h1>
            <p className="text-2xl text-black font-bold">
              Buy token in here, and fitting your life.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="border-4 border-black p-6 bg-yellow-200 shadow-[8px_8px_0_rgba(0,0,0,1)] relative flex flex-col justify-between h-full w-full">
              <h2 className="text-4xl font-black text-black mb-2">Free</h2>
              <p className="text-4xl font-black text-black mb-4">RP 0</p>
              <p className="text-xl text-black mb-6 font-bold">
                Get 3 tokens for fitting
              </p>
              <p className="text-xl text-black mb-6 font-bold">
                Start your journey with our free plan
              </p>
              <ul className="space-y-3 text-black mb-8">
                <li>✓ Basic features</li>
                <li>✓ Limited access</li>
                <li>✓ Community support</li>
              </ul>
              <div className="mt-auto"></div>
            </div>
            {plans.length > 0 ? (
              plans.map((plan, index) => <PricingCard key={index} {...plan} />)
            ) : (
              <p className="text-3xl font-bold justify-center text-black bg-blue-400 items-center flex text-center">
                Loading pricing data...
              </p>
            )}
          </div>
        </div>
      </div>
    </LayoutWithNavbar>
  );
};

export default Pricing;
