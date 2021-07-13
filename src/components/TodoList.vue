<template>
  <div id="app">
    <section class="todoapp">
      <header class="header">
        <h1>todos1</h1>
        <input
          class="new-todo"
          autofocus=""
          autocomplete="off"
          v-model="newTodoRef"
          @keyup.enter="addTodos"
          placeholder="What needs to be done?"
        />
      </header>
      <section class="main">
        <input id="toggle-all" class="toggle-all" type="checkbox" />
        <label for="toggle-all">Mark all as complete</label>
        <ul class="todo-list">
          <li 
            v-for="todo in filteredTodoListRef" 
            class="todo" 
            :class="{
              completed: todo.isComplete,
              editing: editingTodoRef === todo,
            }"
            :key="todo.id" 
          >
            <div class="view">
              <input class="toggle" type="checkbox" v-model="todo.isComplete" @change="onCompleteTodo"/>
              <label @dblclick="onEditTodo(todo)">{{todo.title}}</label>
              <button class="destroy" @click="removeTodos(todo)"></button>
            </div>
            <input 
              class="edit" 
              type="text" 
              v-model="todo.title" 
              @blur="doneEdit(todo)"
              @keyup.enter="doneEdit(todo)"
              @keyup.escape="cancelEdit(todo)"
              />
          </li>
        </ul>
      </section>
      <footer class="footer">
        <span class="todo-count">
          <strong>3</strong>
          <span>items left</span>
        </span>
        <ul class="filters">
          <li><a href="#all" :class="curFilterKeyRef=='all'?'selected':''">All</a></li>
          <li><a href="#active" :class="curFilterKeyRef=='active'?'selected':''" >Active</a></li>
          <li><a href="#completed" :class="curFilterKeyRef=='completed'?'selected':''">Completed</a></li>
        </ul>
        <button class="clear-completed" style="display: none">
          Clear completed
        </button>
      </footer>
    </section>
  </div>
</template>

<script>
import useTodoList from "../composition/useTodoList";
import useNewTodo from "../composition/useNewTodo";
import useRemoveTodo from "../composition/useRemoveTodo";
import useEditTodo from "../composition/useEditTodo";
import useFilterTodo from "../composition/useFilterTodo";
export default {
  setup() {
    const {todoListRef} = useTodoList();
    const {newTodoRef, addTodos} = useNewTodo(todoListRef);
    const { removeTodos } = useRemoveTodo(todoListRef);
    return {
      todoListRef,
      newTodoRef,
      addTodos,
      removeTodos,
      ...useEditTodo(todoListRef),
      ...useFilterTodo(todoListRef)
    }
  }
};
</script>
