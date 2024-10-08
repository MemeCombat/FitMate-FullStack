"use client";
import React, { useEffect, useState } from "react";
import ButtonAddProduct from "../components/ButtonAddProduct";
import ProductCard from "../components/ProductCard";
import { useCookies } from "next-client-cookies";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import NoShop from "../components/NoShop";

const Store = () => {
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
        text: "Please log in to access the Store.",
        confirmButtonText: "OK",
        confirmButtonColor: "#3085d6",
      }).then(() => {
        router.push("/login");
      });
      return;
    }

    const fetchProducts = async () => {
      const userId = cookies.get("userId");
      const response = await fetch(`/api/store/getByUserId?userId=${userId}`);
      if (response.ok) {
        const data = await response.json();
        setProducts(data); // Assuming data is an array of stores
      } else {
        console.error("Failed to fetch products");
      }
      setLoading(false);
    };

    fetchProducts();
  }, [cookies, router]);

  return (
    <section className="p-8 bg-pink-300 min-h-screen mx-6 mt-6 mb-6 rounded-2xl border-4 border-black shadow-lg">
      {loading ? (
        <p className="text-center text-lg font-semibold">Loading...</p>
      ) : products.length === 0 ? (
        <NoShop />
      ) : (
        products.map((store) => (
          <div key={store._id}>
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-4xl font-black mb-2 border-b-4 border-black pb-2 bg-green-400 inline-block">
                {store.name}
              </h1>
              <ButtonAddProduct className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {store.product.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          </div>
        ))
      )}
      <div className="text-center mt-6"></div>
    </section>
  );
};

export default Store;
