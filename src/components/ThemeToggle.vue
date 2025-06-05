<!-- src/components/ThemeToggle.vue -->
<template>
  <button
    @click="toggleTheme"
    class="p-2 text-sm font-semibold rounded bg-gray-300 dark:bg-gray-700 dark:text-white"
  >
    {{ isDark ? '🌙 Dark Mode' : '☀️ Light Mode' }}
  </button>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const isDark = ref(false)

onMounted(() => {
  isDark.value = document.documentElement.classList.contains('dark')
})

function toggleTheme() {
  isDark.value = !isDark.value
  document.documentElement.classList.toggle('dark', isDark.value)
}
</script>
