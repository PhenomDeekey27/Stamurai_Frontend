'use client'


import { useState } from "react";
import { useRouter } from "next/navigation";
import { ToastContainer,toast } from "react-toastify";
import api from "@/lib/api";

const Login = () => {

   const [form, setform] = useState({
       
        email:'',
        password:'',
        
    })

    const handleChange =(e)=>{
        setform({...form,[e.target.name] :e.target.value})
    }


  
  const router = useRouter();

  const handleSubmit = async (e) => {
      e.preventDefault();
    
  
    
      try {
        const res = await api.post('/auth/login', form);
        console.log(res.data);
     
        router.push('/');
      } catch (err) {
        console.error("Login error:", err);
        toast.error(err.response?.data?.message || 'Login failed');
      }
    };

  return (
   <div className="h-screen mx-auto flex flex-col items-center justify-center">
    <ToastContainer/>
        <h1 className="text-3xl mb-2 font-bold italic text-green-500">Stamurai Task Management</h1>
      <form className="max-w-md w-full mx-auto bg-slate-300 p-4 rounded-md" onSubmit={handleSubmit}>
    
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
            className="bg-gray-50  text-black text-sm rounded-lg   block w-full p-2.5  "
            placeholder="@email.com"
            required
            onChange={handleChange}
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
           className="bg-gray-50  text-black text-sm rounded-lg block w-full p-2.5"
            required
            onChange={handleChange}
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
