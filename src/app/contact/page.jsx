import React from "react";

const Contact = () => {
  return (
    <section className="bg-gradient-to-r from-red-200 to-red-400 p-8 md:p-12 lg:p-16 mx-6 mt-6 mb-6 rounded-2xl border-4 border-black shadow-2xl flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-extrabold text-black mb-8 border-b-4 border-black pb-4 bg-green-400 inline-block transform rotate-1 shadow-lg">
        Contact Us
      </h1>
      <p className="text-gray-700 text-center">
        If you have any questions or concerns about our Privacy Policy or our
        practices regarding your personal information, please contact us at:
      </p>
      <p className="text-gray-700 text-center mt-4">
        <strong>FitMate</strong>
        <br />
        Email: stylewith@fitmate.com
        <br />
        Phone: 08123456789
        <br />
        Address: Iskandar Muda Street
        <br />
      </p>
    </section>
  );
};

export default Contact;
