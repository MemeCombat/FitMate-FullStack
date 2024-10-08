"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";

const GenerateDetail = () => {
  const { id } = useParams();
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    if (id) {
      fetch(`/api/generatedPhotos/${id}`)
        .then((response) => response.json())
        .then((data) => setPhoto(data))
        .catch((error) => console.error("Error fetching photo:", error));
    }
  }, [id]);

  if (!photo) {
    return <p>Loading...</p>;
  }

  return (
    <section className="p-8 bg-gradient-to-r from-pink-300 via-purple-300 to-blue-300 min-h-screen mx-6 mt-6 mb-6 rounded-2xl border-4 border-black shadow-lg">
      <h1 className="text-center text-2xl font-bold my-4">Photo Detail</h1>
      <div className="max-w-md mx-auto">
        <img
          src={photo.imgUrl}
          alt={`Photo ${id}`}
          className="w-full h-72 object-cover rounded-lg mb-4"
        />
        <div className="bg-white p-4 rounded-lg shadow-md">
          <p>
            <strong>User ID:</strong> {photo.userId}
          </p>
          <p>
            <strong>Height:</strong> {photo.height}
          </p>
          <p>
            <strong>Weight:</strong> {photo.weight}
          </p>
          <p>
            <strong>Gender:</strong> {photo.gender}
          </p>
          <p>
            <strong>Shop ID:</strong> {photo.shopId}
          </p>
          <p>
            <strong>Product Photo ID:</strong> {photo.productPhotoId}
          </p>
          <p>
            <strong>Result Gemini:</strong> {photo.resultGemini}
          </p>
        </div>
      </div>
    </section>
  );
};

export default GenerateDetail;
