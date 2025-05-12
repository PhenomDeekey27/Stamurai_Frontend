// lib/requests.js
import api from "@/lib/api";
import Cookies from "js-cookie";

export async function deleteUserTodo(id) {
  try {
    const token = Cookies.get("token");

    const deletedTodo = await api.delete(`/todo/delete-user-todo/${id}`, {
     
    });

    return deletedTodo;
  } catch (error) {
    console.error("Delete error:", error);
    throw error?.response?.data || error.message;
  }
}
