<template>
  <div class="flex items-center space-x-4 cursor-pointer" @click="$emit('click')">
    <div
      v-if="img"
      class="w-14 h-14 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center"
    >
      <img :src="img" alt="Avatar" class="w-full h-full object-cover" />
    </div>
    <div
      v-else
      class="w-14 h-14 rounded-full bg-blue-500 text-white flex items-center justify-center text-lg font-semibold"
    >
      {{ initials }}
    </div>
    <div>
      <h3 class="text-base font-semibold text-gray-900">{{ title || 'Nom inconnu' }}</h3>
      <p class="text-sm text-gray-500">{{ subTitle || 'Aucune description' }}</p>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  img: String,
  title: String,
  subTitle: {
    type: String,
    default: '',
  },
});

// Extraire les initiales du titre
const initials = computed(() => {
  if (!props.title) return '?';
  const names = props.title.split(' ');
  const initials = names.slice(0, 2).map(n => n[0]?.toUpperCase()).join('');
  return initials || '?';
});
</script>

<style scoped>

</style>
