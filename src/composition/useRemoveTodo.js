import {saveTodos} from "../util/todoStorage"

export default function (todoListRef){
    const removeTodos = (todos) =>{
        if(!todos){
            return;
        }
        todoListRef.value = Array.isArray(todos)
            ? todoListRef.value.filter(item => todos.every(tode => tode.id !== item.id))
            : todoListRef.value.filter(item => todos.id !== item.id);
        saveTodos(todoListRef.value).then(res =>{
            console.log('删除成功！')
        })
    }
    return {
        removeTodos
    }
}