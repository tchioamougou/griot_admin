<template>
  <div class="space-y-4 sm:space-y-6">
    <h3 class="text-lg sm:text-xl font-bold text-gray-800 flex items-center gap-2 sm:gap-3">
      <span class="text-xl sm:text-2xl">{{ icon }}</span>
      {{ title }}
    </h3>

    <div class="space-y-3 sm:space-y-4 pb-2">
      <InfoItem
        v-for="item in items"
        :key="item.label"
        :label="item.label"
        :value="item.value"
        :type="item.type"
        :icon="item.icon"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import InfoItem from './InfoItem.vue';
defineProps<{
  title: string;
  icon: string;
  items: Array<{
    label: string;
    value: any;
    type?: 'boolean' | 'date' | 'text';
    icon: string;
  }>;
}>();
</script>

