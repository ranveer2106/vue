<template>
  <button @click="toggleTheme" class="theme-toggle-btn">
    {{ isDark ? '🌙 Dark Mode' : '☀️ Light Mode' }}
  </button>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const isDark = ref(false)

function setHtmlClass(dark) {
  if (dark) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}

onMounted(() => {
  const stored = localStorage.getItem('theme')
  if (stored === 'dark') {
    isDark.value = true
  } else if (stored === 'light') {
    isDark.value = false
  } else {
    isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches
  }
  setHtmlClass(isDark.value)
})

function toggleTheme() {
  isDark.value = !isDark.value
  setHtmlClass(isDark.value)
  localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
}
</script>

<style scoped>
.theme-toggle-btn {
  padding: 0.5rem 1rem;
  font-weight: bold;
  border-radius: 0.375rem;
  background: #e5e7eb;
  color: #222;
  border: none;
  cursor: pointer;
  transition: background 0.3s;
}
.theme-toggle-btn:hover {
  background: #d1d5db;
}
</style>
