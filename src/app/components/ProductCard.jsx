"use client";
import React from "react";
import Button from "../components/Button";



const PricingCard = ({ type, price, description, isPopular, token, color }) => {
  const backgroundColor = getBackgroundColor(type, color);
  return (
    <div
      key={index}
      className={`${
        cardColors[index % cardColors.length]
      } transform transition-all duration-300 hover:scale-105 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-none overflow-hidden bg-blue-300`}
    >
      <div className="relative h-[500px] overflow-hidden">
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
      <div className="p-4">
        <h3 className="font-black text-black text-sm text-center mb-2 line-clamp-2">
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
            <div className="overflow-y-auto max-h-[70vh] p-6 space-y-6">
              <div>
                <label
                  htmlFor="title"
                  className="block text-lg font-bold mb-2 text-black"
                >
                  Product Name
                </label>
                <input
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
                  type="url"
                  name="linkReferensi"
                  id="linkReferensi"
                  className="w-full p-3 border-2 border-black text-black rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-blue-100 transition-shadow duration-300"
                  placeholder="Enter shop link"
                />
              </div>
              <div>
                <label
                  type="text"
                  name="tags"
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
                <label
                  htmlFor="image"
                  className="block text-lg font-bold mb-2 text-black"
                >
                  Upload Image
                </label>
                <label
                  htmlFor="image"
                  name="image"
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
                  <input type="file" id="image" className="hidden" />
                  <p className="text-sm font-medium text-gray-800 mt-2">
                    PNG, JPG, SVG, WEBP, and GIF are allowed.
                  </p>
                </label>
              </div>
            </div>
            <div className="p-4 bg-gradient-to-br from-pink-400 to-purple-400 text-black font-bold">
              <button
                type="submit"
                className="w-full bg-red-400 text-black font-bold py-3 px-4 border-4 border-black rounded shadow-[4px_4px_0_0_#000] transition-transform hover:translate-x-1 hover:translate-y-1 hover:bg-red-500"
              >
                Update Product
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

const getBackgroundColor = (type, color) => {
  switch (type.toUpperCase()) {
    case "GOLD":
      return "bg-yellow-400";
    case "SILVER":
      return "bg-gray-400";
    case "BRONZE":
      return "bg-yellow-700";
    default:
      return color;
  }
};

const PopularBadge = () => (
  <div className="bg-black text-white font-bold py-1 px-4 absolute top-0 right-0">
    Popular
  </div>
);

const PricingCardHeader = ({ type }) => (
  <h2 className="text-4xl font-black text-black mb-2">{type}</h2>
);

const PricingCardBody = ({ price, token, description }) => (
  <div>
    <p className="text-5xl font-black text-black mb-4">{price}</p>
    <p className="text-xl text-black mb-6 font-bold">
      get {token} token for fitting
    </p>
    <p className="text-xl text-black mb-6 font-bold">{description}</p>
    <ul className="space-y-3 text-black mb-8"></ul>
  </div>
);

const PricingCardFooter = () => (
  <div className="mt-auto">
    <Button className="w-full justify-center">Click here to buy</Button>
  </div>
);

export default PricingCard;