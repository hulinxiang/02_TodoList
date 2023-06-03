<template>
  <div class="todo-container">
    <div class="todo-wrap">
      <Header :addTodo="addTodo" />
      <List :todos="todos" :deleteTodo="deleteTodo" :updateTodo="updateTodo" />
      <Footer
        :todos="todos"
        :checkAll="checkAll"
        :clearAllCompletedTodos="clearAllCompletedTodos"
      />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs, watch, onMounted } from "vue";
//Introduce child components
import Header from "./components/Header.vue";
import List from "./components/List.vue";
import Footer from "./components/Footer.vue";
import { Todo } from "./types/todo";
import { saveTodos, readTodos } from "./utils/localStorageUtils";
export default defineComponent({
  name: "App",
  //Registering Components
  components: {
    Header,
    List,
    Footer,
  },
  //Data should be saved in array. Each data in the array is of type object. Each object consists of 3 properties(id, title, isCompleted)
  //Define the array in App.vue
  setup() {
    const state = reactive<{ todos: Todo[] }>({
      todos: [],
    });
    onMounted(() => {
      setTimeout(() => {
        state.todos = readTodos();
      }, 500);
    });
    //Method for adding data
    const addTodo = (todo: Todo) => {
      state.todos.unshift(todo);
    };
    const deleteTodo = (index: number) => {
      state.todos.splice(index, 1);
    };
    const updateTodo = (todo: Todo, isCompleted: boolean) => {
      todo.isCompleted = isCompleted;
    };
    const checkAll = (isCompleted: boolean) => {
      state.todos.forEach((todo) => {
        todo.isCompleted = isCompleted;
      });
    };
    const clearAllCompletedTodos = () => {
      state.todos = state.todos.filter((todo) => !todo.isCompleted);
    };
    watch(() => state.todos, saveTodos, { deep: true });
    return {
      ...toRefs(state),
      addTodo,
      deleteTodo,
      updateTodo,
      checkAll,
      clearAllCompletedTodos,
    };
  },
});
</script>
<style scoped>
/*app*/
.todo-container {
  width: 600px;
  margin: 0 auto;
}
.todo-container .todo-wrap {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}
</style>
