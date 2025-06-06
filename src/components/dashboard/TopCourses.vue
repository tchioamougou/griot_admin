<template>
  <div class="bg-white rounded-lg shadow-sm p-6 dark:bg-gray-700">
    <h2 class="text-lg font-semibold text-gray-800 mb-4 dark:text-white">
      {{ $t('top_perform') }}
    </h2>
    <div class="space-y-4">
      <div
        v-for="course in courses"
        :key="course.id"
        class="border-b border-gray-100 pb-4 last:border-0 last:pb-0"
      >
        <div class="flex items-center dark:text-white">
          <div :class="[course.color, 'w-1 h-8 rounded-full mr-3']"></div>
          <div class="flex-1">
            <h3 class="text-sm font-medium text-gray-800 dark:text-white">{{ course.title }}</h3>
            <p class="text-xs text-gray-500">
              {{ course.students }} {{ $t('student_enrolled') }}
            </p>
          </div>
          <div class="flex items-center">
            <StarIcon class="h-4 w-4 text-amber-500 mr-1" />
            <span class="text-sm font-medium text-gray-700">{{ course.rating }}</span>
          </div>
        </div>
      </div>
    </div>
    <button
      class="mt-4 w-full text-center text-sm text-blue-600 hover:text-blue-700 font-medium"
    >
      {{ $t('view_course') }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { Star as StarIcon } from 'lucide-vue-next'
import {computed} from 'vue'
import { useI18n } from "vue-i18n";

// interface Course {
//   id: number
//   title: string
//   students: number
//   rating: number
//   color: string
// }
const { t } = useI18n();
const courses = computed(()=>[
  {
    id: 1,
    title: t('Courses.spanish_beginners'),
    students: 845,
    rating: 4.9,
    color: 'bg-blue-500',
  },
  {
    id: 2,
    title: t('Courses.french_masterclass'),
    students: 723,
    rating: 4.8,
    color: 'bg-green-500',
  },
  {
    id: 3,
    title: t('Courses.japanese_essentials'),
    students: 612,
    rating: 4.7,
    color: 'bg-amber-500',
  },
])
</script>
