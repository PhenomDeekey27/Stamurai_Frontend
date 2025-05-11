"use client";

import { useRouter } from "next/navigation";
import api from "@/lib/api"; // Ensure your API instance is correctly imported

const LogoutButton = () => {
  const router = useRouter();

const handleLogout = async () => {
  try {
    await api.get("/auth/logout", {
      withCredentials: true, // Properly include cookies in Axios
    });

    router.push("/auth/login"); // Redirect after logout
  } catch (error) {
    console.error("Logout failed:", error);
  }
};

  return (
    <button
      onClick={handleLogout}
      className="bg-red-500 text-white px-4 py-2 rounded cursor-pointer"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
