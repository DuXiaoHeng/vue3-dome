import {saveTodos, generateId} from "../util/todoStorage"
import { ref , watchEffect} from "vue"

export default function(todoListRef){
    const newTodoRef = ref('');
    watchEffect(() => {
        console.log(11, newTodoRef.value)
    })
    const addTodos = () =>{
        const value = newTodoRef.value &&  newTodoRef.value.trim();
        if(!value){
            return;
        }
        const todos = {
            id: generateId(),
            title: value,
            isComplete: false,
        }
        todoListRef.value.push(todos);
        saveTodos(todoListRef.value).then(res => {
            newTodoRef.value = '';
            console.log('保存成功！')
        })
    }
    return {
        newTodoRef,
        addTodos,
    }
}