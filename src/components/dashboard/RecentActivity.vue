<template>
  <div class="bg-white rounded-lg shadow-sm p-6 dark:bg-gray-700">
    <h2 class="text-lg font-semibold text-gray-800 dark:text-white mb-4">Recent Activity</h2>
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
      View All Activities
    </button>
  </div>
</template>

<script setup lang="ts">
import { User, BookOpen, MessageCircle, DollarSign } from 'lucide-vue-next'

interface Activity {
  id: number
  user: string
  action: string
  target: string
  time: string
  icon: any
  iconBg: string
  iconColor: string
}

const activities: Activity[] = [
  {
    id: 1,
    user: 'Emma Thompson',
    action: 'enrolled in',
    target: 'Advanced Spanish Conversation',
    time: '5 minutes ago',
    icon: User,
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600',
  },
  {
    id: 2,
    user: 'John Martinez',
    action: 'completed',
    target: 'French Basics Module 3',
    time: '2 hours ago',
    icon: BookOpen,
    iconBg: 'bg-green-100',
    iconColor: 'text-green-600',
  },
  {
    id: 3,
    user: 'Sarah Chen',
    action: 'left a review on',
    target: 'Japanese for Beginners',
    time: '4 hours ago',
    icon: MessageCircle,
    iconBg: 'bg-amber-100',
    iconColor: 'text-amber-600',
  },
  {
    id: 4,
    user: 'Michael Johnson',
    action: 'purchased',
    target: 'German Language Bundle',
    time: '6 hours ago',
    icon: DollarSign,
    iconBg: 'bg-purple-100',
    iconColor: 'text-purple-600',
  },
]
</script>
