import React from "react";
import Hero from "./components/Hero";
import Slider from "./components/Slider";
import Hero2 from "./components/Hero2";

export default function Home() {
  return (
    <div className="min-h-screen bg-white font-sans">
      <header className="flex justify-between items-center p-6 bg-white border-b-4 border-black">
        <div className="flex items-center space-x-2">
          <span className="text-3xl">❄️</span>
          <span className="text-2xl font-bold">Chorke</span>
        </div>
        <nav className="space-x-6">
          {["Platform Solutions", "Clients", "Insights", "Company"].map(
            (item) => (
              <a
                key={item}
                href="#"
                className="text-black hover:underline font-bold"
              >
                {item}
              </a>
            )
          )}
        </nav>
        <NeoButton>CONTACT</NeoButton>
      </header>

      <main className="p-6 space-y-6">
        <section className="bg-gradient-to-r from-yellow-200 via-purple-200 to-pink-200 p-8 border-4 border-black">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-12 h-12 bg-gray-300 rounded-full border-2 border-black"></div>
            <h1 className="text-3xl font-bold">
              Engineering a new economic paradigm
            </h1>
          </div>
          <p className="text-lg mb-6">
            We are a digital asset and blockchain leader helping institutions,
            startups, and qualified individuals shape a changing economy. We
            provide platform solutions custom-made for a digitally native
            ecosystem.
          </p>
          <div className="flex items-center space-x-4">
            <div className="w-48 h-48 bg-gray-300 border-4 border-black"></div>
            <NeoButton>GET STARTED</NeoButton>
          </div>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
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
                "Direct investments in early-stage and late stage venture, liquid cryptocurrency.",
              color: "bg-pink-300",
            },
          ].map((service, index) => (
            <div
              key={index}
              className={`${service.color} p-6 border-4 border-black`}
            >
              <h2 className="text-2xl font-bold mb-4">{service.title}</h2>
              <p className="mb-4">{service.description}</p>
              <NeoButton className="w-full">Learn More →</NeoButton>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
