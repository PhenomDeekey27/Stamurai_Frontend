"use client";

import { useState, useEffect, createContext } from "react";
import { useRouter } from "next/navigation";
import { getCurrentUser } from "@/utitlity/get-current-user"; // Adjust path if needed

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [userdetails, setuserdetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function fetchUser() {
      try {
        const user = await getCurrentUser();
        console.log(user,"details of user in context")
        setuserdetails(user);
      } catch (err) {
        console.error("Failed to fetch current user", err);

        // ✅ Redirect to login if unauthorized
        if (err?.response?.status === 401) {
          router.push("/auth/login");
        }
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, [router]);

  if (loading) return <div>Loading context...</div>;

  return (
    <UserContext.Provider value={{ userdetails, setuserdetails }}>
      {children}
    </UserContext.Provider>
  );
}
