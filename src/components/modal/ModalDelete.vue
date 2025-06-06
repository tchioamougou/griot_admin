<template>
  <transition name="fade">
    <div
      v-if="isOpen"
      class="fixed inset-0 modal z-99999 flex items-center justify-center px-4 py-6 bg-black/40 backdrop-blur-sm"
    >
      <div
        class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl max-w-md w-full p-6 relative"
        @click.stop
      >
        <!-- Icon Slot or Default -->
        <div class="flex justify-center mb-4">
          <slot name="icon">
            <div class="w-16 h-16 flex items-center justify-center rounded-full bg-red-100">
              <svg class="w-12 h-12 text-red-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
            </div>
          </slot>
        </div>

        <!-- Title -->
        <h2 class="text-xl font-semibold text-center text-gray-800 dark:text-white mb-2">
          {{ title }}
        </h2>

        <!-- Message -->
        <p class="text-sm text-gray-600 dark:text-gray-300 text-center mb-6">
          {{ message }}
        </p>

        <!-- Actions -->
        <div class="flex justify-center gap-4">
          <button
            @click="$emit('confirm')"
            :disabled="isLoading"
            class="bg-red-500 hover:bg-red-700 text-white px-5 py-2 rounded-lg font-medium flex items-center justify-center transition"
          >
            <span v-if="!isLoading">{{ confirmLabel }}</span>
            <span v-else class="flex items-center gap-2">
              <Spinner class="w-4 h-4" />
              {{ processingLabel }}
            </span>
          </button>
          <button
            @click="$emit('cancel')"
            class="bg-gray-100 hover:bg-gray-200 text-gray-700 px-5 py-2 rounded-lg font-medium border transition"
          >
            {{ cancelLabel }}
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import Spinner from '@/components/spinner/Spinner.vue'

defineProps<{
  isOpen: boolean
  isLoading?: boolean
  title?: string
  message?: string
  confirmLabel?: string
  cancelLabel?: string
  processingLabel?: string
}>()

defineEmits<{
  (e: 'confirm'): void
  (e: 'cancel'): void
}>()
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
