"use client"
import { createContext, useContext, useState, useEffect } from "react";
import { fetchAllUsers } from "@/utitlity/get-all-user";
const AllUserContext = createContext();

export const AllUserProvider = ({ children }) => {
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const getUsers = async () => {
    try {
      const Users = await fetchAllUsers();
      setAllUsers(Users?.data || []);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <AllUserContext.Provider value={{ allUsers, getUsers, loading }}>
      {children}
    </AllUserContext.Provider>
  );
};

export const useUserContext = () => useContext(AllUserContext);
