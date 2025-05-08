"use client";

import { useRouter } from "next/navigation";
import api from "@/lib/api"; // Ensure your API instance is correctly imported

const LogoutButton = () => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await api.get("/auth/logout", {
        credentials: "include", // Ensure this is set to include cookies
      });

      router.push("/auth/login"); // Redirect to login after successful logout
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-red-500 text-white px-4 py-2 rounded"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
