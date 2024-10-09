"use client";
import { useEffect, useState } from "react";
import Card from "../components/Card";
import NeoButton from "../components/NeoButton";
import Link from "next/link";

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/pub/productPhotoPub`
        );
        const data = await response.json();

        console.log("Fetched products:", data);

        if (Array.isArray(data)) {
          setProducts(data);
        } else if (Array.isArray(data.photos)) {
          setProducts(data.photos);
        } else {
          console.error("Data is not an array:", data);
          setProducts([]);
        }
      } catch (error) {
        console.error("Error fetching product photos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <p className="text-center text-xl font-semibold text-black">Loading...</p>
    );
  }

  return (
    <section className="p-8 bg-pink-300 min-h-screen mx-6 mt-6 mb-6 rounded-2xl border-4 border-black shadow-lg">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
        All Products
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 ">
        {products.map((product) => (
          <div key={product._id} className="group">
            <Card image={product.image || product.imgUrl}>
              <div className="p-4 w-full h-full bg-white rounded-lg shadow-lg transition-transform duration-300 transform group-hover:scale-105">
                <p className="text-xl font-semibold text-gray-800 mb-2">
                  {product.title}
                </p>
                <p className="text-sm text-gray-600">Size: {product.size}</p>
                <Link href={`/product/${product._id}`}>
                  <span className="text-indigo-500 hover:text-indigo-700 hover:underline mt-2 inline-block cursor-pointer">
                    View Details
                  </span>
                </Link>
              </div>
            </Card>
          </div>
        ))}
      </div>
      <Link href="/">
        <div className="mt-8 flex justify-center">
          <NeoButton className="bg-black text-white hover:bg-blue-500 transition duration-300 rounded-lg px-8 py-4 shadow-lg">
            Back to Home
          </NeoButton>
        </div>
      </Link>
    </section>
  );
};

export default ProductPage;
