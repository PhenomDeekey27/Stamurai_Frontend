import Cookies from "js-cookie";
import api from "@/lib/api";
export async function getUserTodos() {
    try {
        const token = Cookies.get("token")
        const res = await api.get("/todo/get-user-todos",{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        return res.data
        
    } catch (error) {
        console.error(error ? error : error.data
          
        )

        throw error

        
    }
    
}