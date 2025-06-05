<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
    <admin-layout>
      <!-- <PageBreadcrumb :pageTitle="'Course List'" /> -->
      <div
        class="relative overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 rounded-2xl mb-20 shadow-2xl"
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
                <h1 class="text-4xl font-bold text-white">Gestion des Cours</h1>
              </div>
              <p class="text-blue-100 text-lg">
                Gérez et supervisez tous vos cours en un seul endroit
              </p>
            </div>
            <div class="hidden md:flex items-center space-x-4">
              <div class="glass-card px-6 py-4 text-center">
                <div class="text-2xl font-bold text-white">{{ totalCourses }}</div>
                <div class="text-blue-100 text-sm">Total Cours</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- <div class="flex justify-end">
      <div class="mb-8 space-y-6">
        <div class="flex flex-col lg:flex-row gap-6 items-start lg:items-center">
          <div class="flex-1 max-w-2xl">
            <div class="relative group">
              <div class="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
              <div class="relative bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                <div class="flex items-center p-4">
                  <div class="flex-shrink-0 p-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl mr-4">
                    <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"></path>
                    </svg>
                  </div>
                  <input
                    v-model="searchQuery"
                    type="text"
                    placeholder="Rechercher ..."
                    class="flex-1 border-0 bg-transparent text-gray-800 placeholder-gray-400 focus:outline-none text-lg"
                  />
                  <button
                    @click="performSearch"
                    class="ml-4 px-6 py-2 bg-blue-500 text-white rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200"
                  >
                    Rechercher
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div> -->
      <!-- Onglets modernisés -->
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
        <SimpleCard name="Total Courses" :count="totalCourses" />
        <SimpleCard name="Activated Courses" :count="activatedCoureses" />
        <SimpleCard name="Pending Courses" :count="pendingCoureses" />
        <SimpleCard name="Building Courses" :count="buildingCoureses" />
      </div>

      <!-- Vue Cartes (moderne) -->
      <!-- <div  class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
        <div
          v-for="(record, index) in filteredRecords"
          :key="index"
          class="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl border border-gray-100 overflow-hidden transition-all duration-500 hover:-translate-y-2"
        >

          <div :class="[
            'h-2 w-full',
            record.status.label === 'Actif' ? 'bg-gradient-to-r from-green-400 to-emerald-500' :
            record.status.label === 'En cours' ? 'bg-gradient-to-r from-blue-400 to-cyan-500' :
            record.status.label === 'Complété' ? 'bg-gradient-to-r from-purple-400 to-pink-500' :
            'bg-gradient-to-r from-yellow-400 to-orange-500'
          ]"></div>

          <div class="p-6">

            <div class="flex items-center space-x-4 mb-4">
              <div class="relative">
                <img
                  :src="record.avatar"
                  :alt="record.name"
                  class="w-16 h-16 rounded-2xl object-cover ring-4 ring-white shadow-lg"
                />
                <div class="absolute -bottom-2 -right-2 w-6 h-6 bg-green-500 rounded-full border-3 border-white flex items-center justify-center">
                  <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                  </svg>
                </div>
              </div>

              <div class="flex-1 min-w-0">
                <h3 class="text-lg font-bold text-gray-900 truncate">{{ record.name }}</h3>
                <p class="text-gray-500 text-sm truncate">{{ record.email }}</p>
              </div>
            </div>


            <div class="mb-4">
              <span :class="[
                'inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold',
                record.status.bg,
                record.status.text
              ]">
                {{ record.status.label }}
              </span>
            </div>


            <div class="mb-6">
              <div class="flex justify-between items-center mb-2">
                <span class="text-sm font-medium text-gray-700">Progression</span>
                <span class="text-sm font-bold text-gray-900">{{ record.progress }}%</span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                <div
                  :class="[
                    'h-2 rounded-full transition-all duration-1000 ease-out',
                    record.progress >= 80 ? 'bg-gradient-to-r from-green-400 to-emerald-500' :
                    record.progress >= 50 ? 'bg-gradient-to-r from-blue-400 to-cyan-500' :
                    'bg-gradient-to-r from-yellow-400 to-orange-500'
                  ]"
                  :style="{ width: record.progress + '%' }"
                ></div>
              </div>
            </div>


            <div class="flex justify-between items-center pt-4 border-t border-gray-100">
              <button
                @click="viewProfile(record)"
                class="flex items-center space-x-2 text-indigo-600 hover:text-indigo-800 text-sm font-semibold group"
              >
                <svg class="w-4 h-4 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                </svg>
                <span>Voir</span>
              </button>

              <div class="flex items-center space-x-2">
                <button
                  @click="editRecord(record)"
                  class="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                  </svg>
                </button>
                <button
                  @click="deleteRecord(record)"
                  class="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>


          <div class="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
        </div>
      </div> -->

      <!-- Vue Tableau (modernisée) -->
      <div class="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        <div class="overflow-x-auto">
          <div class="bg-white shadow-md rounded-xl p-6 mt-6">
            <TableComponent
              :items="columns"
              :datas="filteredCourses"
              :showHeader="true"
              title="Gestion de cours"
              :pageSize="10"
              :pagination="true"
              @pageChange="handlePageChange"
              :showButtonAllElement="true"
              :options="filterOptions"
              :filterable="true"
              :loading="loading"
              @view="onViewCourse"
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
import PageBreadcrumb from '@/components/common/PageBreadcrumb.vue'
import AdminLayout from '@/components/layout/AdminLayout.vue'
import TableComponent from '@/components/tables/TableComponent.vue'
import { getAllCourses } from '@/services/griot_service'
import type { TableColumn } from '@/types/table'
import { formatDateT } from '@/components/utilities/UtilityFunction'
import SimpleCard from '@/components/cards/SimpleCard.vue'
import { useRouter } from 'vue-router'

// État réactif
const searchQuery = ref('')
const activeTab = ref('all')
const viewMode = ref('cards')
const sortBy = ref('name')
const loading = ref(false)
const courses = ref<Course[]>([])
const isLoading = ref(false)
const error = ref<string | null>(null)
const totalCourses = ref<number | null>(null)
const activatedCoureses = ref<number | null>(null)
const pendingCoureses = ref<number | null>(null)
const buildingCoureses = ref<number | null>(null)

const router = useRouter()

const columns: TableColumn[] = [
  { name: 'title', label: 'Course Name', sortable: true, type: 'imageText' },
  { name: 'InstructorName', label: 'Instructor', type: 'imageText', sortable: true },
  { name: 'priceFormatted', label: 'amount', type: 'text', sortable: true },
  { name: 'date', label: 'Added Date', type: 'text', sortable: true },
  { name: 'statusColor', label: 'Status', type: 'badge', sortable: true },
  {
    name: 'actions',
    label: 'Actions',
    type: 'action',
    actions: [
      { name: 'View', event: 'view', icone: '👁️‍🗨️' },
      // { name: 'Edit', event: 'edit', icone: '✏️' },
      { name: 'Delete', event: 'delete', icone: '🗑️' },
    ],
  },
]

const filterOptions = [
  { name: 'Newest', api: 'new' },
  { name: 'Oldest ', api: 'old' },
  { name: 'A-Z', api: 'a-z' },
  { name: 'Z-A', api: 'z-a' },
  { name: 'Published First', api: 'published' },
  { name: 'Unpublished First', api: 'Unpublished' },
]

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
    { key: 'all', label: 'All Courses', count: all },
    { key: 'submitted', label: 'Submitted Courses', count: submitted },
    { key: 'suspended', label: 'Suspended Courses', count: suspended },
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
</script>
