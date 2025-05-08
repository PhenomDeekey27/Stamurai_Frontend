import api from "@/lib/api";

import Cookies from "js-cookie";

export async function getTodocreatedByUser() {

    try {
        const token = Cookies.get('token')
        const todos = await api.get("/todo/get-my-todos",{
            headers:{
                    Authorization:`Bearer ${token}`
            }
        })

        return todos.data
        
    } catch (error) {
        console.error(error ? error : error.message)
        throw error
        
    }
    
}