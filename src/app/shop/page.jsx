"use client";
import React, { useEffect, useState } from "react";
import Button from "../components/Button";
import ProductCard from "../components/ProductCard";
import { useCookies } from "next-client-cookies";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import ButtonAddProduct from "../components/ButtonAddProduct";
import ProductCard from "../components/ProductCard";

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
    // Other products...
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
    <div className="min-h-screen bg-gradient-to-br from-pink-500 to-yellow-300 py-12 px-4 sm:px-6 lg:px-8 m-3 mx-6 mt-6 mb-6 rounded-2xl border-4 border-black">
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
          <h2 className="text-4xl font-black text-black mb-8 border-b-4 border-black pb-4 bg-green-400 inline-block transform ">
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
