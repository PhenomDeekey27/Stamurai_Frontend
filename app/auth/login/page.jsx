"use client";
import { useState } from "react";
import api from "@/lib/api";
import { useRouter } from "next/navigation";


const Login = () => {
  const router = useRouter()
  const [form, setForm] = useState({
    email: "",
    password: "",
  });


  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // ✅ Expect backend to set httpOnly cookie
     const res = await api.post("/auth/login", form);
         console.log(res, "response");
      console.log(res.headers);

      // Log cookies to see if the token is being set correctly
      console.log("Cookies:", document.cookie); 
      // This will give you all cookies (but only non-HttpOnly cookies)
    router.push("/")

   
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="h-screen mx-auto flex flex-col items-center justify-center">
      <h1 className="text-3xl mb-2 font-bold italic text-green-500">
        Stamurai Task Management
      </h1>
      <form
        className="max-w-md w-full mx-auto bg-slate-300 p-4 rounded-md"
        onSubmit={handleSubmit}
      >
        <div className="mb-5">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-bold italic text-green-700"
          >
            Your email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            placeholder="@email.com"
            onChange={handleChange}
            className="bg-gray-50 text-black text-sm rounded-lg block w-full p-2.5"
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-bold italic text-green-700"
          >
            Your password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            required
            onChange={handleChange}
            className="bg-gray-50 text-black text-sm rounded-lg block w-full p-2.5"
          />
        </div>

        <button
          type="submit"
          className="text-white bg-green-600 p-2 rounded-md cursor-pointer hover:bg-green-400 hover:text-black"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
