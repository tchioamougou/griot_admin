<template>
  <div :class="[
    'relative overflow-hidden rounded-2xl p-4 sm:p-6 transition-all duration-300 hover:scale-105 hover:shadow-lg group',
    `bg-gradient-to-br ${bgGradient} border border-gray-200`
  ]">
    <div class="flex items-center justify-between mb-3">
      <h3 :class="['font-semibold text-sm sm:text-base', textColor]">{{ title }}</h3>
      <div :class="[
        'w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-lg sm:text-xl',
        `bg-gradient-to-br ${gradient} shadow-lg`
      ]">
        {{ icon }}
      </div>
    </div>
    <div class="flex items-center justify-between">
      <p :class="['font-bold text-lg sm:text-2xl truncate', textColor]">{{ value }}</p>
      <button
        v-if="copyable"
        @click="copyToClipboard(value)"
        class="opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-2 hover:bg-white/50 rounded-lg"
        title="Copier"
      >
        📋
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
  value: string;
  icon: string;
  gradient: string;
  bgGradient: string;
  textColor: string;
  copyable?: boolean;
}>();

const copyToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
    // Vous pouvez ajouter une notification toast ici
  } catch (err) {
    console.error('Erreur lors de la copie:', err);
  }
};
</script>
