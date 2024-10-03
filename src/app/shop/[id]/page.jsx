import React from "react";

const ShopDetail = () => {
  return (
    <div className="flex p-8">
      <div className="w-1/4">
        <div className="border-2 border-red-500 p-2 mb-4">
          <img
            src="https://placehold.co/200x200"
            alt="Greenlight Men's T-Shirt Short Sleeve Stone Script Regular Fit 040324"
          />
        </div>
        <div className="mb-4">
          <img
            src="https://placehold.co/200x200"
            alt="Close-up of the Greenlight logo on the t-shirt"
          />
        </div>
        <div>
          <img
            src="https://placehold.co/200x200"
            alt="Back view of the Greenlight t-shirt"
          />
        </div>
      </div>
      <div className="w-3/4 flex flex-col items-center">
        <div className="relative">
          <img
            src="https://placehold.co/400x400"
            alt="Greenlight Men's T-Shirt Short Sleeve Stone Script Regular Fit 040324"
          />
          <div className="absolute inset-y-0 left-0 flex items-center">
            <button className="bg-gray-200 rounded-full p-2">
              <i className="fas fa-chevron-left"></i>
            </button>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center">
            <button className="bg-gray-200 rounded-full p-2">
              <i className="fas fa-chevron-right"></i>
            </button>
          </div>
        </div>
      </div>
      <div className="w-1/4 pl-8">
        <h1 className="text-xl font-bold">
          Greenlight Men's T-Shirt Short Sleeve Stone Script Regular Fit 040324
        </h1>
        <h2 className="text-lg font-bold mt-4">DESKRIPSI</h2>
        <p className="mt-2">
          Greenlight Kaos Pria
          <br />
          Kaos Pria Lengan Pendek Heavyweight -- Cocok banget buat yang suka
          tampil simpel tapi tetap kece. Bahan katunnya bikin adem dan nyaman
          dipakai sehari-hari. Dengan desain yang timeless dan warna yang
          versatile, kaos ini gampang dipaduin dengan celana jeans atau celana
          favorit lainnya. Jadi, siap-siap buat tampil keren tanpa usaha
          berlebihan dengan Kaos Pria Greenlight ini!
        </p>
        <h3 className="text-lg font-bold mt-4">Detail</h3>
        <p className="mt-2">
          Produk Original Greenlight
          <br />
          Bahan: Katun (Heavyweight)
          <br />
          -- Go Outside Mountain Series --
          <br />
          Warna: Sea Foam (Hijau)
        </p>
        <h3 className="text-lg font-bold mt-4">Ukuran</h3>
        <p className="mt-2">
          S: Lebar Dada 52 cm, Panjang Badan 71 cm, Panjang Tangan 22 cm
          <br />
          M: Lebar Dada 54 cm, Panjang Badan 73 cm, Panjang Tangan 23 cm
          <br />
          L: Lebar Dada 56 cm, Panjang Badan 75 cm, Panjang Tangan 24 cm
          <br />
          XL: Lebar Dada 58 cm, Panjang Badan 77 cm, Panjang Tangan 25 cm
        </p>
      </div>
    </div>
  );
};

export default ShopDetail;
