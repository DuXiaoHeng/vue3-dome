import { ref, computed, onMounted, onUnmounted } from 'vue';
const filter = (todoList, key = 'all') => {
    if(key == 'all'){
        return todoList;
    }
    if(key == 'active'){
        return todoList.filter(todo => !todo.isComplete);
    }
    if(key == 'completed'){
        return todoList.filter(todo => todo.isComplete);
    }
}
const validHash = ["all", "active", "completed"];
export default function(todoListRef){
    const curFilterKeyRef = ref('all');

    const onHashChange = () => {
        const hash = window.location.hash.slice(1);
        if(validHash.includes(hash)){
            curFilterKeyRef.value = hash;
        }else{
            window.location.hash = 'all';
        }
    }
    onHashChange();

    const filteredTodoListRef = computed(() =>{
        return filter(todoListRef.value, curFilterKeyRef.value);
    })

    onMounted(() => {
       window.addEventListener('hashchange', onHashChange);
    })
    onUnmounted(() => {
       winjdow.removeEventListener('hashchange', onHashChange);
    })

    return {
        curFilterKeyRef,
        filteredTodoListRef,
    }
}