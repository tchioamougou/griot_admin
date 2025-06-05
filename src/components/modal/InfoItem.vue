<!-- Composant InfoItem -->
<template>
  <div class="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl hover:from-gray-100 hover:to-gray-200 transition-all duration-200 group">
    <div class="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-0">
      <span class="text-lg sm:text-xl">{{ icon }}</span>
      <span class="font-medium text-gray-700 text-sm sm:text-base">{{ label }}</span>
    </div>
    <div class="flex items-center gap-2 ml-6 sm:ml-0">
      <span
        v-if="type === 'boolean'"
        :class="[
          'px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium transition-colors duration-200',
          value ? 'bg-green-100 text-green-800 group-hover:bg-green-200' : 'bg-red-100 text-red-800 group-hover:bg-red-200'
        ]"
      >
        {{ value ? '✓ Activé' : '✗ Désactivé' }}
      </span>
      <span
        v-else
        class="text-gray-600 font-medium text-sm sm:text-base break-all"
      >
        {{ value }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  label: string;
  value: any;
  type?: 'boolean' | 'date' | 'text';
  icon: string;
}>();
</script>

<style scoped>
@keyframes scale-in {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.animate-scale-in {
  animation: scale-in 0.2s ease-out;
}

/* Scrollbar personnalisée */
.overflow-y-auto::-webkit-scrollbar {
  width: 6px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 3px;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 3px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}
</style>
