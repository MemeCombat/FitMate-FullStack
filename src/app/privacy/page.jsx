import React from "react";

const Privacy = () => {
  return (
    <section className="bg-gradient-to-r from-red-200 to-red-400 p-8 md:p-12 lg:p-16 mx-6 mt-6 mb-6 rounded-2xl border-4 border-black shadow-2xl flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-extrabold text-black mb-8 border-b-4 border-black pb-4 bg-green-400 inline-block transform rotate-1 shadow-lg">
        Privacy Policy
      </h1>
      <p className="mb-6 text-center text-gray-600">
        <strong>Effective Date: 4 October 2024</strong>
      </p>

      <h2 className="text-3xl font-semibold mt-6 text-gray-800">
        Introduction
      </h2>
      <p className="mb-4 text-gray-700">
        At FitMate, accessible from fitmate.com, we are committed to protecting
        your privacy and ensuring that your personal information is handled in a
        safe and responsible manner. This Privacy Policy outlines how we
        collect, use, and protect your information when you use our web
        application for fitting clothes from e-commerce.
      </p>

      <h2 className="text-3xl font-semibold mt-6 text-gray-800">
        Information We Collect
      </h2>
      <p className="mb-4 text-gray-700">
        When you use FitMate, we may collect the following types of information:
      </p>
      <ol className="list-decimal ml-6 mb-4 text-gray-700">
        <li>
          <strong>Personal Information:</strong> Name, Email address, Phone
          number, Address
        </li>
        <li>
          <strong>Usage Data:</strong> Information on how you use our
          application, including your interactions with our services, the pages
          you visit, and the time spent on those pages.
        </li>
        <li>
          <strong>Device Information:</strong> Information about the device you
          use to access our application, including IP address, browser type, and
          operating system.
        </li>
        <li>
          <strong>Photos:</strong> Body photo and clothes photo uploaded by you
          to generate fitting results.
        </li>
      </ol>

      <h2 className="text-3xl font-semibold mt-6 text-gray-800">
        How We Use Your Information
      </h2>
      <p className="mb-4 text-gray-700">
        We may use the information we collect for the following purposes:
      </p>
      <ul className="list-disc ml-6 mb-4 text-gray-700">
        <li>
          <strong>To Provide Services:</strong> To generate fitting results
          based on the body and clothing photos you provide.
        </li>
        <li>
          <strong>To Communicate with You:</strong> To send you updates,
          promotional materials, and other information related to our services.
        </li>
        <li>
          <strong>To Improve Our Services:</strong> To analyze usage trends and
          preferences to enhance user experience.
        </li>
        <li>
          <strong>To Comply with Legal Obligations:</strong> To fulfill our
          legal and regulatory obligations.
        </li>
      </ul>

      <h2 className="text-3xl font-semibold mt-6 text-gray-800">
        Sharing Your Information
      </h2>
      <p className="mb-4 text-gray-700">
        We do not sell or rent your personal information to third parties.
        However, we may share your information in the following circumstances:
      </p>
      <ul className="list-disc ml-6 mb-4 text-gray-700">
        <li>
          <strong>With Service Providers:</strong> We may share your information
          with third-party service providers who assist us in operating our
          application and providing our services. These parties are obligated to
          keep your information confidential.
        </li>
        <li>
          <strong>As Required by Law:</strong> We may disclose your information
          if required to do so by law or in response to valid requests by public
          authorities.
        </li>
      </ul>

      <h2 className="text-3xl font-semibold mt-6 text-gray-800">
        Data Security
      </h2>
      <p className="mb-4 text-gray-700">
        We take the security of your personal information seriously and
        implement reasonable measures to protect it from unauthorized access,
        disclosure, alteration, and destruction. However, no method of
        transmission over the internet or method of electronic storage is 100%
        secure, and we cannot guarantee its absolute security.
      </p>

      <h2 className="text-3xl font-semibold mt-6 text-gray-800">Your Rights</h2>
      <p className="mb-4 text-gray-700">
        You have the following rights regarding your personal information:
      </p>
      <ul className="list-disc ml-6 mb-4 text-gray-700">
        <li>
          <strong>Access:</strong> You have the right to request copies of your
          personal information.
        </li>
        <li>
          <strong>Correction:</strong> You have the right to request that we
          correct any information you believe is inaccurate or incomplete.
        </li>
        <li>
          <strong>Deletion:</strong> You have the right to request that we
          delete your personal information, under certain conditions.
        </li>
        <li>
          <strong>Objection:</strong> You have the right to object to our
          processing of your personal information.
        </li>
      </ul>
      <p className="mb-4 text-gray-700">
        To exercise these rights, please contact us using the contact
        information provided below.
      </p>

      <h2 className="text-3xl font-semibold mt-6 text-gray-800">
        Changes to This Privacy Policy
      </h2>
      <p className="mb-4 text-gray-700">
        We may update our Privacy Policy from time to time. We will notify you
        of any changes by posting the new Privacy Policy on this page and
        updating the effective date at the top. You are advised to review this
        Privacy Policy periodically for any changes.
      </p>
    </section>
  );
};

export default Privacy;
