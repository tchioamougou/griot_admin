<template>
  <div class="bg-white rounded-lg shadow-sm p-6 dark:bg-gray-700">
    <h2 class="text-lg font-semibold text-gray-800 dark:text-white mb-4">{{ $t('recent_activity') }}</h2>
    <div class="space-y-4">
      <div
        v-for="activity in activities"
        :key="activity.id"
        class="flex items-start"
      >
        <div :class="[activity.iconBg, 'p-2 rounded-lg mr-3']">
          <component
            :is="activity.icon"
            class="h-5 w-5"
            :class="activity.iconColor"
          />
        </div>
        <div>
          <p class="text-sm text-gray-800 dark:text-white">
            <span class="font-medium">{{ activity.user }}</span>
            {{ ' ' + activity.action + ' ' }}
            <span class="font-medium">{{ activity.target }}</span>
          </p>
          <p class="text-xs text-gray-500">{{ activity.time }}</p>
        </div>
      </div>
    </div>
    <button
      class="mt-4 w-full text-center text-sm text-blue-600 hover:text-blue-700 font-medium"
    >
      {{ $t('view_all_activity') }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { User, BookOpen, MessageCircle, DollarSign } from 'lucide-vue-next'
import {computed} from 'vue'
import { useI18n } from "vue-i18n";

// interface Activity {
//   id: number
//   user: string
//   action: string
//   target: string
//   time: string
//   icon: any
//   iconBg: string
//   iconColor: string
// }
const { t } = useI18n();
const activities = computed(() => [
    {
      id: 1,
      user: 'Emma Thompson',
      action: t('activities.enrolled'),
      target: t('activities.courses.spanish_advanced'),
      time: t('activities.ago.5min'),
      icon: User,
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600',
    },
    {
      id: 2,
      user: 'John Martinez',
      action: t('activities.completed'),
      target: t('activities.courses.french_module3'),
      time: t('activities.ago.2h'),
      icon: BookOpen,
      iconBg: 'bg-green-100',
      iconColor: 'text-green-600',
    },
    {
      id: 3,
      user: 'Sarah Chen',
      action: t('activities.reviewed'),
      target: t('activities.courses.japanese_beginners'),
      time: t('activities.ago.4h'),
      icon: MessageCircle,
      iconBg: 'bg-amber-100',
      iconColor: 'text-amber-600',
    },
    {
      id: 4,
      user: 'Michael Johnson',
      action: t('activities.purchased'),
      target: t('activities.courses.german_bundle'),
      time: t('activities.ago.6h'),
      icon: DollarSign,
      iconBg: 'bg-purple-100',
      iconColor: 'text-purple-600',
    },
  ])
</script>
