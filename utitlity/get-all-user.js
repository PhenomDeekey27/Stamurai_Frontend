import api from "@/lib/api";

export async function fetchAllUsers(){
    try {
        const getAllUsers = await api.get("/todo/get-all-user")
        return getAllUsers.data
        
    } catch (error) {
        return error ? error : error.message
        
    }

}