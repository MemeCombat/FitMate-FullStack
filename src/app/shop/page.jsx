import React from "react";
import ImageCard from "../components/ImageCard";
import Button from "../components/Button";

const Shop = () => {
  const products = [
    {
      name: "Jilbab Instan Pinguin Non Ped / Syria Menutup",
      price: "Rp10.999",
      discount: "8%",
      rating: "4.5",
      sales: "10RB+",
    },
    {
      name: "Jilbab Sport Hamidah S M L",
      price: "Rp8.800",
      discount: "2%",
      rating: "4.4",
      sales: "10RB+",
    },
    {
      name: "Inner Turki / Inner Turki / Cepol",
      price: "Rp10.700",
      discount: "57%",
      rating: "4.8",
      sales: "10RB+",
    },
    {
      name: "Jilbab Sport Grade B / Bergo Sport S / Jilbab Voll",
      price: "Rp6.175",
      discount: "38%",
      rating: "4.5",
      sales: "10RB+",
    },
    {
      name: "Jilbab Hamidah S M L",
      price: "Rp12.478",
      discount: "11%",
      rating: "4.4",
      sales: "3,3RB",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-200 to-orange-300 py-12">
      <div className="container mx-auto px-4">
        <div className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-8 mb-12 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div>
                <h1 className="text-4xl text-black font-black">Sazi Shop</h1>
              </div>
            </div>
            <Button className=" hover:bg-blue-500 transition-colors duration-300 px-6 py-2 rounded-full text-lg font-semibold">
              Follow
            </Button>
          </div>
        </div>
        <div className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-8 rounded-lg">
          <h2 className="text-2xl font-extrabold text-black mb-8 border-b-4 border-black pb-4">
            ALL PRODUCT
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
            {products.map((product, index) => (
              <div
                key={index}
                className="transform hover:scale-105 transition-transform duration-300"
              >
                <ImageCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
