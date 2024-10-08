"use client";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Link from "next/link";
import NeoButton from "../components/NeoButton";
import { useRouter } from "next/navigation";

const Fitting = () => {
  const router = useRouter();
  const [userImage, setUserImage] = useState(null);
  const [outfitImage, setOutfitImage] = useState(null);
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [gender, setGender] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [userImagePreview, setUserImagePreview] = useState("");
  const [outfitImagePreview, setOutfitImagePreview] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData();
    formData.append("age", age);
    formData.append("weight", weight);
    formData.append("height", height);
    formData.append("gender", gender);

    if (userImage) {
      formData.append("personPhoto", userImage);
    }

    if (outfitImage) {
      formData.append("shirtPhoto", outfitImage);
    }

    try {
      const response = await fetch("http://localhost:3000/api/generatedPhoto", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        console.log("result: ini result  ", result);
        router.push(`/result?ProductId=${result.createdPhoto.insertedId}`);
      } else {
        console.error("Error generating photo");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("Authorization="))
      ?.split("=")[1];

    if (!token) {
      Swal.fire({
        icon: "warning",
        title: "You must log in first!",
        text: "Please log in to access the fitting room.",
        confirmButtonText: "OK",
        confirmButtonColor: "#3085d6",
      }).then(() => {
        router.push("/login");
      });
    }
  }, [router]);

  const handleUserImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUserImage(file);
      setUserImagePreview(URL.createObjectURL(file));
    }
  };

  const handleOutfitImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setOutfitImage(file);
      setOutfitImagePreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="flex flex-col mt-6 mb-6 items-center justify-center min-h-screen mx-4 md:mx-6 bg-gradient-to-br from-yellow-300 to-pink-500 p-8 border-4 border-black rounded-2xl shadow-lg">
      <h1 className="text-5xl font-bold text-black mb-6 drop-shadow-lg">
        Virtual Fitting Room
      </h1>
      <form className="w-full max-w-3xl" onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 w-full">
          <div className="flex-1 p-6 bg-white border-4 border-black rounded-lg shadow-xl">
            <h2 className="text-2xl font-semibold text-black mb-4">
              Upload Your Photo
            </h2>
            <input
              type="file"
              accept="image/*"
              className="border-4 border-gray-400 rounded-lg p-2 mb-4 w-full hover:border-yellow-500 transition duration-300"
              onChange={handleUserImageChange}
            />
            <div className="w-full h-48 object-cover rounded-lg mb-4">
              {userImagePreview && (
                <img
                  src={userImagePreview}
                  alt="Uploaded Image"
                  className="w-full h-full object-cover rounded-lg"
                />
              )}
            </div>
          </div>
          <div className="flex-1 p-6 bg-white border-4 border-black rounded-lg shadow-xl">
            <h2 className="text-2xl font-semibold text-black mb-4">
              Upload Outfit Photo
            </h2>
            <input
              type="file"
              accept="image/*"
              className="border-4 border-black rounded-lg p-2 mb-4 w-full hover:border-yellow-500 transition duration-300"
              onChange={handleOutfitImageChange}
            />
            <div className="w-full h-48 object-cover rounded-lg mb-4">
              {outfitImagePreview && (
                <img
                  src={outfitImagePreview}
                  alt="Uploaded Image"
                  className="w-full h-full object-cover rounded-lg"
                />
              )}
            </div>
          </div>
        </div>
        <div className="flex-1 p-6 bg-white border-4 border-black rounded-lg shadow-xl mt-4">
          <h2 className="text-2xl font-semibold text-black mb-4">
            Personal Information
          </h2>
          <input
            type="number"
            placeholder="Age"
            className="border-4 border-black text-black rounded-lg p-2 mb-4 w-full"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
          <input
            type="number"
            placeholder="Weight (kg)"
            className="border-4 border-black text-black rounded-lg p-2 mb-4 w-full"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
          <input
            type="number"
            placeholder="Height (cm)"
            className="border-4 border-black text-black rounded-lg p-2 mb-4 w-full"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
          />
          <select
            className="border-4 border-black text-black rounded-lg p-2 mb-4 w-full"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <button
          type="submit"
          className="mt-6 mb-6 bg-blue-600 text-white shadow-lg hover:bg-blue-700 transition duration-300 px-6 py-3 rounded-lg font-bold relative"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <span className="opacity-0">Generate Fitting</span>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="loader"></div>
              </div>
            </>
          ) : (
            "Generate Fitting"
          )}
        </button>
      </form>
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-xl text-center">
            <div className="loader mb-4 mx-auto"></div>
            <p className="text-xl text-gray-800 font-semibold">
              Generating your fitting...
            </p>
            <p className="text-gray-600">This may take a moment</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Fitting;
