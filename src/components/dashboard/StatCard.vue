<template>
  <div class="bg-white rounded-lg shadow-sm p-6 dark:bg-gray-700">
    <div class="flex items-center justify-between">
      <div :class="[colorClasses.bgLight, 'p-3 rounded-lg']">
        <component :is="icon" class="h-6 w-6" :class="colorClasses.textDark" />
      </div>
      <div :class="['flex items-center', trendColor]">
        <span class="text-sm font-medium">{{ change }}</span>
        <component :is="trendIcon" class="h-4 w-4 ml-1" />
      </div>
    </div>
    <div class="mt-4">
      <h3 class="text-sm font-medium text-gray-500">{{ title }}</h3>
      <p class="text-2xl font-semibold text-gray-800 mt-1 dark:text-white">{{ value }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, computed } from 'vue'
import { TrendingUp, TrendingDown } from 'lucide-vue-next'

interface StatCardProps {
  title: string
  value: string
  change: string
  trend: 'up' | 'down'
  icon: any // Vue component (e.g., BookOpen)
  color: string
}

const props = defineProps<StatCardProps>()

const colorClasses = computed(() => {
  switch (props.color) {
    case 'blue':
      return {
        bgLight: 'bg-blue-100',
        textDark: 'text-blue-600',
      }
    case 'green':
      return {
        bgLight: 'bg-green-100',
        textDark: 'text-green-600',
      }
    case 'purple':
      return {
        bgLight: 'bg-purple-100',
        textDark: 'text-purple-600',
      }
    case 'amber':
      return {
        bgLight: 'bg-amber-100',
        textDark: 'text-amber-600',
      }
    default:
      return {
        bgLight: 'bg-gray-100',
        textDark: 'text-gray-600',
      }
  }
})

const trendColor = computed(() =>
  props.trend === 'up' ? 'text-green-500' : 'text-red-500'
)

const trendIcon = computed(() =>
  props.trend === 'up' ? TrendingUp : TrendingDown
)
</script>
