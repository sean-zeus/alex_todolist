import Vue from 'vue'
import Vuex from 'vuex'
import LocalStorage from '../modules/LocalStorage'

Vue.use(Vuex)

const STORE = LocalStorage('todo-vue')

export default new Vuex.Store({
  state: {
    todos: [{ content: 123, done: false }, { content: 456, done: false }, { content: 789, done: false }]
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
      return getters.list.filter(todo => { return todo.todo.done === status })
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
      const todos = STORE.load()
      todos.push(todo)
      STORE.save(todos)
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
      const todos = STORE.load()
      // 2. commit mutation
      commit('SET_TODOS', todos)
      // 3. return
      return {
        todos
      }
    },
    UPDATE_TODOS ({ commit }, { tId, todo }) {
      // 1. update  //API axios.patch('')
      const todos = STORE.load()

      todos.splice(tId, 1, todo) // 整個更新的寫法
      // todos[tId].txt = todo.txt // 只更新某屬性的寫法

      STORE.save(todos)
      // 2. commit mutation
      commit('SET_TODOS', todos)
      // 3. return
      return {
        tId,
        // todo, todos[tId], //回應更新後的寫法
        todo
      }
    },
    DELETE_TODOS ({ commit }, { tId }) {
      // 1. delete  //API axios.delete('')
      const todos = STORE.load()
      const todo = todos.splice(tId, 1)[0]
      STORE.save(todos)
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
      STORE.save(todos)
      // 2. commit mutation
      commit('SET_TODOS', todos)
      // 3. return
      return {
        todos
      }
    }
  }
})
