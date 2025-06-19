import { defineStore } from 'pinia'
import axios from 'axios'

export const useTodoStore = defineStore('todo', {
  state: () => ({
    todos: [],
    loading: false,
    error: null,
    searchQuery: '',
    filterStatus: 'all' 
  }),

  getters: {
    filteredTodos(state) {
      let filtered = [...state.todos]

      if (state.searchQuery) {
        filtered = filtered.filter(todo =>
          todo.title.toLowerCase().includes(state.searchQuery.toLowerCase())
        )
      }

      if (state.filterStatus === 'completed') {
        filtered = filtered.filter(todo => todo.completed)
      } else if (state.filterStatus === 'pending') {
        filtered = filtered.filter(todo => !todo.completed)
      }

      return filtered
    }
  },

  actions: {
    async fetchTodos() {
      this.loading = true
      this.error = null
      try {
        const res = await axios.get('https://jsonplaceholder.typicode.com/todos?_limit=20')
        this.todos = res.data
      } catch (err) {
        this.error = 'Failed to fetch todos.'
        console.error(err)
      } finally {
        this.loading = false
      }
    },

    async addTodo(title) {
      const newTodo = {
        title,
        completed: false,
        userId: 1
      }

      try {
        const res = await axios.post('https://jsonplaceholder.typicode.com/todos', newTodo)
        this.todos.unshift(res.data)
      } catch (err) {
        console.error('Failed to add todo:', err)
      }
    },

    async deleteTodo(todoId) {
      try {
        await axios.delete(`https://jsonplaceholder.typicode.com/todos/${todoId}`)
        this.todos = this.todos.filter(todo => todo.id !== todoId)
      } catch (err) {
        console.error('Failed to delete todo:', err)
      }
    },

    async updateTodo(todoId, updatedData) {
      try {
        const res = await axios.put(`https://jsonplaceholder.typicode.com/todos/${todoId}`, updatedData)
        const index = this.todos.findIndex(todo => todo.id === todoId)
        if (index !== -1) {
          this.todos[index] = res.data
        }
      } catch (err) {
        console.error('Failed to update todo:', err)
      }
    },

    async updateTodoStatus(todoId) {
      const index = this.todos.findIndex(todo => todo.id === todoId)
      if (index !== -1) {
        const todo = this.todos[index]
        todo.completed = !todo.completed

        const payload = {
          id: todo.id,
          title: todo.title,
          completed: todo.completed
        }

        try {
          const res = await axios.put(`https://jsonplaceholder.typicode.com/todos/${todoId}`, payload)


          console.log('Simulated update:', res.data)


        } catch (error) {
          console.error('PUT error:', error)
        }
      }
    },

    setSearchQuery(query) {
      this.searchQuery = query
    },

    setFilterStatus(status) {
      this.filterStatus = status
    }
  }
})
