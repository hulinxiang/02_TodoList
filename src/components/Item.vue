<template>
  <li
    @mouseenter="mouseHandler(true)"
    @mouseleave="mouseHandler(false)"
    :style="{ backgroundColor: bgcolor, color: mycolor }"
  >
    <label>
      <input type="checkbox" v-model="isComplete" />
      <span>{{ todo.title }}</span>
    </label>
    <button class="btn btn-danger" v-show="isShow" @click="delTodo">
      删除
    </button>
  </li>
</template>
<script lang="ts">
import { Todo } from "@/types/todo";
import { defineComponent, ref, computed } from "vue";
export default defineComponent({
  name: "Item",
  props: {
    todo: {
      type: Object as () => Todo,
      required: true,
    },
    deleteTodo: {
      type: Function,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
    updateTodo: {
      type: Function,
      required: true,
    },
  },

  setup(props) {
    const bgcolor = ref("white");
    const mycolor = ref("black");
    const isShow = ref(false);
    const mouseHandler = (flag: boolean) => {
      if (flag) {
        bgcolor.value = "pink";
        mycolor.value = "green";
        isShow.value = true;
      } else {
        bgcolor.value = "white";
        mycolor.value = "black";
        isShow.value = false;
      }
    };
    const delTodo = () => {
      if (window.confirm("确认要删除吗")) {
        props.deleteTodo(props.index);
      }
    };
    const isComplete = computed({
      get() {
        return props.todo.isCompleted;
      },
      set(value) {
        props.updateTodo(props.todo, value);
      },
    });
    return {
      mouseHandler,
      bgcolor,
      mycolor,
      isShow,
      delTodo,
      isComplete,
    };
  },
});
</script>
<style scoped>
/*item*/
li {
  list-style: none;
  height: 36px;
  line-height: 36px;
  padding: 0 5px;
  border-bottom: 1px solid #ddd;
}

li label {
  float: left;
  cursor: pointer;
}

li label li input {
  vertical-align: middle;
  margin-right: 6px;
  position: relative;
  top: -1px;
}

li button {
  float: right;
  /* display: none; */
  margin-top: 3px;
}

li:before {
  content: initial;
}

li:last-child {
  border-bottom: none;
}
</style>
