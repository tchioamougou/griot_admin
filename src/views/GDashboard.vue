<template>
  <admin-layout>
    <div class="space-y-6  ">
      <!-- Stat Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <stat-card
          v-for="stat in stats"
          :key="stat.title"
          v-bind="stat"
        />
      </div>

      <!-- Course Chart + Schedule -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div class="lg:col-span-2 bg-white rounded-lg shadow-sm p-6 dark:bg-gray-700 dark:text-white">
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-lg font-semibold text-gray-800 dark:text-white">
              {{ $t('course_enrollment') }}
            </h2>
            <select
              class="bg-gray-100 dark:bg-gray-700 border dark:text-white border-gray-200 text-gray-700 py-1 px-3 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              v-model="selectedRange"
            >
              <option>{{ $t('last7') }}</option>
              <option>{{ $t('last30') }}</option>
              <option>{{ $t('last3') }}</option>
              <option>{{ $t('last1') }}</option>
            </select>
          </div>
          <CourseProgressChart />
        </div>

        <div class="bg-white rounded-lg shadow-sm p-6 dark:bg-gray-700 ">
          <h2 class="text-lg font-semibold text-gray-800 mb-4 dark:text-white">
            {{ $t('upcoming') }}
          </h2>
          <div class="space-y-4">
            <div class="flex items-start" v-for="event in schedule" :key="event.title">
              <div :class="`p-2 rounded-lg mr-3 ${event.bgClass}`">
                <component :is="event.icon" class="h-5 w-5" :class="event.iconColor" />
              </div>
              <div>
                <p class="text-sm font-medium text-gray-800 dark:text-white">{{ event.title }}</p>
                <p class="text-xs text-gray-500">{{ event.time }}</p>
              </div>
            </div>
          </div>
          <button class="mt-4 w-full text-center text-sm text-blue-600 hover:text-blue-700 font-medium">
            {{ $t('all_views') }}
          </button>
        </div>
      </div>

      <!-- Recent Activity + Top Courses -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div class="lg:col-span-2">
          <RecentActivity />
        </div>
        <div>
          <TopCourses />
        </div>
      </div>
    </div>
  </admin-layout>
</template>

<script setup lang="ts">

import {
  Users,
  BookOpen,
  DollarSign,
  Star,
  Calendar,
  CheckCircle,
  AlertCircle,
} from 'lucide-vue-next'
import AdminLayout from '../components/layout/AdminLayout.vue'
import StatCard from '@/components/dashboard/StatCard.vue'
import CourseProgressChart from '@/components/dashboard/CourseProgressChart.vue'
import RecentActivity from '@/components/dashboard/RecentActivity.vue'
import TopCourses from '@/components/dashboard/TopCourses.vue'
import { ref,computed } from 'vue'
import { useI18n } from "vue-i18n";

const selectedRange = ref('Last 7 days')
const { t } = useI18n();

const stats = computed(()=> [
  {
    title: t('total_students'),
    value: '2,845',
    change: '+12.5%',
    trend: "up" as "up",
    icon: Users,
    color: 'blue',
  },
  {
    title: t('active_courses'),
    value: '42',
    change: '+4.2%',
    trend: "up" as "up",
    icon: BookOpen,
    color: 'green',
  },
  {
    title: t('total_earnings'),
    value: '942560 FCFA',
    change: '+18.3%',
    trend: "up" as "up",
    icon: DollarSign,
    color: 'purple',
  },
  {
    title: t('average_rating'),
    value: '4.8',
    change: '+0.2',
    trend: "up" as "up",
    icon: Star,
    color: 'amber',
  },
]
)

const schedule = computed(()=> [
  {
    title: t('french_webinar'),
    time: t('today_pm'),
    icon: Calendar,
    bgClass: 'bg-blue-100',
    iconColor: 'text-blue-600',
  },
  {
    title: t('spanish_course'),
    time: t('tomorrow_pm'),
    icon: CheckCircle,
    bgClass: 'bg-green-100',
    iconColor: 'text-green-600',
  },
  {
    title: t('nw_isntructor'),
    time: t('jul'),
    icon: AlertCircle,
    bgClass: 'bg-amber-100',
    iconColor: 'text-amber-600',
  },
])
</script>

<style scoped>
/* Add any additional scoped styles here if needed */
</style>
