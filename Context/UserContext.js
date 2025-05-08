"use client"
import { useState,useEffect, createContext } from "react";
import Cookies from "js-cookie";
import jwt from "jsonwebtoken"


export const Usercontext = createContext()

export function UserProvider({ children }) {
    const [userdetails, setuserdetails] = useState(null);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const token = Cookies.get("token");
      if (token) {
        const decoded = jwt.decode(token);
        setuserdetails(decoded);
      }
      setLoading(false);
    }, []);
  
    if (loading) return <div>Loading context...</div>;
  
    return (
      <Usercontext.Provider value={{ userdetails, setuserdetails }}>
        {children}
      </Usercontext.Provider>
    );
  }
  