import api from "@/lib/api";
import Cookies from "js-cookie";

export async function getTodoassignedtoUser() {

    try {

            const token = Cookies.get('token')
        
        const assignedTodos = await api.get("/todo/get-assigned-todos",{
           
        })

        return assignedTodos.data
        
    } catch (error) {
        console.log(error ? error.message : error)
        throw error ? error : error.message
        
    }

    
}