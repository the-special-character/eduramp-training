"use server"
import axios from "axios";
import { revalidatePath } from "next/cache";




export async function addTodoAction(prevState, formData) {
  try {
    // make api call to check duplicate entry
    const todoText = String(formData.get("todoText") ?? "").trim();

    if(!todoText) {
      return { success: false, error: 'Todo text is required', values: { todoText }}
    }

    if(todoText.length > 100) {
      return { success: false, error: 'Todo text length must be 100 characters or less', values: { todoText }}
    }

    const { data } = await axios.get(`http://localhost:8000/todoList?text=${todoText}`)    
    if(data.length > 0) {
      return { success: false, error: 'text is already exist', values: { todoText }}
    }

    await axios.post("http://localhost:8000/todoList", {
      text: todoText,
      isDone: false,
    });
    revalidatePath("/")
  } catch (error) {
    return { success: false, error: error.message, values: { todoText: '' }}
  }
}

export async function updateTodoAction(todoData, formData) {
  try {
    // make api call to check duplicate entry
    
    const { data } = await axios.put(`http://localhost:8000/todoList/${todoData.id}`, {
      ...todoData,
      isDone: !todoData.isDone
    });

    console.log(data);
    
    revalidatePath("/")
  } catch (error) {
    console.log(error);
    
  }
}

export async function deleteTodoAction(id, formData) {
  try {
    // make api call to check duplicate entry
    const response = await axios.delete(`http://localhost:8000/todoList/${id}`);
    revalidatePath("/")
  } catch (error) {
    
  }
}
