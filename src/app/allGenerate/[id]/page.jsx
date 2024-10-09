"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";

const GeneratePhotoDetail = () => {
  const [photo, setPhoto] = useState(null);
  const [error, setError] = useState(null);

  const params = useParams();
  const { id } = params; 

  useEffect(() => {
    if (id) {
      console.log(`Fetching photo with ID: ${id}`);
      fetch(`/api/generatedPhotos/${id}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          if (!data || data.error) {
            throw new Error("Photo not found or invalid response.");
          }
          setPhoto(data); 
        })
        .catch((error) => {
          console.error("Error fetching photo:", error);
          setError("Failed to load photo. Please try again later.");
        });
    } else {
      console.error("ID parameter is missing");
      setError("Invalid photo ID.");
    }
  }, [id]); 

  if (error) {
    return <div className="text-red-500 text-center mt-4">{error}</div>;
  }

  if (!photo) {
    return <div className="text-center mt-4">Loading...</div>;
  }

  return (
    <section className="p-8 bg-gradient-to-r from-pink-300 via-purple-300 to-blue-300 min-h-screen mx-6 mt-6 mb-6 rounded-2xl border-4 border-black shadow-xl">
      <h1 className="text-center text-3xl font-extrabold my-6 text-gray-800">
        Generated Photo Details
      </h1>
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        {photo.imgUrl ? (
          <img
            src={photo.imgUrl}
            alt={`Generated Photo ${photo._id}`}
            className="w-full h-64 object-cover rounded-lg mb-4"
          />
        ) : (
          <div className="w-full h-64 bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
            <span>No Image Available</span>
          </div>
        )}
        <div className="space-y-2">
          <p>
            <strong>Photo ID:</strong> {photo._id}
          </p>
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

export default GeneratePhotoDetail;
