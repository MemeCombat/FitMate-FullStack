"use client";
import React, { useState } from "react";
import Link from "next/link";
import NeoButton from "../components/NeoButton";
import { useRouter } from "next/navigation";

const Fitting = () => {
  const router = useRouter();
  const [userImage, setUserImage] = useState(null);
  const [outfitImage, setOutfitImage] = useState(null);
  const [userInputMethod, setUserInputMethod] = useState("upload");
  const [outfitInputMethod, setOutfitInputMethod] = useState("upload");
  const [userImageUrl, setUserImageUrl] = useState("");
  const [outfitImageUrl, setOutfitImageUrl] = useState("");
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [gender, setGender] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleUserImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUserImage(file);
      setUserImageUrl("");
    }
  };

  const handleOutfitImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setOutfitImage(file);
      setOutfitImageUrl("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    const formData = new FormData();
    formData.append('age', age);
    formData.append('weight', weight);
    formData.append('height', height);
    formData.append('gender', gender);
    
    if (userInputMethod === 'upload' && userImage) {
      formData.append('userImage', userImage);
    } else {
      formData.append('userImageUrl', userImageUrl);
    }
    
    if (outfitInputMethod === 'upload' && outfitImage) {
      formData.append('outfitImage', outfitImage);
    } else {
      formData.append('outfitImageUrl', outfitImageUrl);
    }

    try {
      const response = await fetch('http://localhost:3000/api/generatedPhoto', {
        method: 'POST',
        body: formData,
      });
      
      if (response.ok) {
        const result = await response.json();
        router.push(`/result?generatedPhotoUrl=${encodeURIComponent(result.generatedPhotoUrl)}`);
      } else {
        console.error('Error generating photo');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsLoading(false);
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
          <div className="flex space-x-4 mb-4">
            <button className="px-4 py-2 rounded-lg shadow-md bg-blue-500 text-white" onClick={() => setUserInputMethod('upload')}>
              Upload Image
            </button>
            <button className="px-4 py-2 rounded-lg shadow-md bg-green-400 hover:bg-pink-400" onClick={() => setUserInputMethod('url')}>
              Enter URL
            </button>
          </div>
          {userInputMethod === 'upload' && <input type="file" accept="image/*" className="border-4 border-gray-400 rounded-lg p-2 mb-4 w-full hover:border-yellow-500 transition duration-300" onChange={handleUserImageChange}/>}
        </div>
        <div className="flex-1 p-6 bg-white border-4 border-black rounded-lg shadow-xl">
          <h2 className="text-2xl font-semibold text-black mb-4">
            Upload Outfit Photo
          </h2>
          <div className="flex space-x-4 mb-4">
            <button className="px-4 py-2 rounded-lg shadow-md bg-blue-500 text-white" onClick={() => setOutfitInputMethod('upload')}>
              Upload Image
            </button>
            <button className="px-4 py-2 rounded-lg shadow-md bg-green-400 hover:bg-pink-400" onClick={() => setOutfitInputMethod('url')}>
              Enter URL
            </button>
          </div>
          {outfitInputMethod === 'upload' && <input type="file" accept="image/*" className="border-4 border-black rounded-lg p-2 mb-4 w-full hover:border-yellow-500 transition duration-300" onChange={handleOutfitImageChange}/>}
        </div>
      </div>
      <div className="flex-1 p-6 bg-white border-4 border-black rounded-lg shadow-xl mt-4">
        <h2 className="text-2xl font-semibold text-black mb-4">Personal Information</h2>
        <input type="number" placeholder="Age" className="border-4 border-black text-black rounded-lg p-2 mb-4 w-full" value={age} onChange={(e) => setAge(e.target.value)}/>
        <input type="number" placeholder="Weight (kg)" className="border-4 border-black text-black rounded-lg p-2 mb-4 w-full" value={weight} onChange={(e) => setWeight(e.target.value)}/>
        <input type="number" placeholder="Height (cm)" className="border-4 border-black text-black rounded-lg p-2 mb-4 w-full" value={height} onChange={(e) => setHeight(e.target.value)}/>
        <select className="border-4 border-black text-black rounded-lg p-2 mb-4 w-full" value={gender} onChange={(e) => setGender(e.target.value)}>
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </div>
      <button type="submit" className="mt-6 mb-6 bg-blue-600 text-white shadow-lg hover:bg-blue-700 transition duration-300 px-6 py-3 rounded-lg font-bold">
        Generate Fitting
      </button>
    </form>
  </div>
  );
};

export default Fitting;
