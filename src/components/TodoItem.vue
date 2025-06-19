<template>
  <div class="flex justify-between items-center bg-white shadow p-3 rounded mb-2">
    <div class="flex gap-2 items-center">
      <input
        type="checkbox"
        :checked="todo.completed"
        @change="toggle(todo.id)"
        class="w-4 h-4"
      />
      <span :class="todo.completed ? 'line-through text-gray-500' : ''">
        {{ todo.title }}
      </span>
    </div>
    <div class="flex gap-2">
      <button @click="emit('edit', todo)" class="text-blue-600 hover:underline">
        Edit
      </button>
      <button @click="remove(todo.id)" class="text-red-500 hover:underline">
        Delete
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps(['todo'])
const emit = defineEmits(['edit'])

import { useTodoStore } from '../store/todos'
const store = useTodoStore()

const toggle = (id) => {
  store.updateTodoStatus(id)
}

const remove = (id) => {
  store.deleteTodo(id)
}
</script>


