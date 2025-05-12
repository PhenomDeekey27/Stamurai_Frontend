"use client";

import { useState, useEffect, createContext } from "react";
import { useRouter } from "next/navigation";
import { getCurrentUser } from "@/utitlity/get-current-user"; // Adjust path if needed
import Loading from "@/loading";

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [userdetails, setuserdetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchUser = async () => {
    try {
      const user = await getCurrentUser();
      console.log(user, "details of user in context");
      setuserdetails(user);
    } catch (err) {
      console.error("Failed to fetch current user", err);
      if (err?.response?.status === 401) {
        router.push("/auth/login");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  if (loading) return <Loading></Loading>

  return (
    <UserContext.Provider value={{ userdetails, setuserdetails, fetchUser }}> 
      {children}
    </UserContext.Provider>
  );
}

