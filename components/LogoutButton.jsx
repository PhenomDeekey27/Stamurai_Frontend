"use client";

import { useRouter } from "next/navigation";
import { useContext } from "react";
import { UserContext } from "@/Context/UserContext";
import api from "@/lib/api"; // Ensure your API instance is correctly imported

const LogoutButton = () => {
    const { userdetails,setuserdetails } = useContext(UserContext);
  const router = useRouter();

const handleLogout = async () => {
  try {
    await api.get("/auth/logout", {
      withCredentials: true, // Properly include cookies in Axios
    });
    setuserdetails(null)
    

    router.push("/auth/login"); // Redirect after logout
  } catch (error) {
    console.error("Logout failed:", error);
  }
};

  return (
    <button
      onClick={handleLogout}
      className="bg-red-500 text-white px-4 py-2 rounded cursor-pointer w-full"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
