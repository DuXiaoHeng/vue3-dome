import {saveTodos} from "../util/todoStorage"
import {ref} from "vue";

export default function (todoListRef){
    const editingTodoRef = ref(null);
    let originTodoTitle = ''; 
    const onCompleteTodo = () => {
        saveTodos(todoListRef.value).then(res =>{
            console.log('编辑已经保存111！')
        })
    }
    const onEditTodo = (todo) => {
        editingTodoRef.value = todo;
        originTodoTitle = todo.title;
    }
    const doneEdit = () => {
        editingTodoRef.value = null;
        saveTodos(todoListRef.value).then(res =>{
            console.log('编辑已经保存a！')
        })
    }
    const cancelEdit = () => {
        editingTodoRef.value.title = originTodoTitle;
        editingTodoRef.value = null;
    }
    return {
        onCompleteTodo,
        onEditTodo,
        doneEdit,
        cancelEdit,
        editingTodoRef,
    }
}