import React, { useEffect, useState } from "react";
import { getUserTodos } from "@/utitlity/get-user-todos";
import TodoTable from "./TodoTable";

const AllUserTodos = () => {
  const [userTodos, setuserTodos] = useState([]);
  const [filteredTodos, setFilteredTodos] = useState([]);
  const [selectedPriority, setSelectedPriority] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch the todos
  async function fetchUserTodos() {
    const fetchTodos = await getUserTodos();
    setuserTodos(fetchTodos.data);
    setFilteredTodos(fetchTodos.data); // Set the initial list to the filteredTodos
  }

  useEffect(() => {
    fetchUserTodos();
  }, []);

  // Filter todos based on selected filters
  const filterTodos = () => {
    let filtered = [...userTodos];
  
    if (selectedPriority) {
      filtered = filtered.filter((todo) => todo.priority === selectedPriority);
    }
  
    if (selectedStatus) {
      filtered = filtered.filter((todo) => todo.status === selectedStatus);
    }
  
    if (searchQuery) {
      filtered = filtered.filter(
        (todo) =>
          todo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (todo.assignedTo && todo.assignedTo.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
  
    setFilteredTodos(filtered);
  };
  
  // Reset the filters
  const resetFilters = () => {
    setSelectedPriority("");
    setSelectedStatus("");
    setSearchQuery("");
    setFilteredTodos(userTodos); // Reset to show all todos
  };

  // Call filterTodos when filters or search query change
  useEffect(() => {
    filterTodos();
  }, [selectedPriority, selectedStatus, searchQuery, userTodos]);

  return (
    <div className="mt-12">
      {/* Search bar component */}
      <div className="flex  items-center justify-around gap-4 flex-col lg:flex-row bg-slate-200 p-4">
        {/* Search Bar */}
        <form className="max-w-md w-[90vw] md:w-md">
          <label htmlFor="default-search" className="mb-2 text-sm font-medium sr-only">
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-green-300"
              placeholder="Search Your Recent Activities"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              required
            />
          </div>
        </form>

        {/* Status Dropdown */}
        {/* Status Dropdown */}
    <div className="">
      <button
        id="dropdownDefaultButton"
        data-dropdown-toggle="dropdown"
        className="text-white bg-blue-700 hover:bg-blue-800 p-2 flex items-center rounded-md cursor-pointer"
        type="button"
        onClick={() =>
          document.getElementById("status_dropdown").classList.toggle("hidden")
        }
      >
        Status{" "}
        <svg
          className="w-2.5 h-2.5 ms-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>

      <div
        id="status_dropdown"
        className="z-10 hidden absolute top-50 bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700"
      >
        <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
          <li>
            <a
              href="#"
              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              onClick={() => setSelectedStatus("Pending")}
            >
              Pending
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              onClick={() => setSelectedStatus("Completed")}
            >
             Completed
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              onClick={() => setSelectedStatus("In-Progress")}
            >
             In-Progress
            </a>
          </li>
        </ul>
      </div>
    </div>

        {/* Priority Dropdown */}
        <div className="">
          <button
            id="dropdownDefaultButton"
            data-dropdown-toggle="dropdown"
            className="text-white bg-blue-700 hover:bg-blue-800 p-2 flex items-center rounded-md cursor-pointer"
            type="button"
            onClick={() =>
              document.getElementById("priority_dropdown").classList.toggle("hidden")
            }
          >
            Priority
            <svg
              className="w-2.5 h-2.5 ms-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 4 4 4-4"
              />
            </svg>
          </button>

          <div
            id="priority_dropdown"
            className="z-10 top-50 hidden absolute bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-32 dark:bg-gray-700"
          >
            <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  onClick={() => setSelectedPriority("Low")}
                >
                  Low
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  onClick={() => setSelectedPriority("Medium")}
                >
                  Medium
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  onClick={() => setSelectedPriority("High")}
                >
                  High
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Reset Filters */}
        <button
          className="text-white bg-red-500 p-2 rounded-md cursor-pointer"
          onClick={resetFilters}
        >
          Reset Filters
        </button>
      </div>

      {/* Display filtered todos */}
      <div>
         {filteredTodos.length > 0 && <TodoTable todos={filteredTodos} fetchUserTodos={fetchUserTodos}></TodoTable>}

      </div>
     
    </div>
  );
};

export default AllUserTodos;
