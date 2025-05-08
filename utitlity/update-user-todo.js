import api from "@/lib/api";
import Cookies from "js-cookie";

export async function updateUserTodos(id, updatedData) {
  try {
      const token = Cookies.get('token')
    const response = await api.put(`/todo/update-todos/${id}`, updatedData,{
        headers:{
            Authorization:`Bearer : ${token}`
        }
     });
    return response.data;
  } catch (error) {
    return error?.response?.data || error.message;
  }
}
