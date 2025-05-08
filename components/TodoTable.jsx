import React, { useContext, useEffect } from "react";
import { MdOutlineDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import EditTodoModal from "./EditTodoModal";
import { useState } from "react";
import { deleteUserTodo } from "@/utitlity/delete-user-todo";
import { toast,ToastContainer } from "react-toastify";
import { useUserContext } from "@/Context/AllUserContext";

const TodoTable = ({ todos,fetchUserTodos }) => {

  console.log("inputTodos", todos);
const [editTodoModel, seteditTodoModel] = useState(false)
const [singleTodoData, setsingleTodoData] = useState(null)
const [deleteModal, setdeleteModal] = useState(false)
const [selectedTodo, setselectedTodo] = useState(null)

const {allUsers} = useUserContext()
console.log(allUsers)


const handleEdittodo=(todo)=>{
  
  seteditTodoModel(!editTodoModel)
  setsingleTodoData(todo)

}



const handleDeleteTodo = async () => {
  try {
    const removeTodos = await deleteUserTodo(selectedTodo);
    console.log(removeTodos, "rt");

    if (
      removeTodos?.message &&
      removeTodos.message.toLowerCase().includes("not authorized")
    ) {
      toast.error("Not authorized to remove this todo");
      return; // Stop further execution
    }

    toast.success("Todo removed successfully");
    setdeleteModal(!deleteModal);
    await fetchUserTodos();
   

  } catch (error) {
    console.error(error?.message || error);
    toast.error(error?.message || "An error occurred while deleting the todo");
  }
};




  return (
    <div>
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Title
              </th>
              <th scope="col" className="px-6 py-3">
                Assigned To
              </th>
              <th scope="col" className="px-6 py-3">
                Priority
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Due Date
              </th>
              <th scope="col" className="px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
           
            {todos.map((todo) => (
              <tr className="bg-gray-800" key={todo.dueDate}>
                <th scope="col" className="px-6 py-3 text-white">
                  {todo.title}
                </th>
                <td className="px-6 py-4">
                {
    todo.assignedTo
      ? allUsers.find(user => user._id === todo.assignedTo)?.name || "Unknown User"
      : "Myself"
  }
                  </td>
                  <td className="px-6 py-4">
                    {todo.priority}
                  </td>
                  <td className="px-6 py-4" >
                     
                   <span className={ `${todo.status ==="Pending" ? "text-yellow-600 font-bold uppercase rounded-md":""}`}>
                    {
                      todo.status
                    }
                    </span>    
                     
                  </td>
                  <td className="px-6 py-4">
                    {
                      todo.dueDate.split('T')[0]
                    }
                  </td>
                  <td className="px-6 py-4 flex items-center gap-4">
                   <MdOutlineDelete onClick={()=>{
                    setdeleteModal(!deleteModal)
                    setselectedTodo(todo?._id)

                   }} size={24} className="cursor-pointer  hover:text-orange-500"></MdOutlineDelete>
                   <MdEdit onClick={()=>handleEdittodo(todo)} size={24} className="cursor-pointer hover:text-orange-500"></MdEdit>
                  </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {
        editTodoModel && <EditTodoModal fetchUserTodos={fetchUserTodos} editTodoModel={editTodoModel} seteditTodoModel={seteditTodoModel} singleTodoData={singleTodoData}></EditTodoModal>
      }

{
  deleteModal && 
  <div id="delete-modal" tabindex="-1"  className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
    <div className="relative p-4 w-full max-w-md max-h-full">
        <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
            <button type="button" 
            className="absolute top-3 end-2.5 text-gray-400 bg-transparent
             hover:bg-gray-200 hover:text-gray-900 rounded-lg 
             text-sm w-8 h-8 ms-auto inline-flex justify-center items-center
              dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="popup-modal"
              onClick={()=>document.getElementById("delete-modal").classList.toggle("hidden")}
              >
                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                </svg>
                <span className="sr-only">Close modal</span>
            </button>
            <div className="p-4 md:p-5 text-center">
                <svg className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                </svg>
                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you want to delete this product?</h3>
                <button data-modal-hide="popup-modal" type="button" className="text-white bg-red-600 hover:bg-red-800  font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 
                text-center"
                onClick={()=>handleDeleteTodo()}
                >
                    Yes, I'm sure
                </button>
                <button data-modal-hide="popup-modal" type="button" className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 ">No, cancel</button>
            </div>
        </div>
    </div>
</div>
}



      


    </div>
  );
};

export default TodoTable;
