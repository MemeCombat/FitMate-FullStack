"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Link from "next/link";
import NeoButton from "./NeoButton";
import Card from "./Card";
import Card from "./Card";

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
    return <p className="text-center text-xl font-semibold">Loading...</p>;
  }

  return (
    <section className="bg-pink-300 p-6 md:p-10 border-4 border-black flex flex-col items-center space-y-10 w-full rounded-3xl shadow-2xl">
      {/* Top bar for brands */}
      <div className="w-full flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0 md:space-x-6 p-6 bg-blue-900 border-4 border-black text-white rounded-xl shadow-lg">
        <div className="flex flex-wrap justify-center md:justify-start space-x-6">
          <img
            src="https://asset-3s.3second.co.id/p/logo.png"
            alt="3second"
            className="h-14 md:h-24 object-contain"
          />
          <img
            src="https://blogger.googleusercontent.com/img/a/AVvXsEgGVv8Gi2XDoITQQ71GYXj2NFhd2XI4AHn1xFckht8rUAxADZX7FNs5vG0uHzGNe-kaEIohMcNcg8Q5mVPWYbW2pPjQKsc3PYeE8xdnUEPPFDQVzrQGg9aNXAuV1JxYRGTeEBTs_UOL1P_Wwe_IlxZgKsgoOJx2Af-0itDL4vDzeNvKWPBDSoeAwj30EQ=w226-h320"
            alt="3second"
            className="h-14 md:h-24 object-contain"
          />
          <img
            src="https://logos-world.net/wp-content/uploads/2020/04/Tommy-Hilfiger-Logo.png"
            alt="Gucci"
            className="h-14 md:h-24 object-contain"
          />
          <img
            src="https://w7.pngwing.com/pngs/586/74/png-transparent-jumpman-air-jordan-nike-logo-brand-nike-physical-fitness-hand-sticker.png"
            alt="Shopify"
            className="h-14 md:h-24 object-contain"
          />
          <img
            src="https://asset-3s.3second.co.id/p/logo.png"
            alt="Uniqlo"
            className="h-14 md:h-24 object-contain"
          />
        </div>
        <NeoButton className="bg-white text-black border-black border-2 hover:bg-gray-200 transition duration-300 rounded-lg px-5 py-3 shadow-md">
          View all brands
        </NeoButton>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 w-full">
        {products.slice(0, 5).map((product) => (
          <div key={product._id}>
            <Card image={product.image}>
              <div className="p-4 bg-white rounded-lg shadow-lg hover:shadow-2xl transition duration-300">
                <p className="text-xl font-semibold text-gray-800">
                  {product.description}
                </p>
                <p className="text-sm text-gray-600">Size: {product.size}</p>
                <Link
                  href={`/product/${product._id}`}
                  passHref
                  className="text-indigo-500 hover:text-indigo-700 hover:underline mt-2 inline-block"
                >
                  View Detail
                </Link>
              </div>
            </Card>
          </div>
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
