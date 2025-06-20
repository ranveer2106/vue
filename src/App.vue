<template>
  <div class="app-wrapper w-full min-h-screen flex flex-col">
    <div class="flex">

      <ThemeToggle />
    </div>
    <div>

      <RouterView />
    </div>
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router'
import ThemeToggle from './components/ThemeToggle.vue'
</script>

<style>
.app-wrapper {
  /* Remove min-height and padding from here, use Tailwind instead */
  /* min-height: 100vh; */
  /* padding: 1.5rem; */
  transition:
    background 0.3s,
    color 0.3s;
  /* background: #fff; */
  color: #181818;
  padding: 2rem 5rem;
}

html.dark .app-wrapper {
  background: #181818;
  color: #f8f8f8;
}
</style>
