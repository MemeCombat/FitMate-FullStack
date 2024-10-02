import React from "react";
import { Star, MessageCircle, UserPlus } from "lucide-react";

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
    <div className="container mx-auto p-8 bg-yellow-200">
      <div className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6 mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-24 h-24 bg-blue-500 border-4 border-black rounded-full overflow-hidden">
              <img
                src="/api/placeholder/100/100"
                alt="Sazi Shop Logo"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="ml-4">
              <h1 className="text-3xl font-bold">Sazi Shop</h1>
              <p className="text-lg">Aktif 3 menit lalu</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button className="bg-red-500 text-white px-6 py-3 text-lg font-bold border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all">
              Star+
            </button>
            <button className="bg-green-400 text-black px-6 py-3 text-lg font-bold border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all flex items-center">
              <UserPlus className="mr-2" /> IKUTI
            </button>
            <button className="bg-blue-400 text-black px-6 py-3 text-lg font-bold border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all flex items-center">
              <MessageCircle className="mr-2" /> CHAT
            </button>
          </div>
        </div>
      </div>
      <div className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6">
        <h2 className="text-2xl font-bold mb-6">KAMU MUNGKIN SUKA</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {products.map((product, index) => (
            <div
              key={index}
              className="bg-pink-200 border-2 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
            >
              <div className="bg-white border-2 border-black mb-4">
                <img
                  src={`/api/placeholder/200/200?text=Product${index + 1}`}
                  alt={`Product ${index + 1}`}
                  className="w-full h-48 object-cover"
                />
              </div>
              <p className="text-sm font-bold mb-2">{product.name}</p>
              <p className="text-red-500 font-bold text-lg">
                {product.price}{" "}
                <span className="text-gray-500 line-through text-sm">
                  -{product.discount}
                </span>
              </p>
              <p className="text-yellow-500 flex items-center mt-2">
                <Star className="mr-1" fill="currentColor" /> {product.rating}{" "}
                {product.sales} Terjual
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Shop;
