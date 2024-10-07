import React from "react";

const Services = () => {
  return (
    <section className="bg-gradient-to-r from-purple-200 to-purple-400 p-8 md:p-12 lg:p-16 mx-6 mt-6 mb-6 rounded-2xl border-4 border-black shadow-2xl flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-extrabold text-black mb-8 border-b-4 border-black pb-4 bg-white inline-block transform rotate-1 shadow-lg">
        Our Services
      </h1>

      <div className="space-y-6 text-lg leading-relaxed text-gray-800 max-w-3xl text-center">
        <p className="text-2xl font-semibold">What We Offer</p>

        <p>
          At <strong>FitMate</strong>, we pride ourselves on providing
          cutting-edge services that make online shopping for clothes more
          seamless and enjoyable. Our suite of features is designed to help
          users make better purchase decisions with confidence.
        </p>

        <h2 className="text-2xl font-semibold">Core Services</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>
            <strong>Virtual Fitting Room:</strong> Experience our advanced
            virtual fitting tool, where you can upload your body photo and the
            clothing image to see how it fits in real time.
          </li>
          <li>
            <strong>Fit Recommendations:</strong> Get personalized
            recommendations based on your body shape, ensuring the clothes you
            choose will fit perfectly.
          </li>
          <li>
            <strong>Cross-Platform Integration:</strong> Enjoy the convenience
            of browsing, fitting, and shopping from multiple e-commerce
            platforms, all within the FitMate ecosystem.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold">Additional Features</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>
            <strong>Size Guide:</strong> We provide detailed size guides for
            every piece of clothing, making sure you have all the information
            you need to make an informed decision.
          </li>
          <li>
            <strong>Return Management:</strong> In case of any fit issues, our
            return management service makes the process easy and hassle-free.
          </li>
          <li>
            <strong>Style Suggestions:</strong> Browse through tailored style
            suggestions based on your preferences and body type.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold">Why Choose Our Services?</h2>
        <p>
          With <strong>FitMate</strong>, we guarantee a hassle-free, intuitive
          online shopping experience, providing you with the tools and services
          to find the perfect fit, minimize returns, and feel more confident
          with every purchase.
        </p>
      </div>
    </section>
  );
};

export default Services;
