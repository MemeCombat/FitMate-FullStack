"use client";
import { useEffect, useState } from "react";
import NeoButton from "./NeoButton";
import ImageCard from "./ImageCard";

const Hero2 = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/productPhoto`
        );
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching product photos:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <section className="bg-red-300 p-8 border-4 border-black flex flex-col items-center space-y-8 w-full rounded-2xl shadow-2xl">
      {/* Top bar for brands */}
      <div className="w-full flex justify-between items-center space-x-4 p-4 bg-black text-white rounded-xl shadow-md">
        <div className="flex space-x-4">
          <img
            src="https://asset-3s.3second.co.id/p/logo.png"
            alt="3second"
            className="h-20"
          />
          <img
            src="https://asset-3s.3second.co.id/p/logo.png"
            alt="3second"
            className="h-20"
          />
          <img
            src="https://asset-3s.3second.co.id/p/logo.png"
            alt="3second"
            className="h-20"
          />
          <img
            src="https://asset-3s.3second.co.id/p/logo.png"
            alt="Gucci"
            className="h-20"
          />
          <img
            src="https://asset-3s.3second.co.id/p/logo.png"
            alt="Shopify"
            className="h-20"
          />
          <img
            src="https://asset-3s.3second.co.id/p/logo.png"
            alt="Uniqlo"
            className="h-20"
          />
        </div>
        <NeoButton className="bg-white text-black border-black border-2 hover:bg-gray-100 transition-colors duration-300 rounded-lg px-4 py-2 shadow-sm">
          View all brands
        </NeoButton>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full h-full">
        {products.map((product) => (
          <ImageCard key={product._id} imgaeUrl={product.imgUrl}>
            <div>
              <p className="text-lg font-semibold">{product.description}</p>
              <p className="text-sm text-gray-500">Size: {product.size}</p>
              <a
                href={product.linkReferensi}
                className="text-blue-500 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                View More
              </a>
            </div>
          </ImageCard>
        ))}
      </div>

      <div className="w-full flex justify-center">
        <NeoButton className="bg-black text-white hover:bg-gray-800 transition-colors duration-300 rounded-lg px-6 py-3 shadow-lg">
          View all offers
        </NeoButton>
      </div>
    </section>
  );
};

export default Hero2;
