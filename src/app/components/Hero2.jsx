"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import NeoButton from "./NeoButton";
import Card from "./Card";

// Utility function to truncate product titles
const truncateTitle = (title, maxLength) => {
  if (title.length <= maxLength) return title;
  return title.substring(0, maxLength) + "...";
};

const Hero2 = () => {
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
    <section className="bg-gradient-to-r from-green-200 via-yellow-200 to-pink-200 p-6 md:p-10 border-4 border-black flex flex-col items-center space-y-10 w-full rounded-3xl shadow-2xl">
      <p className="text-4xl font-bold text-black">Featured Items</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 w-full">
        {products.slice(0, 5).map((product) => (
          <Card key={product._id} image={product.image}>
            <div className="p-4 bg-white rounded-lg shadow-lg hover:shadow-2xl transition duration-300">
              <p className="text-xl font-semibold text-gray-800">
                {truncateTitle(product.title, 20)}
              </p>
              <Link
                href={`/product/${product._id}`}
                passHref
                className="text-indigo-500 hover:text-indigo-700 hover:underline mt-2 inline-block"
              >
                View Detail
              </Link>
            </div>
          </Card>
        ))}
      </div>

      <div className="w-full flex justify-center">
        <Link href="/product" passHref>
          <NeoButton className="bg-black text-black hover:bg-blue-500 transition duration-300 rounded-lg px-8 py-4 shadow-lg">
            View all offers
          </NeoButton>
        </Link>
      </div>
    </section>
  );
};

export default Hero2;
