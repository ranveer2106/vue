<template>
  <div class="p-6 max-w-3xl mx-auto">
    <h1 class="text-2xl font-bold mb-4">To-Do Dashboard</h1>

    <div class="mb-4 flex gap-2">
      <input
        v-model="title"
        @keyup.enter="add"
        type="text"
        placeholder="Add new to-do"
        class="border p-2 rounded w-full"
      />
      <button @click="add" class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Add</button>
    </div>

    <div class="flex gap-2 mb-4">
      <input
        v-model="store.searchQuery"
        type="text"
        placeholder="Search..."
        class="border p-2 rounded w-full"
      />
      <select v-model="store.filterStatus" class="border p-2 rounded">
        <option value="all">All</option>
        <option value="completed">Completed</option>
        <option value="pending">Pending</option>
      </select>
    </div>

    <div v-if="store.loading" class="text-center">Loading...</div>
    <div v-else>
      <TodoItem
        v-for="todo in store.filteredTodos"
        :key="todo.id"
        :todo="todo"
        @edit="startEdit"
      />
    </div>

    <div v-if="editing" class="fixed bottom-6 right-6 bg-white p-4 shadow rounded w-72">
      <h2 class="font-bold mb-2">Edit To-Do</h2>
      <input v-model="editTitle" type="text" class="border p-2 rounded w-full mb-2" />
      <button @click="saveEdit" class="bg-blue-500 text-white px-4 py-1 rounded">Save</button>
      <button @click="cancelEdit" class="ml-2 text-gray-500">Cancel</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useTodoStore } from '../store/todos'
import TodoItem from '../components/TodoItem.vue'



const store = useTodoStore()
const title = ref('')
const editing = ref(false)
const editId = ref(null)
const editTitle = ref('')

onMounted(() => {
  store.fetchTodos()
})

function add() {
  if (title.value.trim()) {
    store.addTodo(title.value)
    title.value = ''
  }
}



function startEdit(todo) {
  editing.value = true
  editId.value = todo.id
  editTitle.value = todo.title
}


function saveEdit() {
  store.updateTodo(editId.value, { title: editTitle.value })  
  cancelEdit()
}

function cancelEdit() {
  editing.value = false
  editId.value = null
  editTitle.value = ''
}
</script>
