"use client";
import React, { useState, useEffect } from "react";
import { ShoppingCart } from "lucide-react";
import NeoButton from "../../components/NeoButton";
import { useParams } from "next/navigation";
import LayoutWithNavbar from "../../with-navbar";

const ShopDetail = () => {
  const [selectedSize, setSelectedSize] = useState(null);
  const [product, setProduct] = useState({});
  const params = useParams();
  console.log("params: ", params.id);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/productPhoto/getProductById/${params.id}`
        );
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProduct();
  }, [params.id]);

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
  };

  const handleGoShoppingNow = () => {
    window.location.href = product.linkReferensi;
  };

  return (
    <LayoutWithNavbar>
    <div className="flex flex-col border-4 border-black mx-6 md:flex-row items-center justify-center p-8 bg-gradient-to-br from-yellow-400 to-purple-400 min-h-screen font-mono m-3 rounded-xl">
      <div className="w-full md:w-1/2 flex justify-center mb-8 md:mb-0">
        <div className="border-8 border-black text-black bg-white p-6 shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]">
          <img
            src={product.image}
            alt={product.title}
            className="h-[550px] w-[550px] object-cover"
          />
        </div>
      </div>

      <div className="w-full md:w-1/2 space-y-6">
        <h1 className="text-5xl font-black text-white bg-blue-600 p-4 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          {product.title}
        </h1>

        <div className="bg-white border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <div className="mb-4">
            <span className="text-3xl font-bold text-black">Description</span>
          </div>
          <p className="text-black mb-4">{product.description}</p>

          <div className="mt-4">
            <span className="block text-xl font-bold text-black mb-2">
              Select Size
            </span>
            <div className="flex space-x-4">
              {product.size?.map((size) => (
                <button
                  key={size}
                  onClick={() => handleSizeSelect(size)}
                  className={`border-2 border-black px-6 py-2 text-lg font-bold cursor-pointer ${
                    selectedSize === size
                      ? "bg-black text-white"
                      : "bg-white text-black"
                  } hover:bg-black hover:text-white transition-all`}
                >
                  {size.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        </div>

        <NeoButton
          className="w-full bg-green-500 hover:bg-green-600 text-white text-xl font-bold py-4 px-6 transition duration-300 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center"
          onClick={handleGoShoppingNow}
        >
          <ShoppingCart className="mr-2" size={24} />
          Go Shopping Now
        </NeoButton>
      </div>
    </div>
    </LayoutWithNavbar>
  );
};

export default ShopDetail;
