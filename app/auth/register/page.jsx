"use client"
import { useState, } from "react";
import api from "@/lib/api";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { toast,ToastContainer } from "react-toastify"; 

const Register = () => {

    const [form, setform] = useState({
        name:'',
        email:'',
        password:'',
        cpassword:''
    })

    const handleChange =(e)=>{
        setform({...form,[e.target.name] :e.target.value})
    }


    const router = useRouter();

    const handleSubmit = async (e) => {
      e.preventDefault();
    
      if (form.password !== form.cpassword) {
        toast.error("Passwords do not match");
        return;
      }
    
      try {
        const res = await api.post('/auth/register', form);
        console.log(res.data);
     
        router.push('/auth/login');
      } catch (err) {
        console.error("Registration error:", err);
        toast.error(err.response?.data?.message || 'Registration failed');
      }
    };

  //   useEffect(() => {
  //     const token = Cookies.get("token");
  //     if (token) {
  //         router.push("/"); // Redirect to homepage or dashboard if user is already logged in
  //     }
  // }, [router]);

  return (
    <div className="h-screen mx-auto flex flex-col items-center justify-center">
    <ToastContainer/>
        <h1 className="text-3xl mb-2 font-bold italic text-green-500">Stamurai Task Management</h1>
      <form className="max-w-md w-full mx-auto bg-slate-300 p-4 rounded-md" onSubmit={handleSubmit}>
      <div className="mb-5">
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-bold italic text-green-700"
          >
            Your name
          </label>
          <input
            type="string"
            id="name"
            className="bg-gray-50  text-black text-sm rounded-lg   block w-full p-2.5  "
            placeholder="Your name"
            required
            name="name"
            onChange={handleChange}
          />
        </div>
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
        <div className="mb-5">
          <label
            htmlFor="Confirm password"
            className="block mb-2 text-sm font-bold italic text-green-700"
          >
            Confirm password
          </label>
          <input
            type="password"
            id="cpassword"
            name="cpassword"
           className="bg-gray-50  text-black text-sm rounded-lg block w-full p-2.5"
            required
            onChange={handleChange}
          />
        </div>
      
        <button
          type="submit"
          className="text-white bg-green-600 p-2 rounded-md cursor-pointer hover:bg-green-400 hover:text-black"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
