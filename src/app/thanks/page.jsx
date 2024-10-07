import React from "react";

const Thanks = () => {
  return (
    <div className="min-h-screen bg-gradient-to-t from-green-200 via-blue-200 to-pink-200  flex items-center justify-center p-4 mx-6 mt-6 mb-6 rounded-2xl border-4 border-black">
      <div className="bg-white p-8 border-8 border-black shadow-[12px_12px_0_0_#000] max-w-4xl w-full">
        <h1
          className="text-8xl font-black mb-6 text-black uppercase  text-center"
          style={{ textShadow: "4px 4px 0 #ff00ff" }}
        >
          Thank you
        </h1>
        <div className="flex justify-center mb-8">
          <h2 className="text-5xl font-extrabold text-black uppercase bg-green-400 inline-block p-3 shadow-[8px_8px_0_0_#000] transform">
            For your order
          </h2>
        </div>
        <p
          className="text-2xl mb-10 text-black font-bold text-center"
          style={{ fontFamily: "monospace" }}
        >
          Don't forget to subscribe to our newsletter to get updates on our new
          products or exclusive discounts.
        </p>
        <div className="flex justify-center">
          <button className="bg-red-500 text-white font-black py-4 px-10 border-4 border-black uppercase text-2xl hover:bg-red-600 transition-colors shadow-[4px_4px_0_0_#000] transform hover:translate-x-1 hover:translate-y-1 justify-center flex items-center">
            Go Fitting
          </button>
        </div>
      </div>
    </div>
  );
};

export default Thanks;
