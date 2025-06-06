<template>
  <div class="flex items-center space-x-1">
    <template v-for="i in 5" :key="i">
      <svg
        v-if="i <= Math.floor(rating)"
        :style="starStyle"
        class="text-yellow-400 w-4 h-4"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path
          d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.945a1 1 0 00.95.69h4.153c.969 0 1.371 1.24.588 1.81l-3.362 2.448a1 1 0 00-.364 1.118l1.286 3.945c.3.921-.755 1.688-1.54 1.118l-3.362-2.448a1 1 0 00-1.176 0l-3.362 2.448c-.784.57-1.838-.197-1.539-1.118l1.286-3.945a1 1 0 00-.364-1.118L2.072 9.372c-.783-.57-.38-1.81.588-1.81h4.153a1 1 0 00.95-.69l1.286-3.945z"
        />
      </svg>
      <svg
        v-else
        :style="starStyle"
        class="text-gray-300 w-4 h-4"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path
          d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.945a1 1 0 00.95.69h4.153c.969 0 1.371 1.24.588 1.81l-3.362 2.448a1 1 0 00-.364 1.118l1.286 3.945c.3.921-.755 1.688-1.54 1.118l-3.362-2.448a1 1 0 00-1.176 0l-3.362 2.448c-.784.57-1.838-.197-1.539-1.118l1.286-3.945a1 1 0 00-.364-1.118L2.072 9.372c-.783-.57-.38-1.81.588-1.81h4.153a1 1 0 00.95-.69l1.286-3.945z"
        />
      </svg>
    </template>
    <slot name="message"></slot>
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue'
import type { StyleValue } from 'vue'

const props = defineProps<{
  rating: number
  starStyle?: StyleValue
}>()
</script>
