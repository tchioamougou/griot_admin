<template>
  <div>
    <!-- Loading Skeleton -->
    <div v-if="isLoading" class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      <SkeletonCard v-for="n in 6" :key="n" />
    </div>

    <!-- Instructor Cards -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      <div
        v-for="(re, index) in pagedRecords"
        :key="index"
        class="bg-white dark:bg-gray-800 shadow-md rounded-2xl overflow-hidden transition"
      >
        <!-- Header -->
        <div class="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center space-x-4">
          <img :src="re.picture" alt="Instructor" class="w-16 h-16 rounded-full object-cover" />
          <div>
            <h3 class="font-semibold text-lg text-gray-800 dark:text-white">{{ re.name }}</h3>
            <p class="text-sm text-gray-500 dark:text-gray-400">{{ re.headLine }}</p>
          </div>
        </div>

        <!-- Content -->
        <div class="p-4 space-y-2 text-gray-700 dark:text-gray-300">
          <div class="flex justify-between text-sm">
            <div class="flex items-center space-x-2">
              <i class="bi bi-people-fill text-green-600"></i>
              <span>{{ $t('total_students') }}</span>
            </div>
            <span>{{ re.totalStudents }}</span>
          </div>

          <div class="flex justify-between text-sm">
            <div class="flex items-center space-x-2">
              <i class="bi bi-camera-fill text-green-600"></i>
              <span>{{ $t('total_course') }}</span>
            </div>
            <span>{{ re.totalCourses ?? 0 }}</span>
          </div>

          <div class="flex items-center space-x-2">
            <StarsRating :rating="re.rating" :star-style="starStyle" is-indicator-active />
            <span class="text-xs">({{ re.totalReviews }})</span>
          </div>
        </div>

        <!-- Footer -->
        <div
          class="px-4 py-3 border-t border-gray-200 dark:border-gray-700 flex justify-between text-sm text-gray-500 dark:text-gray-400 space-x-6"
        >
          <span
            >{{ $t('joined') }}:
            <strong class="text-indigo-600 dark:text-indigo-400">{{
              formatDate(re.createdDate)
            }}</strong></span
          >
          <div class="flex space-x-2">
            <button class="hover:text-indigo-600 dark:hover:text-indigo-400">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            </button>
            <button class="hover:text-indigo-600 dark:hover:text-indigo-400">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
            </button>
            <button class="hover:text-indigo-600 dark:hover:text-indigo-400">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Pagination -->
    <div v-if="!isLoading && totalPages > 1" class="mt-6 flex justify-center">
      <g-pagination
        v-model="currentPage"
        :page-size="pageSize"
        :total-elements="records.length"
        :total-page="totalPages"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue'
import router from '@/router'
import StarsRating from '@/components/rating/StarsRating.vue'
import GPagination from '@/components/pagination/GPagination.vue'
import SkeletonCard from '@/components/skeleton/SkeletonCard.vue'
import { formatDateT, paginateList } from '@/components/utilities/UtilityFunction'

interface Instructor {
  id: number
  name: string
  headLine: string
  picture: string
  totalStudents: number
  totalCourses: number
  rating: number
  totalReviews: number
  createdDate: string
}

const props = defineProps<{
  records: Instructor[]
  pageSize?: number
}>()

const pageSize = props.pageSize ?? 3
const currentPage = ref(1)
const isLoading = ref(true)

const totalPages = computed(() => Math.ceil(props.records.length / pageSize))
const pagedRecords = computed(() => {
  return paginateList(props.records, pageSize)[currentPage.value - 1] || []
})

const starStyle = {
  fullStarColor: '#ed8a19',
  emptyStarColor: '#737373',
  starWidth: 15,
  starHeight: 15,
}

function view(re: Instructor) {
  router.push({ name: 'InstructorView', params: { id: re.id } })
}

function formatDate(date: string) {
  return formatDateT(date)
}

// Simuler un chargement
onMounted(() => {
  setTimeout(() => {
    isLoading.value = false
  }, 1500)
})
</script>
