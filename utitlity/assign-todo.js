import api from "@/lib/api";


export async function assignTodoUser(todoId,userId) {
    try {
        const assignTodo = await api.put(`/todo/assign-todo/${todoId}`,{
            assignedTo:userId
        })

        return assignTodo.data


        
    } catch (error) {
        return error ? error : error.message
        
    }

    
} 