import api from "@/lib/api";

export async function getCurrentUser() {
    try {

        const res = await api.get("/auth/currentUser")
        console.log(res.data,"util-my-todo")
    

        return res.data
        
    } catch (error) {
        return error ? error : error.message
        
    }
    
}