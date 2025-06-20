<template>
  <div class="flex justify-center items-center h-screen bg-gray-100">
    <form @submit.prevent="handleLogin" class="bg-white p-6 rounded-lg shadow-md w-80 space-y-4">
      <h2 class="text-xl font-bold text-center">Login</h2>

      <div class="flex logins">
        <div class="logininp">
          <input
            v-model="email"
            type="email"
            placeholder="Email"
            class="w-full border p-4 inputs"
          />
        </div>
        <div class="logininp">
          <input
            v-model="password"
            type="password"
            placeholder="Password"
            class="w-full border p-4 rounded inputs"
          />
        </div>
      </div>
      <button class="loginbtn">Login</button>
      <p v-if="error" class="text-red-500 text-sm text-center">Invalid credentials</p>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../store/auth'

const email = ref('')
const password = ref('')
const error = ref(false)
const auth = useAuthStore()
const router = useRouter()

function handleLogin() {
  if (auth.login(email.value, password.value)) {
    router.push('/dashboard')
  } else {
    error.value = true
  }
}
</script>
