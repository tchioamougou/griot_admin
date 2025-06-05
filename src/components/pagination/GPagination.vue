<template>
  <div class="flex justify-center items-center gap-2 mt-4">
    <button
      @click="changePage(currentPage - 1)"
      :disabled="currentPage <= 1"
      class="px-3 py-1 rounded border text-sm font-medium bg-gray-100 dark:bg-gray-800 dark:text-white disabled:opacity-50"
    >
      Prev
    </button>

    <template v-for="page in totalPage" :key="page">
      <button
        @click="changePage(page)"
        :class="[
          'px-3 py-1 rounded border text-sm font-medium',
          page === currentPage
            ? 'bg-indigo-500 text-white'
            : 'bg-white dark:bg-gray-700 dark:text-white'
        ]"
      >
        {{ page }}
      </button>
    </template>

    <button
      @click="changePage(currentPage + 1)"
      :disabled="currentPage >= totalPage"
      class="px-3 py-1 rounded border text-sm font-medium bg-gray-100 dark:bg-gray-800 dark:text-white disabled:opacity-50"
    >
      Next
    </button>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { defineProps, defineEmits } from 'vue'

const props = defineProps<{
  modelValue: number
  totalPage: number
}>()

const emit = defineEmits(['update:modelValue'])

const currentPage = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
})

function changePage(page: number) {
  if (page >= 1 && page <= props.totalPage) {
    currentPage.value = page
    console.log('Page changée à', page)
  }
}
</script>
