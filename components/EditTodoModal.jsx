"use client"
import React, { useContext } from "react";
import { useState } from "react";
import DatePicker from "react-datepicker";
import { updateUserTodos } from "@/utitlity/update-user-todo";

import { ToastContainer,toast } from "react-toastify";

import { useUserContext } from "@/Context/AllUserContext";
import { sendNotifications } from "@/utitlity/send-user-notifications";



const EditTodoModal = ({editTodoModel,seteditTodoModel,singleTodoData,fetchUserTodos}) => {

  const [todoData, setTodoData] = useState(singleTodoData)
    const {allUsers} =useUserContext()
    

    
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

const assignNotifications =async(user)=>{
  handleDropdownSelect("assignedTo", user._id)
  try {
     const notifcations = await sendNotifications(user._id,"User notified Successfully")
     console.log(notifcations,"notification")
    
  } catch (error) {
    console.log(error ? error : error.message)
    
  }

  

}


    const handleSubmit=async(e)=>{
        e.preventDefault()
     
        try {
            const updatedData = await updateUserTodos(todoData._id,todoData)
            console.log(updatedData)
            toast.success("Todo edited Successfully")
            await fetchUserTodos();
         
          
            seteditTodoModel(!editTodoModel)
            
        } catch (error) {
            console.log(error ? error : error.message)
            toast.error(error ? error : error.message)
            
        }

    }
  return (
    <div className="overflow-x-auto">
      <ToastContainer></ToastContainer>
     <div
  id="static-modal"
  data-modal-backdrop="static"
  tabIndex="-1"
  aria-hidden="true"
  className="fixed inset-0 z-50 bg-black bg-opacity-70 flex items-center justify-center overflow-y-auto"
>

<div className="relative w-full max-w-2xl mx-auto p-4">
<div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Edit Todo Information
              </h3>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-hide="static-modal"
                onClick={()=>seteditTodoModel(!editTodoModel)}
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>

            <div>
                  <div className="flex items-center justify-center overflow-auto">
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
                                    .getElementById("edit_priority_dropdown")
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
                                id="edit_priority_dropdown"
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
                                    .getElementById("edit_status_dropdown")
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
                                id="edit_status_dropdown"
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
                                  onClick={() => document.getElementById("edit_assignedTo_dropdown")?.classList.toggle("hidden")
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
                                  id="edit_assignedTo_dropdown"
                                  className="hidden bg-white shadow-md rounded-lg mt-2 w-44"
                                >
                                  <ul className="text-sm text-gray-700">
                                    {allUsers.map((user) => (
                                      <li
                                        key={user.name}
                                        onClick={() =>assignNotifications(user) }
                                        className="cursor-pointer hover:bg-gray-200 p-2"
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
                           Update Todo
                          </button>
                        </form>
                      </div>


            </div>


          </div>
        </div>
      </div>
    </div>
  );
};

export default EditTodoModal;
