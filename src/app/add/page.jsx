import React from "react";

const AddProduct = () => {
  <Modal active={isModalActive} setActive={setIsModalActive}>
    <p>This is modal</p>
  </Modal>;
  return (
    <div className="bg-gradient-to-br from-cyan-400 via-teal-400 to-emerald-400 p-8 flex items-center justify-center rounded-xl m-7">
      <div className="max-w-md w-full bg-amber-200 border-4 border-black shadow-[12px_12px_0_0_#000] p-6 relative">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px] -z-10 opacity-10"></div>
        <h2 className="text-4xl font-extrabold mb-6 text-center text-black">
          Add Product
        </h2>
        <form className="space-y-4">
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
              className="w-full p-2 border-2 text-black border-black focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-rose-200"
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
              className="w-full p-2 border-2 text-black border-black focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-violet-200"
              rows="3"
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
              className="w-full p-2 border-2 border-black text-black focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-indigo-200"
              placeholder="Enter shop link"
            />
          </div>
          <div>
            <label
              htmlFor="uploadFile1"
              className="bg-lime-300 text-gray-800 font-bold text-lg rounded flex flex-col items-center justify-center cursor-pointer border-4 border-black p-4 transition-transform hover:translate-x-1 hover:translate-y-1"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-12 mb-2 fill-current"
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
          <button
            type="submit"
            className="w-full bg-fuchsia-400 text-black font-bold py-3 px-4 border-4 border-black shadow-[4px_4px_0_0_#000] transition-transform hover:translate-x-1 hover:translate-y-1 hover:bg-fuchsia-500"
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
