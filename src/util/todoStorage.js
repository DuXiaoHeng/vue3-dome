const LOCAL_KEY = "todomvc";

/**
 * 生成一个任务的唯一编号，时间戳+4位随机数
 */
export function generateId() {
  return Date.now() + Math.random().toString(16).substr(2, 4);
}

/**
 * 获取目前所有的任务
 */
export function fetchTodos() {
  return new Promise((resolve, reject) => {
    const result = localStorage.getItem(LOCAL_KEY);
    if (!result) {
      return resolve([]); 
    }
    resolve(JSON.parse(result));
  })
}

/**
 * 保存所有任务
 * @param {*} todos 任务列表
 */
export function saveTodos(todos) {
  return new Promise((resolve, reject) => {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(todos));
    resolve({code: 0})
  })
  
}

