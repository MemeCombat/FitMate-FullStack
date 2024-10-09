"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Button from "../components/Button";
import Swal from "sweetalert2";
import Link from "next/link";

export default function Login() {
  const [user, setUser] = useState({ email: "", password: "" });
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      const data = await res.json();
      if (!res.ok) throw data;
      Swal.fire({
        title: "Login Success!",
        text: "You have been logged in successfully.",
        icon: "success",
        buttons: {
          confirm: {
            text: "OK",
            value: true,
            visible: true,
            closeModal: true,
          },
        },
      }).then(() => {
        // router.push("/");
        window.location.href = "/";
      });
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Login Failed",
        text: "Invalid email or password. Please try again.",
        icon: "error",
        buttons: {
          confirm: {
            text: "OK",
            value: true,
            visible: true,
            closeModal: true,
          },
        },
      });
    }
  };

  return (
    <div
      className="font-sans min-h-screen flex justify-center items-center blur-smooth"
      style={{
        backgroundImage:
          "url('https://i.pinimg.com/originals/dd/b8/5d/ddb85dc58883b87a2ea5324dd37b0fdf.gif')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="flex flex-col items-center justify-center p-6 mt-10">
        <div className="border-4 border-black rounded-lg p-6 max-w-md shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] bg-white">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="mb-8">
              <h3 className="text-black text-4xl font-bold tracking-wider text-center">
                Sign in
              </h3>
              <p className="text-black text-md text-center mt-4">
                Enter your credentials to explore the world of possibilities.
              </p>
            </div>
            <div>
              <label className="text-black text-lg block mb-2 font-bold">
                Email
              </label>
              <input
                name="email"
                value={user.email}
                type="text"
                className="w-full text-lg border-4 text-black border-black px-4 py-2 rounded-lg bg-gray-100 placeholder-red focus:ring-4 focus:ring-red-500"
                placeholder="Enter email"
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="text-black text-lg block mb-2 font-bold">
                Password
              </label>
              <input
                name="password"
                value={user.password}
                type="password"
                className="w-full text-lg border-4 text-black border-black px-4 py-2 rounded-lg bg-gray-100 placeholder-red focus:ring-4 focus:ring-red-500"
                placeholder="Enter password"
                onChange={handleChange}
              />
            </div>

            <Button className="w-full bg-red-600 hover:bg-red-700 text-white font-bold text-lg py-3 px-4 rounded-lg flex justify-center items-center">
              Sign in
            </Button>

            <p className="text-center lg:text-lg text-sm text-black mt-6">
              Don't have an account?
              <Link
                href="/register"
                className="font-semibold lg:text-lg text-sm hover:text-red-600 hover:underline ml-1"
              >
                Register here
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
