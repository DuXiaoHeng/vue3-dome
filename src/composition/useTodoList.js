import { fetchTodos } from "../util/todoStorage"
import { ref, watchEffect, reactive, isReactive, toRefs} from 'vue'

export default function (){
    const todoListRef = ref([]);
    const initTodoList = () =>{
        return fetchTodos().then(res => {
            todoListRef.value.push(...(res || []));
        })
    }
    initTodoList();
    watchEffect(() =>{
        //改变 todoListRef中第一项的isComplete值

        //会触发watchEffect
        // console.log(todoListRef.value[0].isComplete)

        //不会触发watchEffect
        // console.log(todoListRef.value)

        //会触发watchEffect
        // console.log(JSON.stringify(todoListRef.value));

        //总结： 只会收集当前依赖，不会deep收集
    })

    return {
        todoListRef,
    }
}


