"use client";
import React, { useEffect, useState } from "react";
import ButtonAddProduct from "../components/ButtonAddProduct";
import ProductCard from "../components/ProductCard";
import { useCookies } from "next-client-cookies";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const cookies = useCookies();
  const router = useRouter();

  useEffect(() => {
    const token = cookies.get("Authorization");
    if (!token) {
      Swal.fire({
        icon: "warning",
        title: "You must log in first!",
        text: "Please log in to access the Shop.",
        confirmButtonText: "OK",
        confirmButtonColor: "#3085d6",
      }).then(() => {
        router.push("/login");
      });
      return;
    }

    const fetchProducts = async () => {
      // const userId = cookies.get("Authorization");

      const response = await fetch(`/api/store/getByUserId`);
      if (response.ok) {
        const data = await response.json();
        setProducts(data);
      } else {
        console.error("Failed to fetch products");
      }
      setLoading(false);
    };

    fetchProducts();
  }, [cookies, router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-500 to-yellow-300 py-12 px-4 sm:px-6 lg:px-8 m-3 mx-6 mt-6 mb-6 rounded-2xl border-4 border-black">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-8 mb-12 rounded-none">
          <div className="flex flex-col sm:flex-row items-center justify-between">
            <ButtonAddProduct />
          </div>
        </div>
        <div className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-8 rounded-none">
          <h2 className="text-4xl font-black text-black mb-8 border-b-4 border-black pb-4 bg-green-400 inline-block transform ">
            ALL PRODUCTS
          </h2>
          {loading ? (
            <p className="text-xl text-center">Loading products...</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Shop;
