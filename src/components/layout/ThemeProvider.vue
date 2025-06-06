<template>
  <slot />
</template>

<script setup lang="ts">
import { ref, provide, onMounted, watch, computed, type Ref } from 'vue'
import type { Theme, ThemeContext } from '@/composables/useTheme'

const theme = ref<Theme>('light')
const isInitialized = ref(false)

const isDarkMode = computed(() => theme.value === 'dark')

const toggleTheme = () => {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
}

onMounted(() => {
  const savedTheme = localStorage.getItem('theme') as Theme | null
  const initialTheme = savedTheme || 'light'
  theme.value = initialTheme
  isInitialized.value = true
})

watch([theme, isInitialized], ([newTheme, initialized]) => {
  if (initialized) {
    localStorage.setItem('theme', newTheme)
    document.documentElement.classList.toggle('dark', newTheme === 'dark')
  }
})

provide<ThemeContext>('theme', {
  isDarkMode,
  toggleTheme,
})
</script>
