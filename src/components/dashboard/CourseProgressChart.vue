<template>
  <div class="h-64 relative dark:bg-gray-900">
    <!-- Bar chart columns -->
    <div class="absolute inset-0 flex items-end justify-between px-4">
      <div v-for="(height, index) in heights"
           :key="index"
           class="w-1/12 bg-blue-500 rounded-t-md"
           :style="{ height: height }">
      </div>
    </div>

    <!-- X-axis labels -->
    <div class="absolute bottom-0 inset-x-0 flex items-center justify-between px-4 text-xs text-gray-500">
      <div v-for="day in days" :key="day">{{ day }}</div>
    </div>

    <!-- Y-axis labels -->
    <div class="absolute left-0 inset-y-0 flex flex-col justify-between py-4 text-xs text-gray-500">
      <div>100</div>
      <div>75</div>
      <div>50</div>
      <div>25</div>
      <div>0</div>
    </div>
  </div>
</template>

<script setup lang="ts">
const heights = [
  '30%', '45%', '65%', '55%', '70%', '80%', '90%',
]

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
</script>
