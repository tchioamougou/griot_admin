<!-- <template>
  <div class="row">
    <div
      class="col-md-4 mb-4"
      v-for="student in paginatedRecords"
      :key="student.id"
    >
      <div class="card h-100 shadow-sm">
        <div class="card-body">
          <h5 class="card-title">{{ student.name }}</h5>
          <p class="card-text text-muted mb-1">
            <i class="bi bi-envelope"></i> {{ student.email }}
          </p>
          <slot name="extra" :student="student"></slot>
        </div>
      </div>
    </div>
    <div v-if="showPagination && totalPages > 1" class="d-flex justify-content-center mt-3">
      <ul class="pagination">
        <li class="page-item" :class="{ disabled: currentPage === 1 }">
          <button class="page-link" @click="prevPage">&laquo;</button>
        </li>
        <li
          class="page-item"
          v-for="page in totalPages"
          :key="page"
          :class="{ active: currentPage === page }"
        >
          <button class="page-link" @click="changePage(page)">
            {{ page }}
          </button>
        </li>
        <li class="page-item" :class="{ disabled: currentPage === totalPages }">
          <button class="page-link" @click="nextPage">&raquo;</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, defineProps } from 'vue';

interface Student {
  id: number;
  name: string;
  email: string;
}

const props = defineProps<{
  records: Student[];
  pageSize?: number;
}>();

const currentPage = ref(1);
const pageSize = props.pageSize || 6;

watch(
  () => props.records,
  () => {
    currentPage.value = 1;
  }
);

const totalPages = computed(() => {
  return Math.ceil(props.records.length / pageSize);
});

const paginatedRecords = computed(() => {
  const start = (currentPage.value - 1) * pageSize;
  return props.records.slice(start, start + pageSize);
});

const showPagination = computed(() => props.records.length > pageSize);

function changePage(page: number) {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
}

function nextPage() {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
}

function prevPage() {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
}
</script>

<style scoped>
.card-title {
  font-weight: 600;
}
.card-text {
  font-size: 0.9rem;
}
</style> -->
<template>
  <div>
    <!-- Loading Skeleton -->
    <div v-if="isLoading" class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      <SkeletonCard v-for="n in 6" :key="n" />
    </div>

    <!-- Student Cards -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 ">
      <div
        v-for="student in pagedRecords"
        :key="student.id"
        class="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200 overflow-hidden group relative"

      >
        <div class="p-6">
          <!-- Header -->
          <div class="flex items-start justify-between mb-4">
            <div class="flex items-center space-x-3">
              <div class="relative">
                <img
                  :src="student.avatar"
                  :alt="student.name"
                  class="w-12 h-12 rounded-full object-cover ring-2 ring-white shadow-sm"
                />
                <div
                  :class="[
                    'absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white',
                    getStatusColor(student.status.value)
                  ]"
                ></div>
              </div>
              <div>
                <h3 class="font-semibold text-gray-900">{{ student.name }}</h3>
                <p class="text-sm text-gray-500">{{ student.email }}</p>
              </div>
            </div>

            <!-- Dropdown -->
            <div class="relative"  ref="activeDropdown">
              <button
                @click="toggleDropdown(student.id)"
                class="p-1 rounded-full hover:bg-gray-100 transition duration-200 opacity-0 group-hover:opacity-100"
              >
                <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                </svg>
              </button>

              <div
                v-show="dropdownOpenId === student.id"
                class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10"
              >
                <button
                  @click="$emit('view', student)"
                  class="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                  <svg class="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  Voir le profil
                </button>
                <button
                  @click="$emit('edit', student)"
                  class="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                  <svg class="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Modifier
                </button>
                <hr class="my-1" />
                <button
                  @click="$emit('delete', student)"
                  class="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                >
                  <svg class="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Supprimer
                </button>
              </div>
            </div>
          </div>

          <!-- Course and Status -->
          <div class="mb-4">
            <div class="flex items-center justify-between mb-2">
              <span class="text-sm font-medium text-gray-600">{{ student.course }}</span>
              <span
                :class="[
                  'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                  getBadgeColor(student.status.value)
                ]"
              >
                {{ student.status.label }}
              </span>
            </div>

            <div class="w-full bg-gray-200 rounded-full h-2">
              <div
                :class="[getProgressBarColor(student.status.value), 'h-2 rounded-full transition-all duration-300']"
                :style="{ width: student.progress + '%' }"
              ></div>
            </div>

            <div class="flex justify-between items-center mt-1">
              <span class="text-xs text-gray-500">Progression</span>
              <span class="text-xs font-medium text-gray-700">{{ student.progress }}%</span>
            </div>
          </div>

          <div class="text-xs text-gray-500">Inscrit le {{ formatDate(student.joinDate) }}</div>
        </div>
      </div>
    </div>

    <!-- Pagination -->
    <div v-if="!isLoading && totalPages > 1" class="mt-6 flex justify-center">
      <g-pagination
        v-model="currentPage"
        :page-size="pageSize"
        :total-elements="students.length"
        :total-page="totalPages"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, defineProps, defineEmits, onMounted, onUnmounted,onBeforeUnmount } from 'vue'
import GPagination from '@/components/pagination/GPagination.vue'
import SkeletonCard from '@/components/skeleton/SkeletonCard.vue'
import { formatDateT, paginateList } from '@/components/utilities/UtilityFunction'
import type { ComponentPublicInstance } from 'vue'


interface Status {
  value: 'active' | 'pending' | 'inactive'
  label: string
}

interface Student {
  id: number
  name: string
  email: string
  avatar: string
  course: string
  progress: number
  status: Status
  joinDate: string
}

const props = defineProps<{
  students: Student[]
  pageSize?: number
}>()

const emit = defineEmits(['view', 'edit', 'delete'])

const isLoading = ref(true)
const currentPage = ref(1)
const pageSize = props.pageSize ?? 3
const activeDropdown = ref<number | null>(null)





// ID de l'étudiant dont le dropdown est ouvert
const dropdownOpenId = ref<number | null>(null);

// Toggle dropdown par ID
const toggleDropdown = (id: number) => {
  dropdownOpenId.value = dropdownOpenId.value === id ? null : id;
}




onMounted(() => {
  setTimeout(() => {
    isLoading.value = false
  }, 1500)
})



const totalPages = computed(() => Math.ceil(props.students.length / pageSize))
const pagedRecords = computed(() => {
  return paginateList(props.students, pageSize)[currentPage.value - 1] || []
})

const formatDate = (dateString: string): string => {
  return formatDateT(dateString)
}

const getStatusColor = (status: Status['value']) => {
  switch (status) {
    case 'active':
      return 'bg-green-400'
    case 'pending':
      return 'bg-yellow-400'
    case 'inactive':
      return 'bg-red-400'
    default:
      return ''
  }
}

const getBadgeColor = (status: Status['value']) => {
  switch (status) {
    case 'active':
      return 'bg-green-100 text-green-800'
    case 'pending':
      return 'bg-yellow-100 text-yellow-800'
    case 'inactive':
      return 'bg-red-100 text-red-800'
    default:
      return ''
  }
}

const getProgressBarColor = (status: Status['value']) => {
  switch (status) {
    case 'active':
      return 'bg-green-500'
    case 'pending':
      return 'bg-yellow-500'
    case 'inactive':
      return 'bg-red-500'
    default:
      return ''
  }
}

const handleClickOutside = (event: Event): void => {
  const target = event.target as HTMLElement
  if (!target.closest('.relative')) {
    activeDropdown.value = null
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>
