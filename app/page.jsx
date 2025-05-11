'use client'


import {useContext, useEffect, useState } from "react";

import { getTodocreatedByUser } from "@/utitlity/get-Todos-created-by-user";
import { getTodoassignedtoUser } from "@/utitlity/get-Todos-assigned-to-user";
import { getOverdueTodos } from "@/utitlity/get-ourdue-todos";
import { getUserTodos } from "@/utitlity/get-user-todos";
import AllUserTodos from "@/components/AllUserTodos";
import { UserContext } from "@/Context/UserContext";


export const dynamic = "force-dynamic";



const Home = () => {


  const {userdetails}=useContext(UserContext)

  
 
 
  const [todos, settodos] = useState([])
  const [assingedTodos, setassingedTodos] = useState([])
  const [overdue, setoverdue] = useState([])
  const [userTodos, setuserTodos] = useState([])
 
   useEffect(() => {

    const fetchData = async () => {
      try {
        const data = await getTodocreatedByUser();
       
        settodos([...todos,...data.data])
     
      } catch (err) {
        console.error("Error fetching todos:", err);
      }
    };

    const AssignedTodos = async()=>{
      try {

        const data = await getTodoassignedtoUser()
      
        setassingedTodos([...assingedTodos,...data.data])
        
      } catch (error) {
        console.log(error,'err')
        
      }

    }

    const overdueTodos = async()=>{
      try {

        const data = await getOverdueTodos()
     
        setoverdue([...overdue,...data.data])
        
      } catch (error) {
        console.log(error)
        
      }

    }

    const fetchUserTodos = async()=>{
     
      try {
        const todos = await getUserTodos()
        console.log(todos?.data)
        setuserTodos([...userTodos,...todos?.data])
  
     
        
      } catch (error) {
        console.log(error,"usererror")
        
      }
    
      
    }


    fetchData();
    AssignedTodos()
    overdueTodos()
    fetchUserTodos()
  }, []);






  return (
    <div>
   
    <div className="flex flex-col h-full px-4 py-2">
      <h1 className="text-xl font-bold mb-4">Welcome! {userdetails?.name}</h1>
      <section className="flex-1 overflow-y-auto">

        <p className="text-gray-600">Your tasks will appear here.</p>
        <div className="flex items-center justify-center gap-6 md:justify-between flex-wrap">

          <div className="bg-slate-200 shadow-sm shadow-green-400 w-60 p-4 flex flex-col items-center">
          <p className="text-2xl italic">Task Created</p>
          <span className="text-xl font-bold">{todos.length}</span>
          </div>

          <div className="bg-slate-200 shadow-sm shadow-green-400 w-60 p-4 flex flex-col items-center">
          <p className="text-2xl  italic">Assigned Tasks</p>
          <span className="text-xl font-bold">{assingedTodos.length}</span>
          </div>

          <div className="bg-slate-200 shadow-sm shadow-green-400 w-60 p-4 flex flex-col items-center">
          <p className="text-2xl italic">OverDue Tasks</p>
          <span className="text-xl font-bold">{overdue.length}</span>
          </div>

         
        </div>

        <AllUserTodos></AllUserTodos>

      </section>
    </div>
 
  
    </div>
  );
};

export default Home;
