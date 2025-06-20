<template>
  <button
    @click="toggleTheme"
    class="p-2 rounded font-semibold bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-100 transition-colors duration-300"
  >
    {{ isDark ? '🌙 Dark Mode' : '☀️ Light Mode' }}
  </button>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const isDark = ref(false)

function setHtmlClass(dark) {
  document.documentElement.classList.toggle('dark', dark)
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
