"use client";
import React, { useState } from "react";
import Button from "../components/Button";

const PricingCard = ({ type, price, description, isPopular, token, color }) => {
  const backgroundColor = getBackgroundColor(type, color);
  const [transactionToken, setTransactionToken] = useState("");
  const [transactionUrl, setTransactionUrl] = useState("");

  const handleBuyClick = async () => {
    const packageName = type.toUpperCase();
    const requestBody = {
      transactionType: "topUp",
      PackageType: packageName,
    };

    try {
      const response = await fetch(
        "http://localhost:3000/api/ledger/generateToken",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(requestBody),
        }
      );

      const responseData = await response.json();
      if (!response.ok) throw responseData;
      console.log("responseData: ", responseData);
      setTransactionToken(responseData.transactionToken);
      setTransactionUrl(responseData.transactionUrl);

      window.location.href = responseData.transactionUrl;
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  return (
    <div
      className={`border-4 border-black p-6 ${backgroundColor} shadow-[8px_8px_0_rgba(0,0,0,1)] relative flex flex-col justify-between h-full w-full`}
    >
      {isPopular && <PopularBadge />}
      <PricingCardHeader type={type} />
      <PricingCardBody price={price} token={token} description={description} />
      <div className="mt-auto">
        <Button className="w-full justify-center" onClick={handleBuyClick}>
          Click here to buy
        </Button>
      </div>
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

const PricingCardBody = ({ price, token, description }) => {
  const formatRupiah = (price) => {
    return price.toLocaleString("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    });
  };

  return (
    <div>
      <p className="text-4xl font-black text-black mb-4">
        {formatRupiah(price)}
      </p>
      <p className="text-xl text-black mb-6 font-bold">
        get {token} token for fitting
      </p>
      <p className="text-xl text-black mb-6 font-bold">{description}</p>
      <ul className="space-y-3 text-black mb-8"></ul>
    </div>
  );
};

const PricingCardFooter = () => (
  <div className="mt-auto">
    <Button className="w-full justify-center">Click here to buy</Button>
  </div>
);

export default PricingCard;
