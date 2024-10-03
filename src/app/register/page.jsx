"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Swal from "sweetalert2";
import Button from "../components/Button";
import Select from "react-select";

const fashionOptions = [
  { value: "casual", label: "Casual" },
  { value: "formal", label: "Formal" },
  { value: "streetwear", label: "Streetwear" },
  { value: "vintage", label: "Vintage" },
  { value: "bohemian", label: "Bohemian" },
  { value: "minimalist", label: "Minimalist" },
  { value: "athleisure", label: "Athleisure" },
  { value: "preppy", label: "Preppy" },
];

export default function Register() {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    tags: [],
  });
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleFashionChange = (selectedOptions) => {
    setUser({
      ...user,
      tags: selectedOptions.map((option) => option.value),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        }
      );
      const data = await res.json();
      if (!res.ok) throw data;
      Swal.fire({
        title: "Registration Success!",
        text: "You have been registered successfully.",
        icon: "success",
        confirmButtonText: "OK",
      }).then(() => {
        router.push("/login");
      });
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Registration Failed",
        text: error.message || "An error occurred. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <div
      className="font-mono min-h-screen flex justify-center items-center"
      style={{
        backgroundImage:
          "url('https://i.pinimg.com/originals/dd/b8/5d/ddb85dc58883b87a2ea5324dd37b0fdf.gif')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="w-full max-w-6xl grid md:grid-cols-3 bg-white border-8 border-black shadow-[16px_16px_0_0_rgba(0,0,0,1)]">
        <div className="md:col-span-1 flex justify-center items-center bg-gray-800 border-r-8 border-black">
          <img
            src="/componentregis.png"
            alt="Registration Graphic"
            className="hidden md:block w-full h-full object-cover"
          />
        </div>
        <div className="md:col-span-2 p-8">
          <h1 className="text-5xl font-bold mb-8 text-black">Create Account</h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="text-2xl font-bold text-black block mb-2">
                Username
              </label>
              <input
                name="username"
                value={user.username}
                type="text"
                className="w-full p-4 text-xl text-black bg-gray-200 border-4 border-black focus:outline-none focus:ring-4 focus:ring-blue-400"
                placeholder="Enter Username"
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="text-2xl font-bold text-black block mb-2">
                Email
              </label>
              <input
                value={user.email}
                name="email"
                type="email"
                className="w-full p-4 text-xl text-black bg-gray-200 border-4 border-black focus:outline-none focus:ring-4 focus:ring-blue-400"
                placeholder="Enter email"
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="text-2xl font-bold text-black block mb-2">
                Password
              </label>
              <input
                value={user.password}
                name="password"
                type="password"
                className="w-full p-4 text-xl text-black bg-gray-200 border-4 border-black focus:outline-none focus:ring-4 focus:ring-blue-400"
                placeholder="Enter password"
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="text-2xl font-bold text-black block mb-2">
                Fashion Preferences
              </label>
              <Select
                isMulti
                name="tags"
                value={fashionOptions.filter((option) =>
                  user.tags.includes(option.value)
                )} // Map selected tags to options
                options={fashionOptions}
                className="text-xl text-black"
                classNamePrefix="select"
                onChange={handleFashionChange}
                placeholder="Select your fashion preferences"
              />
            </div>

            <Button
              type="submit"
              className="w-full py-4 text-2xl font-bold text-white bg-blue-600 hover:bg-blue-700 border-4 border-black transition duration-300 justify-center shadow-[8px_8px_0_0_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-2 hover:translate-y-2"
            >
              Create an Account
            </Button>
          </form>

          <p className="mt-8 text-xl text-center text-black">
            Already have an account?
            <Link
              className="hover:underline font-bold ml-2 hover:text-blue-600"
              href={"/login"}
            >
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
