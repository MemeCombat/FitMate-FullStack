"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import Link from "next/link";
import NeoButton from "../components/NeoButton";

const Fitting = () => {
  const [userImage, setUserImage] = useState(null);
  const [outfitImage, setOutfitImage] = useState(null);
  const [userInputMethod, setUserInputMethod] = useState("upload");
  const [outfitInputMethod, setOutfitInputMethod] = useState("upload");
  const [userImageUrl, setUserImageUrl] = useState("");
  const [outfitImageUrl, setOutfitImageUrl] = useState("");

  const router = useRouter();

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
      setUserImage(URL.createObjectURL(file));
      setUserImageUrl("");
    }
  };

  const handleOutfitImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setOutfitImage(URL.createObjectURL(file));
      setOutfitImageUrl("");
    }
  };

  const handleUserImageUrlChange = (e) => {
    setUserImageUrl(e.target.value);
    setUserImage(null);
  };

  const handleOutfitImageUrlChange = (e) => {
    setOutfitImageUrl(e.target.value);
    setOutfitImage(null);
  };

  const finalUserImage = userImageUrl || userImage;
  const finalOutfitImage = outfitImageUrl || outfitImage;

  return (
    <div className="flex flex-col mt-6 mb-6 items-center justify-center min-h-screen mx-4 md:mx-6 bg-gradient-to-br from-yellow-300 to-pink-500 p-8 border-4 border-black rounded-2xl shadow-lg">
      <h1 className="text-5xl font-bold text-black mb-6 drop-shadow-lg">
        Virtual Fitting Room
      </h1>
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 w-full max-w-3xl">
        <div className="flex-1 p-6 bg-white border-4 border-black rounded-lg shadow-xl transform hover:scale-105 transition-transform duration-300">
          <h2 className="text-2xl font-semibold text-black mb-4">
            Upload Your Photo
          </h2>
          <div className="flex space-x-4 mb-4 text">
            <button
              className={`px-4 py-2 rounded-lg shadow-md ${
                userInputMethod === "upload"
                  ? "bg-blue-500 text-white"
                  : "bg-green-400 hover:bg-pink-400"
              }`}
              onClick={() => setUserInputMethod("upload")}
            >
              Upload Image
            </button>
            <button
              className={`px-4 py-2 rounded-lg shadow-md ${
                userInputMethod === "url"
                  ? "bg-blue-500 text-white"
                  : "bg-green-400 hover:bg-pink-400"
              }`}
              onClick={() => setUserInputMethod("url")}
            >
              Enter URL
            </button>
          </div>
          {userInputMethod === "upload" ? (
            <input
              type="file"
              accept="image/*"
              onChange={handleUserImageChange}
              className="border-4 border-gray-400 rounded-lg p-2 mb-4 w-full hover:border-yellow-500 transition duration-300"
            />
          ) : (
            <input
              type="text"
              value={userImageUrl}
              onChange={handleUserImageUrlChange}
              placeholder="Paste image URL here"
              className="border-4 border-black text-black rounded-lg p-2 mb-4 w-full hover:border-yellow-500 transition duration-300"
            />
          )}
        </div>
        <div className="flex-1 p-6 bg-white border-4 border-black rounded-lg shadow-xl transform hover:scale-105 transition-transform duration-300">
          <h2 className="text-2xl font-semibold text-black mb-4">
            Upload Outfit Photo
          </h2>
          <div className="flex space-x-4 mb-4">
            <button
              className={`px-4 py-2 rounded-lg shadow-md ${
                outfitInputMethod === "upload"
                  ? "bg-blue-500 text-white"
                  : "bg-green-400 hover:bg-pink-400"
              }`}
              onClick={() => setOutfitInputMethod("upload")}
            >
              Upload Image
            </button>
            <button
              className={`px-4 py-2 rounded-lg shadow-md ${
                outfitInputMethod === "url"
                  ? "bg-blue-500 text-white"
                  : "bg-green-400 hover:bg-pink-400"
              }`}
              onClick={() => setOutfitInputMethod("url")}
            >
              Enter URL
            </button>
          </div>
          {outfitInputMethod === "upload" ? (
            <input
              type="file"
              accept="image/*"
              onChange={handleOutfitImageChange}
              className="border-4 border-black rounded-lg p-2 mb-4 w-full hover:border-yellow-500 transition duration-300"
            />
          ) : (
            <input
              type="text"
              value={outfitImageUrl}
              onChange={handleOutfitImageUrlChange}
              placeholder="Paste image URL here"
              className="border-4 border-black text-black rounded-lg p-2 mb-4 w-full hover:border-yellow-500 transition duration-300"
            />
          )}
        </div>
      </div>
      {finalUserImage && finalOutfitImage && (
        <Link
          href={{
            pathname: "/generate",
            query: { userImage: finalUserImage, outfitImage: finalOutfitImage },
          }}
          passHref
        >
          <NeoButton className="mt-6 mb-6 bg-blue-600 text-white shadow-lg hover:bg-blue-700 transition duration-300">
            Generate Fitting
          </NeoButton>
        </Link>
      )}
    </div>
  );
};

export default Fitting;
