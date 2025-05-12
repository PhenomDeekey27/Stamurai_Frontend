"use client";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useContext, useState,useEffect } from "react";

import { createTodo } from "@/utitlity/create-user-todo";
import { toast,ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";
import { useUserContext } from "@/Context/AllUserContext";
import { UserContext } from "@/Context/UserContext";
import { sendNotifications } from "@/utitlity/send-user-notifications";



const NewTodo = () => {
  const {allUsers}=useUserContext()

  const {userdetails}=useContext(UserContext)
   

  const [todoData, setTodoData] = useState({
    title: "",
    description: "",
    priority: "",
    status: "",
    dueDate: null,
    assignedTo: "",
  });

  


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTodoData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (date) => {
    setTodoData((prev) => ({ ...prev, dueDate: date }));
  };

  const handleDropdownSelect = (key, value) => {
    setTodoData((prev) => ({ ...prev, [key]: value }));
    document.getElementById(`${key}_dropdown`)?.classList.add("hidden");
  };

  const router = useRouter()

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log("Submitted Todo:", todoData);
    // You can send `todoData` to your backend here
    try {

      const created_todos=await createTodo(todoData)
      console.log(created_todos,"ctr")
      toast.success("Todo created Successfully")
      setTimeout(() => {
        router.push("/")
        
      }, 1000);
        // ✅ Reset form after successful creation
    setTodoData({
      title: "",
      description: "",
      priority: "",
      status: "",
      dueDate: null,
      assignedTo: "",
    });

 
   
      
    } catch (error) {
      console.log(error ? error : error.message)
      toast.error(error ? error : error.message)
      
    }

  

   

  };

const assignNotifications =async(user)=>{
  handleDropdownSelect("assignedTo", user._id)
  try {
     const notifcations = await sendNotifications(user._id,`
      You have been assigned to complete a piece of work by ${userdetails?.name} .You can find more details about the work on you dashboard
      `)
     console.log(notifcations,"notification")
    
  } catch (error) {
    console.log(error ? error : error.message)
    
  }

  

}


  




  return (
    <div>
      <ToastContainer></ToastContainer>
      <h1 className="text-center text-2xl text-green-500 font-bold italic">
        Create New Todo
      </h1>
      <div className="flex items-center justify-center h-screen">
        <form
          className="max-w-md w-full mx-auto bg-slate-200 p-4 rounded-md"
          onSubmit={handleSubmit}
        >
          {/* Title */}
          <div className="mb-5">
            <label className="block mb-2 text-sm font-bold text-green-700">
              Create Todo
            </label>
            <input
              type="text"
              name="title"
              value={todoData.title}
              onChange={handleInputChange}
              placeholder="Enter Todo Text"
              className="shadow-xs border border-gray-300 text-sm rounded-lg block w-full p-2.5 bg-green-400"
              required
            />
          </div>

          {/* Description */}
          <div className="mb-5">
            <label className="block mb-2 text-sm text-green-700 font-bold">
              Enter Description
            </label>
            <textarea
              name="description"
              value={todoData.description}
              onChange={handleInputChange}
              placeholder="Enter Todo description..."
              className="shadow-xs border border-gray-300 text-sm rounded-lg block w-full p-2.5 bg-green-400"
              required
            />
          </div>

          {/* Priority Dropdown */}
          <div className="mb-5 flex gap-2 items-center justify-between">
            <div>
              <button
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex items-center"
                onClick={() =>
                  document
                    .getElementById("priority_dropdown")
                    ?.classList.toggle("hidden")
                }
              >
                Priority
                <svg className="w-2.5 h-2.5 ml-2" viewBox="0 0 10 6">
                  <path
                    d="M1 1l4 4 4-4"
                    stroke="currentColor"
                    strokeWidth="1"
                  />
                </svg>
              </button>
              <div
                id="priority_dropdown"
                className="hidden bg-white shadow-md rounded-lg mt-2 w-44"
              >
                <ul className="text-sm text-gray-700">
                  {["Low", "Medium", "High"].map((level) => (
                    <li
                      key={level}
                      onClick={() => handleDropdownSelect("priority", level)}
                      className="cursor-pointer hover:bg-gray-200 p-2"
                    >
                      {level}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            {todoData?.priority !== "" ? (
              <div className="bg-green-400  p-2 rounded-md">
                {todoData?.priority}
              </div>
            ) : (
              ""
            )}
          </div>

          {/* Status Dropdown */}
          <div className="mb-5 flex  items-center justify-between ">
            <div>
              <button
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex items-center"
                onClick={() =>
                  document
                    .getElementById("status_dropdown")
                    ?.classList.toggle("hidden")
                }
              >
                Status
                <svg className="w-2.5 h-2.5 ml-2" viewBox="0 0 10 6">
                  <path
                    d="M1 1l4 4 4-4"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
              </button>

              <div
                id="status_dropdown"
                className="hidden bg-white shadow-md rounded-lg mt-2 w-44"
              >
                <ul className="text-sm text-gray-700">
                  {["Pending", "Completed", "In-Progress"].map((status) => (
                    <li
                      key={status}
                      onClick={() => handleDropdownSelect("status", status)}
                      className="cursor-pointer hover:bg-gray-200 p-2"
                    >
                      {status}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            {todoData?.status !== "" ? (
              <div className="bg-green-400  p-2 rounded-md">
                {todoData?.status}
              </div>
            ) : (
              ""
            )}
          </div>

          {/* Due Date */}
          <div className="mb-5">
            <label className="block mb-2 text-sm text-green-700 font-bold">
              Due Date
            </label>
            <DatePicker
              selected={todoData.dueDate}
              onChange={handleDateChange}
              dateFormat="dd/MM/yyyy"
              placeholderText="Select a date"
              className="bg-green-500 w-full p-2 rounded-md"
            />
          </div>

          {/* Assign To Dropdown */}
          <div className="mb-5">
            <label className="block mb-2 text-sm text-green-700 font-bold">
              Assign To
            </label>
            <div className="flex items-center justify-between">
              <div>
                <button
                  type="button"
                  className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex items-center"
                  onClick={() =>
                    document
                      .getElementById("assignedTo_dropdown")
                      ?.classList.toggle("hidden")
                  }
                >
                  Select Users
                  <svg className="w-2.5 h-2.5 ml-2" viewBox="0 0 10 6">
                    <path
                      d="M1 1l4 4 4-4"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                  </svg>
                </button>
                <div
                  id="assignedTo_dropdown"
                  className="hidden bg-white shadow-md rounded-lg mt-2 w-44"
                >
                  <ul className="text-sm text-gray-700">
                    {allUsers.map((user) => (
                      <li
                        key={user.name}
                        onClick={() => assignNotifications(user)}
                        className={`cursor-pointer hover:bg-gray-200 p-2 ${user._id===userdetails._id ? "opacity-50 pointer-events-none":""}`}
                      >
                        {user.name}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              {todoData?.assignedTo !== "" ? (
                <div className="bg-green-500  p-2 rounded-md">{todoData?.assignedTo}</div>
              ) : (
                ""
              )}
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="text-white bg-green-700 cursor-pointer hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5"
          >
            Submit Todo
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewTodo;
