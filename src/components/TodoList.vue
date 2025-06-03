<template>
  <div class="p-4">
    <h2 class="text-2xl font-semibold mb-4">To-Do List</h2>

    <div v-if="todoStore.isLoading" class="text-gray-500">Loading...</div>
    <div v-else-if="todoStore.error" class="text-red-500">{{ todoStore.error }}</div>

    <div v-else>
      <!-- To-Do Items -->
      <TodoItem
        v-for="todo in todoStore.todos"
        :key="todo.id"
        :todo="todo"
        @edit="startEditing"
      />

      <!-- Edit Panel -->
      <div v-if="editingTodo" class="mt-6 p-4 bg-gray-100 rounded-lg shadow">
        <h3 class="text-lg font-semibold mb-2">Edit Task</h3>
        <input
          v-model="editedTitle"
          class="border border-gray-300 px-3 py-2 w-full rounded-md mb-3"
          placeholder="Edit to-do title"
        />
        <div class="flex gap-2">
          <button
            @click="saveTodo"
            class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Save
          </button>
          <button
            @click="cancelEdit"
            class="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useTodoStore } from '../store/todos'
import TodoItem from './TodoItem.vue'

const todoStore = useTodoStore()
onMounted(() => {
  todoStore.fetchTodos()
})

const editingTodo = ref(null)
const editedTitle = ref('')

const startEditing = (todo) => {
  editingTodo.value = todo
  editedTitle.value = todo.title
}

const saveTodo = () => {
  if (editingTodo.value) {
    todoStore.updateTodo(editingTodo.value.id, editedTitle.value)
    editingTodo.value = null
    editedTitle.value = ''
  }
}

const cancelEdit = () => {
  editingTodo.value = null
  editedTitle.value = ''
}
</script>

<style scoped>
/* Optional: Add extra styling here */
</style>
