import api from "@/lib/api";


export async function createTodo(data){
    try {
        
        const createTodo = await api.post("/todo/create-todo",{
            data
        })

        return createTodo.data


        
    } catch (error) {  
        console.error(error ? error : error.message)
        throw error ? error : error.message

        
    }

}