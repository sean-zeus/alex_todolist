import Vue from 'vue'
import Vuex from 'vuex'
import LocalStorage from '../modules/LocalStorage'

Vue.use(Vuex)

const localStorage = LocalStorage('todo-vue')

export default new Vuex.Store({
  state: {
    // todos: [{ "content": 123, done: false }, { "content": 456, done: true }, { "content": 789, done: false }]
    todos: []
  },
  getters: {
    list (state) {
      return state.todos.map((todo, index) => {
        return {
          tId: index,
          todo
        }
      })
    },
    // filterList (state, getters) {
    filterList: (state, getters) => (filter) => {
      let status = null
      switch (filter) {
        case 'all':
          return getters.list
        case 'active':
          status = false
          break
        case 'done':
          status = true
          break
      }
      return getters.list.filter((todo) => { return todo.todo.done === status })
    }
  },
  mutations: {
    SET_TODOS (state, todos) {
      state.todos = todos
    }
  },
  actions: {
    CREATE_TODOS ({ commit }, { todo }) {
      // 1. post  //API axios.post('')
      const todos = localStorage.load()
      todos.push(todo)
      localStorage.save(todos)
      // 2. commit mutation
      commit('SET_TODOS', todos)
      // 3. return
      return {
        tId: todos.length - 1,
        todo
      }
    },
    READ_TODOS ({ commit }) {
      // 1. load //API axios.get('')
      const todos = localStorage.load()
      // 2. commit mutation
      commit('SET_TODOS', todos)
      // 3. return
      return {
        todos
      }
    },
    UPDATE_TODOS_DONE ({ commit }, { tId, done }) {
      // 1. update  //API axios.patch('')
      const todos = localStorage.load()
      todos[tId].done = done // 只更新某屬性的寫法
      localStorage.save(todos)
      // 2. commit mutation
      commit('SET_TODOS', todos)
      // 3. return
      return {
        tId,
        todo: todos[tId] // 回應更新後的寫法
      }
    },
    UPDATE_TODOS ({ commit, state }, { tId, editTodo }) {
      if (state.todos[tId].content === editTodo.content) return
      // 1. update  //API axios.patch('')
      const todos = localStorage.load()
      todos.splice(tId, 1, editTodo) // 整個更新的寫法
      localStorage.save(todos)
      // 2. commit mutation
      commit('SET_TODOS', todos)
      // 3. return
      return {
        tId,
        todo: editTodo
      }
    },
    DELETE_TODOS ({ commit }, { tId }) {
      // 1. delete  //API axios.delete('')
      const todos = localStorage.load()
      const todo = todos.splice(tId, 1)[0]
      localStorage.save(todos)
      // 2. commit mutation
      commit('SET_TODOS', todos)
      // 3. return
      return {
        tId: null,
        todo
      }
    },
    CLEAR_TODOS ({ commit }) {
      // 1. delete all  //API axios.delete('')
      const todos = []
      localStorage.save(todos)
      // 2. commit mutation
      commit('SET_TODOS', todos)
      // 3. return
      return {
        todos
      }
    }
  }
})
