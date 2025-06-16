<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:bg-gray-900">
    <admin-layout>
      <div
        class="relative overflow-hidden bg-gradient-to-r  from-indigo-600 via-purple-600 to-blue-600 rounded-2xl mb-20 shadow-2xl"
      >
        <div class="absolute inset-0 bg-black/20"></div>
        <div
          class="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-32 translate-x-32 blur-3xl"
        ></div>
        <div class="relative px-8 py-12">
          <div class="flex items-center justify-between">
            <div class="space-y-4">
              <div class="flex items-center space-x-3">
                <div class="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
                  <svg
                    class="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    ></path>
                  </svg>
                </div>
                <h1 class="text-4xl font-bold text-white">{{ $t('course_management') }}</h1>
              </div>
              <p class="text-blue-100 text-lg">
                {{ $t('manage_course') }}
              </p>
            </div>
            <div class="hidden md:flex items-center space-x-4">
              <div class="glass-card px-6 py-4 text-center">
                <div class="text-2xl font-bold text-white">{{ totalCourses }}</div>
                <div class="text-blue-100 text-sm">{{ $t('total_course') }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="mb-8">
        <div class="flex items-center justify-between mb-6">
          <div class="flex space-x-1 bg-gray-100 p-1 rounded-2xl">
            <button
              v-for="(tab, index) in tabs"
              :key="index"
              @click="activeTab = tab.key"
              :class="[
                'relative px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300',
                activeTab === tab.key
                  ? 'bg-white text-indigo-600 shadow-lg'
                  : 'text-gray-600 hover:text-indigo-600 hover:bg-white/50',
              ]"
            >
              <span class="relative z-10">{{ tab.label }}</span>
              <span
                v-if="tab.count"
                class="ml-2 px-2 py-1 text-xs bg-indigo-100 text-indigo-600 rounded-full"
              >
                {{ tab.count }}
              </span>
            </button>
          </div>
          <!-- Filtres avancés -->
          <!-- <div class="flex items-center space-x-3">
            <select
              v-model="sortBy"
              class="px-4 py-2 bg-white border border-gray-200 rounded-xl text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="name">Trier par nom</option>
              <option value="progress">Trier par progression</option>
              <option value="status">Trier par statut</option>
            </select>
            <button
              @click="toggleView"
              class="p-3 bg-white border border-gray-200 rounded-xl text-gray-600 hover:text-indigo-600 hover:border-indigo-300 transition-all duration-200"
            >
              <svg v-if="viewMode === 'table'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
              </svg>
              <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16"></path>
              </svg>
            </button>
          </div> -->
        </div>
      </div>
      <div v-if=" activeTab =='all'" class="my-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <SimpleCard :name="$t('total_course')" :count="totalCourses" />
        <SimpleCard :name="$t('activated_courses')" :count="activatedCoureses" />
        <SimpleCard :name="$t('pending_courses')" :count="pendingCoureses" />
        <SimpleCard :name="$t('building_courses')" :count="buildingCoureses" />
      </div>

   

      <!-- Vue Tableau (modernisée) -->
      <div class="bg-white rounded-2xl  border border-gray-100 overflow-hidden dark:bg-gray-900">
        <div class="overflow-x-auto">
          <div class="bg-white shadow-md rounded-xl dark:bg-gray-900">
            <TableComponent
              :items="columns"
              :datas="filteredCourses"
              :showHeader="true"
              :title="$t('course_management')"
              :pageSize="10"
              :pagination="true"
              @pageChange="handlePageChange"
              :showButtonAllElement="true"
              :options="filterOptions"
              :filterable="true"
              :loading="loading"
              @view="onViewCourse"
              @approve="onApproveCourse"
              class="modern-table"
            />
          </div>
        </div>
      </div>
    </admin-layout>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import AdminLayout from '@/components/layout/AdminLayout.vue'
import TableComponent from '@/components/tables/TableComponent.vue'
import { getAllCourses } from '@/services/griot_service'
import type { TableColumn } from '@/types/table'
import { formatDateT } from '@/components/utilities/UtilityFunction'
import SimpleCard from '@/components/cards/SimpleCard.vue'
import { useRouter } from 'vue-router'
import type { ComputedRef } from 'vue'
import { useI18n } from "vue-i18n";

// État réactif
const activeTab = ref('all')
const loading = ref(false)
const courses = ref<Course[]>([])
const error = ref<string | null>(null)
const totalCourses = ref<number | null>(null)
const activatedCoureses = ref<number | null>(null)
const pendingCoureses = ref<number | null>(null)
const buildingCoureses = ref<number | null>(null)
const { t } = useI18n();
const router = useRouter()

