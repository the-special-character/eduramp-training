"use server"
import axios from "axios";
import { revalidatePath } from "next/cache";




export async function addTodoAction(formData) {
  try {
    // make api call to check duplicate entry
    const todoText = String(formData.get("todoText") ?? "").trim();
    const response = await axios.post("", {
      text: todoText,
      isDone: false,
    });
    revalidatePath("/")
  } catch (error) {

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
