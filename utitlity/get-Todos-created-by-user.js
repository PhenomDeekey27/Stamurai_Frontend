import api from "@/lib/api";
import Cookies from "js-cookie";

export async function getTodocreatedByUser() {
  try {
    const token = Cookies.get('token');  // Get the token from cookies
    const response = await api.get("/todo/get-my-todos", {
      headers: {
        Authorization: `Bearer ${token}`,  // Attach the token here
      },
    });

    return response.data;  // Return the data from the response

  } catch (error) {
    console.error(error ? error : error.message);
    throw error;  // Rethrow the error to be handled by the calling function
  }
}
