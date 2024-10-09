"use client";
import React, { useState } from "react";
import { X, ShoppingBag, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import LayoutWithNavbar from "../with-navbar";

const CreateStore = () => {
  const router = useRouter();
  const [isModalActive, setIsModalActive] = useState(false);
  const [storeName, setStoreName] = useState("");
  const [storeDescription, setStoreDescription] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const response = await fetch("/api/store", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ storeName, storeDescription }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Store created:", data);
      setIsModalActive(false);
      router.push("/store");
    } catch (error) {
      console.error("Error creating store:", error);
      setError("Failed to create store. Please try again.");
    }
  };

  return (
    <LayoutWithNavbar>
      <div
        className="min-h-screen p-8 flex flex-col mx-6 mt-6 mb-6 rounded-2xl border-4 border-black"
        style={{
          background:
            "linear-gradient(90deg, rgba(0,255,252,1) 0%, rgba(255,0,254,1) 100%) ",
        }}
      >
        <div className="max-w-7xl mx-auto bg-white border-8 border-black rounded-3xl shadow-[8px_8px_0_0_#000] overflow-hidden flex-grow ">
          <div className="p-12 space-y-12 h-full flex flex-col">
            <h1 className="text-6xl font-black text-black text-center mb-12">
              MAKE YOUR OWN STORE HERE
            </h1>

            <div className="flex flex-col md:flex-row items-stretch justify-between gap-12 flex-grow">
              <div className="w-full md:w-1/2 space-y-6">
                <h2 className="text-4xl font-black text-black">Result:</h2>
                <div className="relative">
                  <img
                    className="w-full border-4 border-black shadow-[8px_8px_0_0_#000]"
                    src="/prod_ref.png"
                    alt="Product Reference"
                  />
                </div>
              </div>

              <div className="w-full md:w-1/2 bg-purple-100 border-4 border-black p-8 shadow-[8px_8px_0_0_#000]">
                <h3 className="text-3xl font-bold text-black mb-6">
                  Why create your own store?
                </h3>
                <ul className="space-y-4 text-xl text-black mt-12">
                  <li className="flex items-center">
                    <ShoppingBag className="mr-4 text-black w-8" /> Showcase
                    your unique products
                  </li>
                  <li className="flex items-center">
                    <ShoppingBag className="mr-4 text-black w-8" /> Build your
                    brand identity
                  </li>
                </ul>
              </div>
            </div>

            <div className="flex justify-center mt-8">
              <button
                onClick={() => setIsModalActive(true)}
                className="group px-8 py-4 text-3xl font-bold text-white bg-purple-600 border-4 border-black shadow-[8px_8px_0_0_#000] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] transition-all flex items-center"
              >
                Create Your Store Now
                <ArrowRight className="ml-2 transform group-hover:translate-x-2 transition-transform" />
              </button>
            </div>
          </div>
        </div>

        {isModalActive && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-6">
            <div className="w-full max-w-4xl bg-white border-8 border-black shadow-[16px_16px_0_0_#000] rounded-3xl overflow-hidden">
              <div className="p-6 bg-purple-400 text-black font-bold text-2xl flex justify-between items-center">
                <h2>Create Your Store</h2>
                <button
                  onClick={() => setIsModalActive(false)}
                  className="text-black font-extrabold hover:scale-110 transition-transform"
                >
                  <X size={32} />
                </button>
              </div>

              <form
                onSubmit={handleSubmit}
                className="p-8 space-y-6 flex flex-col justify-between bg-gradient-to-t from-rose-600 to-sky-400"
              >
                {error && (
                  <div
                    className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4"
                    role="alert"
                  >
                    <p>{error}</p>
                  </div>
                )}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-2xl font-bold mb-2 text-black"
                  >
                    Store Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={storeName}
                    onChange={(e) => setStoreName(e.target.value)}
                    className="w-full p-4 text-xl border-4 text-black border-black rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500 bg-white transition-shadow duration-300"
                    placeholder="Enter your awesome store name"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="description"
                    className="block text-2xl font-bold mb-2 text-black"
                  >
                    Store Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={storeDescription}
                    onChange={(e) => setStoreDescription(e.target.value)}
                    className="w-full p-4 text-xl border-4 text-black border-black rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500 bg-white transition-shadow duration-300"
                    rows="4"
                    placeholder="Describe your store in a few sentences"
                    required
                  ></textarea>
                </div>
                <div className="pt-8 flex justify-center">
                  <button
                    type="submit"
                    className="w-2/3 bg-purple-400 text-black text-2xl font-bold py-4 px-6 border-4 border-black rounded-xl shadow-[8px_8px_0_0_#000] transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-none hover:bg-purple-500"
                  >
                    Launch My Store
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </LayoutWithNavbar>
  );
};

export default CreateStore;
