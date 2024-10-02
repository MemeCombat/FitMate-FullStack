import React from "react";
import Hero from "./components/Hero";
import Slider from "./components/Slider";
import Hero2 from "./components/Hero2";

export default function Home() {
  return (
    <div className="min-h-screen bg-black font-sans">
      <main>
        <Hero />
        <Slider />
        <Hero2 />
      </main>
    </div>
  );
}
