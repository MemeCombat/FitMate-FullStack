import React from "react";
import Hero from "./components/Hero";
import Slider from "./components/Slider";
import Hero2 from "./components/Hero2";

export default function Home() {
  return (
    <div
      className="min-h-screen bg-white font-MonumentRegular text-black"
      style={{
        backgroundImage: `url('https://i.pinimg.com/originals/dd/b8/5d/ddb85dc58883b87a2ea5324dd37b0fdf.gif')`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
      }}
    >
      <main className="p-6 space-y-6">
        <Hero />
        <Slider />
        <Hero2 />
      </main>
    </div>
  );
}
