<template>
  <div class="app-wrapper !w-full">
    <!-- <div class="p-8 bg-green-300 text-center text-xl font-bold rounded">
      If this box is green with padding, Tailwind CSS is working!
    </div> -->

    <ThemeToggle />
    <RouterView />
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
  transition:
    background 0.3s,
    color 0.3s;
  /* background: #fff; */
  color: #181818;
}

html.dark .app-wrapper {
  background: #181818;
  color: #f8f8f8;
}
</style>
