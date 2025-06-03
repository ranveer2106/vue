import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isAuthenticated: localStorage.getItem('loggedIn') === 'true',
  }),

  actions: {
    login(username, password) {
      if (username === 'user@example.com' && password === 'password123') {
        this.isAuthenticated = true
        localStorage.setItem('loggedIn', 'true')
        return true
      }
      return false
    },

    logout() {
      this.isAuthenticated = false
      localStorage.removeItem('loggedIn')
    }
  }
})
