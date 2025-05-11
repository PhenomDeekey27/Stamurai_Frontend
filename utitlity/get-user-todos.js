import Cookies from "js-cookie";
import api from "@/lib/api";

export async function getUserTodos() {
  try {
    const token = Cookies.get("token");
    const res = await api.get("/todo/get-user-todos", {
      headers: {
        Authorization: `Bearer ${token}`, // Attach the token here
      },
    });
    return res.data;

  } catch (error) {
    console.error(error?.response?.data || error.message);
    throw error;
  }
}
