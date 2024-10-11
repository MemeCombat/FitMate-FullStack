"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Markdown from "react-markdown";
import { useRouter } from "next/navigation";
import LayoutWithNavbar from "../with-navbar";
export default function Result() {
  const searchParams = useSearchParams();
  const productId = searchParams.get("productId");
  console.log("productId: ", productId);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchData = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/generatedPhoto/${productId}`
      );
      const data = await response.json();
      console.log("data: ", data);
      setData(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [productId]);

  if (loading) {
    return (
      <p className="text-center text-xl font-semibold text-black">Loading...</p>
    );
  }

  if (!data) {
    return (
      <p className="text-center text-xl font-semibold">Result not found</p>
    );
  }

  return (
    <LayoutWithNavbar>
      <div className="flex flex-col md:flex-row items-center justify-center p-4 md:p-8 bg-gradient-to-br from-yellow-400 to-purple-400 min-h-screen font-mono m-3 rounded-xl">
        <div className="w-full md:w-1/2 lg:w-1/3 flex justify-center mb-8 md:mb-0 md:mr-8">
          <div className="border-4 md:border-8 border-black text-black bg-white p-3 md:p-6 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] md:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]">
            <img
              src={data.imgUrl}
              alt={data.userId}
              className="w-full h-auto max-w-sm"
            />
          </div>
        </div>

        <div className="w-full md:w-1/2 lg:w-2/3 space-y-6">
          <div className="bg-white border-4 border-black p-4 md:p-6 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] md:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <div className="mb-4">
              <span className="text-2xl md:text-3xl font-bold text-black">
                Fashion Recommendation
              </span>
            </div>
            <div className="text-black mb-4 text-sm md:text-base">
              <Markdown>{data.resultGemini || "No result gemini"}</Markdown>
            </div>

            {data.productPhotoId !== "userUploadedPhoto" && (
              <button
                onClick={() => router.push(`/store/${data.productPhotoId}`)}
                className="w-full bg-green-500 hover:bg-green-600 text-white text-lg md:text-xl font-bold py-3 md:py-4 px-4 md:px-6 transition duration-300 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] md:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] md:hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center"
              >
                View More
              </button>
            )}
          </div>
        </div>
      </div>
    </LayoutWithNavbar>
  );
}
