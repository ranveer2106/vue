<template>
  <div class="app-wrapper">
    <ThemeToggle />
    <!-- <h1 class="text-2xl font-bold mt-4">Vue 3 + Manual Dark/Light Mode</h1> -->
    <!-- <p class="mt-2">Toggle the theme using the button above.</p> -->
    <RouterView/>
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router'
import ThemeToggle from './components/ThemeToggle.vue'
</script>

<style>
.app-wrapper {
  min-height: 100vh;
  padding: 1.5rem;
  transition: background 0.3s, color 0.3s;
  background: #fff;
  color: #181818;
}

/* Dark mode styles */
html.dark .app-wrapper {
  background: #181818;
  color: #f8f8f8;
}
</style>
