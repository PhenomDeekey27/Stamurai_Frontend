import api from "@/lib/api";
import Cookies from "js-cookie";

export async function getOverdueTodos(){
    try {
        const token = Cookies.get('token')
         const overdueTodos = await api.get("/todo/get-overdue-todos",{
            headers:{
                Authorization:`Bearer : ${token}`
            }
         })

         return overdueTodos.data
        
    } catch (error) {
        console.error(error ? error : error.message)
        throw error ? error : error.message
        
    }
}