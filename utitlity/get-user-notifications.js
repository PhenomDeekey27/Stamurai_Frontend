import api from "@/lib/api";

export async function getNofications(id) {
    try {
            const res= await api.get(`/notifications/getNotifications/${id}`)
            return res.data
        
    } catch (error) {
        return error ? error : error.message
        
    }

    
}