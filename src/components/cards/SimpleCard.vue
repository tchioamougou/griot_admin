<template>
  <div class="w-full max-w-xs bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-4 text-center">
    <h2 class="text-lg font-semibold text-gray-800 dark:text-white mb-2">{{ name }}</h2>
    <p class="text-3xl font-bold text-blue-600">{{ count }}</p>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  name: string
  count: number | null
}>()
</script>
