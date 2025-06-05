<template>
  <div class="flex justify-between border-b py-2 text-sm text-gray-700">
    <span class="font-medium text-gray-600">{{ label }}</span>
    <span>{{ value || '—' }}</span>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  label: string;
  value: string | number | null;
}>();
</script>
