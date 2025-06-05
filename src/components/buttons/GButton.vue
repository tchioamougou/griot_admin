<template>
  <button
    :class="computedClasses"
    :disabled="disabled || loading"
    @click="handleClick"
  >
    <span v-if="loading" class="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
    <slot>{{ label }}</slot>
  </button>
</template>

<script lang="ts" setup>
import { computed, defineProps, defineEmits } from 'vue';

const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void;
}>();

const props = defineProps<{
  label?: string;
  type?: 'primary' | 'secondary' | 'danger';
  disabled?: boolean;
  loading?: boolean;
  customClass?: string;
}>();

const handleClick = (event: MouseEvent) => {
  if (!props.disabled && !props.loading) {
    emit('click', event);
  }
};

const baseClasses = 'inline-flex items-center px-4 py-2 rounded-lg font-semibold transition';

const variantClasses = computed(() => {
  switch (props.type) {
    case 'secondary':
      return 'bg-gray-500 text-white hover:bg-gray-600';
    case 'danger':
      return 'bg-red-600 text-white hover:bg-red-700';
    case 'primary':
    default:
      return 'bg-blue-600 text-white hover:bg-blue-700';
  }
});

const computedClasses = computed(() => {
  return [
    baseClasses,
    variantClasses.value,
    props.disabled || props.loading ? 'opacity-50 cursor-not-allowed' : '',
    props.customClass ?? '',
  ].join(' ');
});
</script>