const columns:  ComputedRef<TableColumn[]>  = computed(()=> [
  { name: 'title', label: t('course_name'), sortable: true, type: 'imageText' },
  { name: 'InstructorName', label: t('instructor'), type: 'imageText', sortable: true },
  { name: 'priceFormatted', label: t('amount'), type: 'text', sortable: true },
  { name: 'date', label: t('added_date'), type: 'text', sortable: true },
  { name: 'statusColor', label: t('status'), type: 'badge', sortable: true },
  {
    name: 'actions',
    label: t('action'),
    type: 'action',
    actions: [
      { name: 'View', event: 'view', icone: '👁️‍🗨️' },
      { name: 'Delete', event: 'delete', icone: '🗑️' },
    ],
  },
])

const filterOptions = computed(()=>[
  { name: t('filters.newest'), api: 'new' },
  { name: t('filters.oldest'), api: 'old' },
  { name: t('filters.az'), api: 'a-z' },
  { name: t('filters.za'), api: 'z-a' },
  { name: t('filters.publishedFirst'), api: 'published' },
  { name: t('filters.unpublishedFirst'), api: 'Unpublished' },
])

const pageNumber = ref(1)
const pageSize = ref(10)

interface Course {
  id: number
  title: string
  description: string
  status: string
}

function handlePageChange(page: number) {
  pageNumber.value = page;
  console.log('Page changed to:', page)
}


const fetchCourses = async (page: number, size: number) => {
  loading.value = true
  error.value = null
  try {
    const response = await getAllCourses(page, size)
    if (!response.ok) throw new Error('Erreur lors de la récupération des cours')
    const data = await response.json()
    totalCourses.value = data.totalCourses
    activatedCoureses.value = data.totalPublishedCourses
    pendingCoureses.value = data.totalSubmittedCourses
    buildingCoureses.value = data.totalRejectedCourses
    courses.value = data.courses.map((c: any) => {
      const priceObj = c.price
      const priceFormatted = priceObj ? `${priceObj.value} ${priceObj.currencySymbol}` : 'Gratuit'
      const statusClasses = getStatusColor(c.status).split(' ')

      return {
        ...c,
        title: {
          name: c.title,
          image: c.picture,
        },
        InstructorName: {
          name: `${c.instructor.firstName} ${c.instructor.lastName}`,
          image: c.instructor.picture,
        },
        statusColor: {
          label: c.status,
          bg: statusClasses[0],
          text: statusClasses[1],
        },
        priceFormatted,
        date: formatDateT(c.createdDate),
      }
    })
    courses.value.sort((a:any, b:any) => a.name.localeCompare(b.name))
    console.log('courses.value', data)
  } catch (err: any) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchCourses(pageNumber.value, pageSize.value)
})

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Submitted':
      return 'bg-green-100 text-green-700'
    case 'Draft':
      return 'bg-yellow-100 text-yellow-700'
    case 'Published':
      return 'bg-red-100 text-red-700'
    default:
      return 'bg-gray-100 text-gray-700'
  }
}

const tabs = computed(() => {
  const all = courses.value.length
  const submitted = courses.value.filter((c) => c.status === 'Submitted').length
  const suspended = courses.value.filter((c) => c.status === 'Suspended').length

  return [
    { key: 'all', label: t('tabs.allCourses'), count: all },
    { key: 'submitted', label: t('tabs.submittedCourses'), count: submitted },
    { key: 'suspended', label:  t('tabs.suspendedCourses'), count: suspended },
  ]
})

const filteredCourses = computed(() => {
  if (activeTab.value === 'submitted') {
    return courses.value.filter((c) => c.status === 'Submitted')
  } else if (activeTab.value === 'suspended') {
    return courses.value.filter((c) => c.status === 'Suspended')
  }
  return courses.value
})

const onViewCourse = (course: any) => handleCourseAction('view', course)

const handleCourseAction = (action: string, courseData: any) => {
  const course = courses.value.find((c: any) => c.id === courseData.id)
  console.log('course', course)
  if (!course) {
    console.error('Cours non trouvé')
    return
  }

  switch (action) {
    case 'view':
      router.push({ name: 'Cours', params: { id: course.id } })
      break
    case 'delete':
      console.log(`Suppression du cours avec l'ID: ${course.id}`)

      break
    default:
      console.warn(`Action inconnue: ${action}`)
  }
}

const onApproveCourse = ()=>{
  
}
</script>
