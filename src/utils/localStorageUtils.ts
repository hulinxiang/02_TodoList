import { Todo } from "@/types/todo";
//Save data in the browser cache
export function saveTodos(todos: Todo[]) {
  localStorage.setItem("todos_key", JSON.stringify(todos));
}
//Read data in the browser cache
export function readTodos(): Todo[] {
  return JSON.parse(localStorage.getItem("todos_key") || "[]");
}
