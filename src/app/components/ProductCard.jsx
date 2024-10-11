"use client";
import { useState, useEffect } from "react";
import Select from "react-select";
import Dropdown from "./Dropdown";
import Modal from "./Modal";
import { toast } from "react-toastify";

const ProductCard = ({ product, index ,fetchProducts}) => {
  const [isModalActive, setIsModalActive] = useState(false);
  const [selectedTags, setSelectedTags] = useState(
    product.tags.map((tag) => ({ value: tag, label: tag }))
  );
  const [imagePreview, setImagePreview] = useState(product.image);
  const cardColors = [
    "bg-yellow-300",
    "bg-blue-300",
    "bg-green-300",
    "bg-red-300",
    "bg-purple-300",
  ];

  const items = [
    {
      name: "Delete",
      link: "",
    },
    {
      name: "Update",
      link: "/update",
    },
  ];

  const tagOptions = [
    { value: "casual", label: "Casual" },
    { value: "formal", label: "Formal" },
    { value: "streetwear", label: "Streetwear" },
    { value: "vintage", label: "Vintage" },
    { value: "bohemian", label: "Bohemian" },
    { value: "minimalist", label: "Minimalist" },
    { value: "athleisure", label: "Athleisure" },
    { value: "preppy", label: "Preppy" },
  ];

  const handleTagChange = (selectedOptions) => {
    setSelectedTags(selectedOptions);
  };

  const [formData, setFormData] = useState({
    title: product.title,
    description: product.description,
    linkReferensi: product.linkReferensi,
    size: product.size.join(", "),
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append("productPhotoId", product._id);
    form.append("title", formData.title);
    if (formData.image) {
      form.append("image", formData.image);
    }
    form.append("size", formData.size);
    form.append("description", formData.description);
    form.append("linkReferensi", formData.linkReferensi);
    form.append("tags", selectedTags.map((tag) => tag.value).join(","));

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/productPhoto`, {
        method: "PUT",
        body: form,
      });

      if (response.ok) {
        console.log("Product updated successfully");
        setIsModalActive(false);
        await fetchProducts()
        toast.success("Product updated successfully!");
      } else {
        throw await response.json()
    }
    } catch (error) {
      console.log("Error updating product:", error.message);
      toast.error(error.message);
    }
  };

  
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        image: file,
      }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    setFormData({
      title: product.title,
      description: product.description,
      linkReferensi: product.linkReferensi,
      size: product.size.join(", "),
    });
    setSelectedTags(product.tags.map((tag) => ({ value: tag, label: tag })));
    setImagePreview(product.image);
  }, [product]);

  return (
    <div
      key={index}
      className={`${
        cardColors[index % cardColors.length]
      } transform transition-all duration-300 hover:scale-105 border-8 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] rounded-none overflow-hidden bg-blue-300 hover:shadow-[20px_20px_0px_0px_rgba(0,0,0,1)]`}
    >
      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-0 right-0 m-2">
          <Dropdown
            items={items}
            isModalActive={isModalActive}
            setIsModalActive={setIsModalActive}
          ></Dropdown>
        </div>
      </div>
      <div className="p-2">
        <h3 className="font-black text-black text-sm text-center mb-1 line-clamp-2">
          {product.title}
        </h3>
      </div>
      <Modal active={isModalActive} setActive={setIsModalActive}>
        <div className="flex justify-center items-center min-h-screen bg-black/50 fixed top-0 left-0 right-0 z-50">
          <div className="relative w-full max-w-lg sm:max-w-xl md:max-w-3xl bg-yellow-300 border-4 border-black shadow-[12px_12px_0_0_#000] rounded-xl overflow-hidden mx-4">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px] -z-10 opacity-25"></div>

            <div className="p-4 bg-gradient-to-br from-pink-400 to-purple-400 text-black font-bold text-lg flex justify-between items-center">
              <h2 className="text-2xl">Update Product</h2>
              <button
                onClick={() => setIsModalActive(false)}
                className="text-black font-extrabold"
              >
                X
              </button>
            </div>
            <form
              onSubmit={handleSubmit}
              className="overflow-y-auto max-h-[70vh] p-6 space-y-6"
            >
              <div>
                <label
                  htmlFor="title"
                  className="block text-lg font-bold mb-2 text-black"
                >
                  Product Name
                </label>
                <input
                  value={formData.title}
                  onChange={handleInputChange}
                  name="title"
                  type="text"
                  id="title"
                  className="w-full p-3 border-2 text-black border-black rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-green-100 transition-shadow duration-300"
                  placeholder="Enter product name"
                />
              </div>
              <div>
                <label
                  htmlFor="description"
                  className="block text-lg font-bold mb-2 text-black"
                >
                  Product Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={handleInputChange}
                  name="description"
                  id="description"
                  className="w-full p-3 border-2 text-black border-black rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-orange-100 transition-shadow duration-300"
                  rows="4"
                  placeholder="Enter product description"
                ></textarea>
              </div>
              <div>
                <label
                  htmlFor="linkReferensi"
                  className="block text-lg font-bold mb-2 text-black"
                >
                  Link Reference
                </label>
                <input
                  value={formData.linkReferensi}
                  onChange={handleInputChange}
                  type="url"
                  name="linkReferensi"
                  id="linkReferensi"
                  className="w-full p-3 border-2 border-black text-black rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-blue-100 transition-shadow duration-300"
                  placeholder="Enter shop link"
                />
              </div>
              <div>
                <label
                  htmlFor="size"
                  className="block text-lg font-bold mb-2 text-black"
                >
                  Sizes
                </label>
                <input
                  value={formData.size}
                  onChange={handleInputChange}
                  type="text"
                  name="size"
                  id="size"
                  className="w-full p-3 border-2 border-black text-black rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-purple-100 transition-shadow duration-300"
                  placeholder="Enter sizes (comma-separated)"
                />
              </div>
              <div>
                <label
                  htmlFor="tags"
                  className="block text-lg font-bold mb-2 text-black"
                >
                  Product Tags
                </label>
                <Select
                  id="tags"
                  options={tagOptions}
                  isMulti
                  value={selectedTags}
                  onChange={handleTagChange}
                  className="react-select-container"
                  classNamePrefix="react-select"
                  styles={{
                    control: (provided) => ({
                      ...provided,
                      borderColor: "black",
                      borderWidth: "2px",
                      borderRadius: "4px",
                      backgroundColor: "#e0f2fe",
                      "&:hover": {
                        borderColor: "black",
                      },
                    }),
                    option: (provided, state) => ({
                      ...provided,
                      backgroundColor: state.isSelected
                        ? "#60a5fa"
                        : state.isFocused
                        ? "#93c5fd"
                        : "white",
                      color: state.isSelected ? "white" : "black",
                    }),
                    multiValue: (provided) => ({
                      ...provided,
                      backgroundColor: "#93c5fd",
                    }),
                    multiValueLabel: (provided) => ({
                      ...provided,
                      color: "black",
                    }),
                    multiValueRemove: (provided) => ({
                      ...provided,
                      color: "black",
                      ":hover": {
                        backgroundColor: "#60a5fa",
                        color: "white",
                      },
                    }),
                  }}
                />
              </div>
              <div>
              
                {imagePreview && (
                  <div className="mb-4">
                  <h1 className="text-black">Preview Image </h1>
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="max-w-full h-auto max-h-60 object-contain border-4 border-black"
                    />
                  </div>
                )}
                <label
                  htmlFor="image"
                  className="bg-purple-300 text-gray-800 font-bold text-lg rounded flex flex-col items-center justify-center cursor-pointer border-4 border-black p-4 transition-transform hover:translate-x-1 hover:translate-y-1 hover:bg-purple-400"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-10 mb-2 fill-current"
                    viewBox="0 0 32 32"
                  >
                    <path d="M23.75 11.044a7.99 7.99 0 0 0-15.5-.009A8 8 0 0 0 9 27h3a1 1 0 0 0 0-2H9a6 6 0 0 1-.035-12 1.038 1.038 0 0 0 1.1-.854 5.991 5.991 0 0 1 11.862 0A1.08 1.08 0 0 0 23 13a6 6 0 0 1 0 12h-3a1 1 0 0 0 0 2h3a8 8 0 0 0 .75-15.956z" />
                    <path d="M20.293 19.707a1 1 0 0 0 1.414-1.414l-5-5a1 1 0 0 0-1.414 0l-5 5a1 1 0 0 0 1.414 1.414L15 16.414V29a1 1 0 0 0 2 0V16.414z" />
                  </svg>
                  Upload file
                  <input
                    type="file"
                    id="image"
                    name="image"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                  <p className="text-sm font-medium text-gray-800 mt-2">
                    PNG, JPG, SVG, WEBP, and GIF are allowed.
                  </p>
                </label>
              </div>
              <div className="p-4 bg-gradient-to-br from-pink-400 to-purple-400 text-black font-bold">
                <button
                  type="submit"
                  className="w-full bg-red-400 text-black font-bold py-3 px-4 border-4 border-black rounded shadow-[4px_4px_0_0_#000] transition-transform hover:translate-x-1 hover:translate-y-1 hover:bg-red-500"
                >
                  Update Product
                </button>
              </div>
            </form>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ProductCard;
