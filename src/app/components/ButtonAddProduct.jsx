"use client";
import { useState } from "react";
import Select from "react-select";
import Modal from "./Modal";

function ButtonAddProduct() {
  const [isModalActive, setIsModalActive] = useState(false);
  const [selectedTags, setSelectedTags] = useState([]);

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

  return (
    <div>
      <button
        onClick={() => setIsModalActive(true)}
        className="transition-all duration-300 px-6 lg:py-2 py-1 text-lg font-bold bg-blue-500 text-black border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none"
      >
        Add new product
      </button>

      {isModalActive && (
        <Modal active={isModalActive} setActive={setIsModalActive}>
          <div className="flex justify-center items-center min-h-screen bg-black/50 fixed top-0 left-0 right-0 z-50">
            <div className="relative w-full max-w-lg sm:max-w-xl md:max-w-3xl bg-amber-200 border-4 border-black shadow-[12px_12px_0_0_#000] rounded-xl overflow-hidden mx-4">
              <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px] -z-10 opacity-25"></div>

              <div className="p-4 bg-gradient-to-br from-cyan-400 via-teal-400 to-emerald-400 text-black font-bold text-lg flex justify-between items-center">
                <h2 className="text-2xl">Add Product</h2>
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
                    htmlFor="productName"
                    className="block text-lg font-bold mb-2 text-black"
                  >
                    Product Name
                  </label>
                  <input
                    type="text"
                    id="productName"
                    className="w-full p-3 border-2 text-black border-black rounded focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-rose-200 transition-shadow duration-300"
                    placeholder="Enter product name"
                  />
                </div>
                <div>
                  <label
                    htmlFor="productDescription"
                    className="block text-lg font-bold mb-2 text-black"
                  >
                    Product Description
                  </label>
                  <textarea
                    id="productDescription"
                    className="w-full p-3 border-2 text-black border-black rounded focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-violet-200 transition-shadow duration-300"
                    rows="4"
                    placeholder="Enter product description"
                  ></textarea>
                </div>
                <div>
                  <label
                    htmlFor="shopLink"
                    className="block text-lg text-black font-bold mb-2"
                  >
                    Shop Link
                  </label>
                  <input
                    type="url"
                    id="shopLink"
                    className="w-full p-3 border-2 border-black text-black rounded focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-indigo-200 transition-shadow duration-300"
                    placeholder="Enter shop link"
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
                    name="tags"
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
                        backgroundColor: "#fecaca",
                        "&:hover": {
                          borderColor: "black",
                        },
                      }),
                      option: (provided, state) => ({
                        ...provided,
                        backgroundColor: state.isSelected
                          ? "#34d399"
                          : state.isFocused
                          ? "#6ee7b7"
                          : "white",
                        color: state.isSelected ? "black" : "black",
                      }),
                      multiValue: (provided) => ({
                        ...provided,
                        backgroundColor: "#6ee7b7",
                      }),
                      multiValueLabel: (provided) => ({
                        ...provided,
                        color: "black",
                      }),
                      multiValueRemove: (provided) => ({
                        ...provided,
                        color: "black",
                        ":hover": {
                          backgroundColor: "#34d399",
                          color: "white",
                        },
                      }),
                    }}
                  />
                </div>
                <div>
                  <label
                    htmlFor="uploadFile1"
                    className="bg-lime-300 text-gray-800 font-bold text-lg rounded flex flex-col items-center justify-center cursor-pointer border-4 border-black p-4 transition-transform hover:translate-x-1 hover:translate-y-1"
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
                    <input type="file" id="uploadFile1" className="hidden" />
                    <p className="text-sm font-medium text-gray-800 mt-2">
                      PNG, JPG, SVG, WEBP, and GIF are allowed.
                    </p>
                  </label>
                </div>
              </div>
              <div className="p-4 bg-gradient-to-br from-cyan-400 via-teal-400 to-emerald-400 text-black font-bold">
                <button
                  type="submit"
                  className="w-full bg-fuchsia-400 text-black font-bold py-3 px-4 border-4 border-black rounded shadow-[4px_4px_0_0_#000] transition-transform hover:translate-x-1 hover:translate-y-1 hover:bg-fuchsia-500"
                >
                  Add Product
                </button>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default ButtonAddProduct;
