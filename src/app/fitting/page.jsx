"use client";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import Card from "../components/Card";
import LayoutWithNavbar from "../with-navbar";

const Fitting = () => {
  const router = useRouter();
  const [userImage, setUserImage] = useState(null);
  const [outfitImage, setOutfitImage] = useState(null);
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [gender, setGender] = useState("");
  const [photoType, setPhotoType] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [userImagePreview, setUserImagePreview] = useState("");
  const [outfitImagePreview, setOutfitImagePreview] = useState("");
  const [isPhotoLoading, setIsPhotoLoading] = useState(true);
  const [productPhotos, setProductPhotos] = useState([]);
  const [photoError, setPhotoError] = useState(null);
  const [error, setError] = useState(null);
  const [tags, setTags] = useState("");
  const [storeId, setStoreId] = useState("");
  const [productId, setProductId] = useState("");

  console.log("tags2: ", tags);

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

  const fetchProductPhotos = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `http://localhost:3000/api/productPhoto?tags=${tags}`
      );
      if (response.ok) {
        console.log("tags1: ", tags);
        const data = await response.json();
        console.log("data: ", data);
        const shuffledPhotos = data.photos.sort(() => 0.5 - Math.random());
        setProductPhotos(shuffledPhotos);
      } else {
        setError("Error fetching product photos");
      }
    } catch (error) {
      setError("Error: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };
  const fetchProfileData = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/profile", {
        credentials: "include", // This includes cookies in the request
      });
      if (response.ok) {
        const data = await response.json();
        setTags(data.tags.join(","));
      } else {
        console.error("Failed to fetch profile data");
      }
    } catch (error) {
      console.error("Error fetching profile data:", error);
    }
  };

  useEffect(() => {
    fetchProfileData();

    fetchProductPhotos();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData();
    formData.append("age", age);
    formData.append("weight", weight);
    formData.append("height", height);
    formData.append("gender", gender);
    formData.append("photoType", photoType);
    formData.append("productId", productId);
    formData.append("shopId", storeId);

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

  const handleCardClick = (photo, productId, shopId) => {
    fetch(photo.image)
      .then((res) => res.blob())
      .then((blob) => {
        const file = new File([blob], "outfit.jpg", { type: "image/jpeg" });
        setOutfitImage(file);
        setOutfitImagePreview(photo.image);
        setStoreId(shopId || "");
        setProductId(productId || "");
        Swal.fire({
          title: "Outfit Selected!",
          text: `${photo.title} has been set as your outfit.`,
          icon: "success",
          confirmButtonText: "OK",
        });
      });
  };

  return (
    <LayoutWithNavbar>
      <div className="flex flex-col lg:flex-row">
        <div className="flex-1 mt-6 mb-6 mx-4 md:mx-6 bg-gradient-to-br from-yellow-300 to-pink-500 p-8 border-4 border-black rounded-2xl shadow-lg">
          <h1 className="text-5xl font-bold text-black mb-6 drop-shadow-lg text-center">
            Virtual Fitting Room
          </h1>
          <form className="w-full max-w-3xl mx-auto" onSubmit={handleSubmit}>
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 w-full">
              <div className="flex-1 p-6 bg-white border-4 border-black rounded-lg shadow-xl">
                <h2 className="text-2xl font-semibold text-black mb-4">
                  Upload Your Photo
                </h2>
                <input
                  type="file"
                  accept="image/*"
                  className="border-4 border-black rounded-lg p-2 mb-4 w-full hover:border-yellow-500 transition duration-300"
                  onChange={handleUserImageChange}
                />
                <div className="w-full h-[500px] rounded-lg overflow-hidden">
                  {userImagePreview ? (
                    <img
                      src={userImagePreview}
                      alt="Uploaded Image"
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-200">
                      <p className="text-gray-500">No image uploaded</p>
                    </div>
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
                <div className="w-full h-[500px] rounded-lg overflow-hidden">
                  {outfitImagePreview ? (
                    <img
                      src={outfitImagePreview}
                      alt="Uploaded Image"
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-200">
                      <p className="text-gray-500">No image uploaded</p>
                    </div>
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
                <option value="" disabled>
                  Select Gender
                </option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              <select
                className="border-4 border-black text-black rounded-lg p-2 mb-4 w-full"
                value={photoType}
                onChange={(e) => setPhotoType(e.target.value)}
              >
                <option value="" disabled>
                  Select photo Type
                </option>
                <option value="upper">upper</option>
                <option value="lower">lower</option>
                <option value="overall">overall</option>
                <option value="inner">inner</option>
                <option value="outer">outer</option>
              </select>
            </div>
            <button
              type="submit"
              className="mt-6 mb-6 bg-blue-600 text-white shadow-lg hover:bg-blue-700 transition duration-300 px-6 py-3 rounded-lg font-bold relative w-full"
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
                <p className="text-xl text-gray-800 font-semibold"></p>
                <p className="text-gray-600">This may take a moment</p>
              </div>
            </div>
          )}
        </div>
        <div className="flex-1 mt-6 mb-6 mx-4 md:mx-6 bg-gradient-to-br from-yellow-300 to-pink-500 p-8 border-4 border-black rounded-2xl shadow-lg">
          <h1 className="text-3xl lg:text-4xl font-bold text-black mb-8 uppercase tracking-wider text-center">
            Fashion Recommendation
          </h1>
          {isLoading ? (
            <p className="text-2xl font-bold text-center">Loading...</p>
          ) : error ? (
            <p className="text-2xl font-bold text-red-600 text-center">
              {error}
            </p>
          ) : (
            <div className="flex flex-wrap justify-center gap-8">
              {productPhotos.map((photo) => (
                <div
                  key={photo._id}
                  className="relative w-64 h-[300px] bg-white border-4 border-black rounded-lg shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 cursor-pointer"
                  onClick={() =>
                    handleCardClick(photo, photo._id, photo.storeId)
                  }
                >
                  <img
                    src={photo.image}
                    alt={photo.title}
                    className="w-full h-48 object-cover rounded-t-lg border-b-4 border-black"
                  />
                  <div className="p-4 h-64 overflow-y-auto">
                    <h3 className="text-lg font-bold text-black mb-2 uppercase line-clamp-2">
                      {photo.title}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </LayoutWithNavbar>
  );
};

export default Fitting;
