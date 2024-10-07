import React from "react";
import Button from "../components/Button";
import Card from "../components/Card";
import Dropdown from "../components/Dropdown";

const Shop = () => {
  const products = [
    {
      name: "Jilbab Instan Pinguin Non Ped / Syria Menutup",
      price: "Rp10.999",
      discount: "8%",
      rating: "4.5",
      sales: "10RB+",
      image:
        "https://kombas.co.id/wp-content/uploads/2023/01/white-denim-jacket-front-view-streetwear-fashion-scaled.jpg",
    },
    {
      name: "Jilbab Sport Hamidah S M L",
      price: "Rp8.800",
      discount: "2%",
      rating: "4.4",
      sales: "10RB+",
      image: "/images/jilbab2.jpg",
    },
    {
      name: "Inner Turki / Inner Turki / Cepol",
      price: "Rp10.700",
      discount: "57%",
      rating: "4.8",
      sales: "10RB+",
      image: "/images/jilbab3.jpg",
    },
    {
      name: "Jilbab Sport Grade B / Bergo Sport S / Jilbab Voll",
      price: "Rp6.175",
      discount: "38%",
      rating: "4.5",
      sales: "10RB+",
      image: "/images/jilbab4.jpg",
    },
    {
      name: "Jilbab Hamidah S M L",
      price: "Rp12.478",
      discount: "11%",
      rating: "4.4",
      sales: "3,3RB",
      image: "/images/jilbab5.jpg",
    },
  ];

  const cardColors = [
    "bg-yellow-300",
    "bg-blue-300",
    "bg-green-300",
    "bg-red-300",
    "bg-purple-300",
  ];
  const rotations = [
    "rotate-1",
    "-rotate-1",
    "rotate-2",
    "-rotate-2",
    "rotate-0",
  ];
  const items = [
    {
      name: "Deleted",
      link: "https://www.youtube.com",
    },
    {
      name: "Updated",
      link: "/update",
    },
  ];

  return (
    <div className="min-h-screen border-4 border-black bg-gradient-to-br from-pink-500 to-yellow-300 py-12 px-4 sm:px-6 lg:px-8 m-3 rounded-lg mx-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-8 mb-12 rounded-none">
          <div className="flex flex-col sm:flex-row items-center justify-between">
            <h1 className="text-5xl text-black font-black bg-red-500 p-2 transform -rotate-2">
              Sazi Shop
            </h1>
            <Button className="transition-all duration-300 px-6 py-2 text-lg font-bold bg-blue-500 text-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none">
              Add new product
            </Button>
          </div>
        </div>
        <div className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-8 rounded-none">
          <h2 className="text-4xl font-black text-black mb-8 border-b-4 border-black pb-4 bg-green-400 inline-block transform rotate-1">
            ALL PRODUCTS
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((product, index) => (
              <Card
                key={index}
                product={product}
                cardColor={cardColors[index % cardColors.length]}
                rotation={rotations[index % rotations.length]}
                DropdownComponent={<Dropdown items={items} />}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
