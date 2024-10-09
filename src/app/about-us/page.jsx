import React from "react";
import LayoutWithNavbar from "../with-navbar";

const AboutUs = () => {
  return (
    <LayoutWithNavbar>
      <section className="bg-gradient-to-r from-pink-200 to-pink-400 p-8 md:p-12 lg:p-16 mx-6 mt-6 mb-6 rounded-2xl border-4 border-black shadow-2xl flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-4xl font-extrabold text-black mb-8 border-b-4 border-black pb-4 bg-white inline-block transform rotate-1 shadow-lg">
          About FitMate
        </h1>

        <div className="space-y-6 text-lg leading-relaxed text-gray-800 max-w-3xl text-center">
          <p className="text-2xl font-semibold">
            Revolutionizing Online Fashion Fitting
          </p>

          <p>
            <strong>FitMate</strong> is a cutting-edge web application designed
            to transform the way people shop for clothes online. With the rise
            of e-commerce, the challenge of finding the perfect fit without
            trying on clothes in person has become a significant pain point for
            customers. FitMate bridges this gap by providing an innovative
            solution: virtual fitting.
          </p>

          <h2 className="text-2xl font-semibold">What We Do</h2>
          <p>
            At FitMate, we enable users to visualize how clothes will look on
            their bodies without ever stepping foot into a fitting room. By
            simply uploading a body photo and an image of the desired outfit,
            our advanced algorithms generate a virtual fitting experience that
            allows users to see how the garment will fit and suit them.
          </p>

          <h2 className="text-2xl font-semibold">Our Key Features</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>
              Virtual Fitting: Upload a body photo and a clothing image to
              generate realistic previews.
            </li>
            <li>
              Tailored Fit Recommendations: Personalized suggestions based on
              your body shape and the clothing’s design.
            </li>
            <li>
              Seamless E-commerce Integration: Browse, select, and virtually fit
              clothes from multiple e-commerce platforms.
            </li>
            <li>
              User-Friendly Experience: Easy-to-use interface designed for all
              users to quickly fit their favorite styles.
            </li>
            <li>
              Neo-Brutalism Design: A unique and visually appealing design style
              that ensures smooth and intuitive navigation throughout the
              platform.
            </li>
          </ul>

          <h2 className="text-2xl font-semibold">Our Mission</h2>
          <p>
            At FitMate, we aim to make online shopping more convenient,
            enjoyable, and accurate for everyone. Our goal is to reduce the
            frustration of returns and misfit garments by offering a virtual
            fitting room that gives users confidence in their purchases.
          </p>

          <h2 className="text-2xl font-semibold">Why FitMate?</h2>
          <p>
            With FitMate, you no longer need to worry about clothes not fitting
            right or looking different from expectations. Experience online
            shopping with more confidence, fewer returns, and greater
            satisfaction.
          </p>
        </div>
      </section>
    </LayoutWithNavbar>
  );
};

export default AboutUs;
