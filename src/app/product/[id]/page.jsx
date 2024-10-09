"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { ShoppingCart } from "lucide-react";
import NeoButton from "../../components/NeoButton";

const ProductDetail = () => {
  const params = useParams();
  const { id: _id } = params;
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      if (_id) {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/pub/product/${_id}`
          );
          const data = await response.json();
          setProduct(data);
        } catch (error) {
          console.error("Error fetching product details:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchProduct();
  }, [_id]);

  if (loading) {
    return <p className="text-center text-xl font-semibold">Loading...</p>;
  }

  if (!product) {
    return (
      <p className="text-center text-xl font-semibold">Product not found</p>
    );
  }

  return (
    <div className="flex flex-col border-4 border-black mx-6 md:flex-row items-center justify-center p-8 bg-gradient-to-br from-yellow-400 to-purple-400 min-h-screen font-mono m-3 rounded-xl">
      <div className="w-full md:w-2/3 flex justify-center mb-8 md:mb-0">
        <div className="border-8 border-black text-black bg-white p-6 shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]">
          <img
            src={product.image}
            alt={product.description}
            className="w-full h-auto"
          />
        </div>
      </div>

      <div className="w-full md:w-1/3 space-y-6">
        <h1 className="lg:text-5xl text-3xl font-black text-white bg-blue-600 p-4 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          {product.title || "Product Title"}
        </h1>

        <div className="bg-white border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <div className="mb-4">
            <span className="text-3xl font-bold text-black">Description</span>
          </div>
          <p className="text-black mb-4">
            {product.description || "Product description"}
          </p>

          <div className="mt-4">
            <span className="block text-xl font-bold text-black mb-2">
              Select Size
            </span>
            <div className="flex lg:space-x-4 lg:justify-start justify-center space-x-1">
              {["S", "M", "L", "XL"].map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`border-2 border-black px-6 py-2 text-sm lg:text-lg font-bold cursor-pointer ${
                    selectedSize === size
                      ? "bg-black text-white"
                      : "bg-white text-black"
                  } hover:bg-black hover:text-white transition-all`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        </div>

        <a
          href={product.linkReferensi}
          target="_blank"
          rel="noopener noreferrer"
        >
          <NeoButton className="w-full bg-green-500 hover:bg-green-600 text-white text-xl font-bold py-4 px-6 transition duration-300 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center">
            <ShoppingCart className="mr-2" size={24} />
            Go Shopping Now
          </NeoButton>
        </a>
      </div>
    </div>
  );
};

export default ProductDetail;
