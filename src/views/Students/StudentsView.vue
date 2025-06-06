<template>
  <AdminLayout>
    <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
      <!-- Header Section -->
      <div class="bg-white border-b border-gray-200 rounded-t-xl dark:bg-gray-900">
        <div class="px-6 py-8">
          <div class="flex items-center justify-between">
            <div>
              <div class="flex items-center space-x-3">
                <div class="p-2 bg-indigo-100 rounded-lg ">
                  <svg
                    class="w-6 h-6 text-indigo-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                    ></path>
                  </svg>
                </div>
                <div>
                  <h1 class="text-3xl font-bold text-gray-900 dark:text-white">{{ $t('students') }}</h1>
                  <p class="text-sm text-gray-500 mt-1">{{ $t('manage_students') }}</p>
                </div>
              </div>
            </div>


          </div>
        </div>
      </div>

      <!-- Filters and Controls -->
      <div class="px-6 py-6 bg-white border-b border-gray-200 dark:bg-gray-900">
        <div
          class="flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0"
          :class="[!showList ? 'justify-between' : 'justify-end']"
        >
          <div
            v-if="!showList"
            class="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 flex-1 max-w-lg"
          >
            <div class="relative flex-1">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  class="h-5 w-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  ></path>
                </svg>
              </div>
              <input
                v-model="searchText"
                type="text"
                :placeholder="$t('search...')"
                class="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
          </div>

          <!-- View toggles and stats -->
          <div class="flex items-center justify-between lg:justify-end space-x-4">
            <div class="text-sm text-gray-500">
              <span class="font-medium text-gray-900">{{ filteredStudents.length }}</span> {{ $t('students') }}
            </div>

            <div class="flex items-center bg-gray-100 rounded-lg p-1">
              <button
                @click="setShowList(false)"
                :class="[
                  'px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200',
                  !showList
                    ? 'bg-white shadow-sm text-indigo-600'
                    : 'text-gray-500 hover:text-gray-700',
                ]"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                  ></path>
                </svg>
              </button>
              <button
                @click="setShowList(true)"
                :class="[
                  'px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200',
                  showList
                    ? 'bg-white shadow-sm text-indigo-600'
                    : 'text-gray-500 hover:text-gray-700',
                ]"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 6h16M4 10h16M4 14h16M4 18h16"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Content -->
      <div class="px-6 py-6">
        <div v-if="filteredStudents.length === 0" class="text-center py-12">
          <svg
            class="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
            ></path>
          </svg>
          <h3 class="mt-4 text-lg font-medium text-gray-900">{{ $t('no_students') }}</h3>
          <p class="mt-2 text-sm text-gray-500">{{ $t('try_search') }}</p>
        </div>

        <!-- Card View -->
        <div v-else-if="!showList" >
          <div class="">
          <StudentCardList
            :students="filteredStudents"
            @view="handleView"
            @edit="handleEdit"
            @delete="handleDelete"
            :page-size="6"
          />
        </div>
        </div>


        <!-- List View -->
        <div v-else>
          <div class="overflow-x-auto">
            <TableComponent
              :items="columns"
              :datas="filteredStudents"
              :showHeader="true"
              :title="$t('students')"
              :pageSize="10"
              :pagination="true"
              :showButtonAllElement="true"
              :filterable="true"
              :loading="loading"
              class="modern-table"
            />


          </div>
        </div>
      </div>
    </div>
  </AdminLayout>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted,watch } from 'vue'
import AdminLayout from '@/components/layout/AdminLayout.vue'
import StudentCardList from '@/components/cards/StudentCardList.vue'
import TableComponent from '@/components/tables/TableComponent.vue'
import Select from '@/components/forms/FormElements/Select.vue'
import { getUserByRoles, getAllRoles } from '@/services/griot_service'
import type { TableColumn } from '@/types/table'
import type { ComputedRef } from 'vue'
import { useI18n } from "vue-i18n";

interface Student {
  id: number
  name: string
  email: string
  avatar: string
  progress: number
  status: {
    label: string
    value: 'active' | 'pending' | 'inactive'
    color: string
  }
  course: string
  joinDate: string
}

// Reactive state
const showList = ref<boolean>(false)
const searchText = ref<string>('')
const selectedStatus = ref<string>('all')
const students = ref<Student[]>([])
const activeDropdown = ref<number | null>(null)
const pageNumber = ref(1)
const pageSize = ref(10)
const loading = ref(true)
const { t } = useI18n();

const columns: ComputedRef<TableColumn[]>  = computed(()=> [
  { name: 'name', label: t('student_name'), sortable: true, type: 'text' },
  { name: 'course', label: t('courses'), type: 'imageText', sortable: true },
  { name: 'payments', label: t('payments'), type: 'text', sortable: true },
  { name: 'joinDate', label: t('join_date'), type: 'text', sortable: true },
  { name: 'progress', label: t('progress'), type: 'percentage', sortable: true },
  {
    name: 'actions',
    label: t('action'),
    type: 'action',
    actions: [
      { name: 'View', event: 'view', icone: '👁️‍🗨️' },
       { name: 'Edit', event: 'edit', icone: '✏️' },
      { name: 'Delete', event: 'delete', icone: '🗑️' },
    ],
  },
])

// const students = ref<Student[]>([
//   {
//     id: 1,
//     name: 'Alice Dupont',
//     email: 'alice.dupont@example.com',
//     avatar: 'https://i.pravatar.cc/150?u=alice',
//     progress: 72,
//     status: { label: 'Actif', value: 'active', color: 'emerald' },
//     course: 'Développement Web',
//     joinDate: '2024-01-15',
//   },
//   {
//     id: 2,
//     name: 'Jean Durand',
//     email: 'jean.durand@example.com',
//     avatar: 'https://i.pravatar.cc/150?u=jean',
//     progress: 45,
//     status: { label: 'En attente', value: 'pending', color: 'yellow' },
//     course: 'Design UX/UI',
//     joinDate: '2024-02-20',
//   },
//   {
//     id: 3,
//     name: 'Marie Martin',
//     email: 'marie.martin@example.com',
//     avatar: 'https://i.pravatar.cc/150?u=marie',
//     progress: 88,
//     status: { label: 'Actif', value: 'active', color: 'emerald' },
//     course: 'Data Science',
//     joinDate: '2024-01-10',
//   },
//   {
//     id: 4,
//     name: 'Pierre Dubois',
//     email: 'pierre.dubois@example.com',
//     avatar: 'https://i.pravatar.cc/150?u=pierre',
//     progress: 23,
//     status: { label: 'Inactif', value: 'inactive', color: 'gray' },
//     course: 'Marketing Digital',
//     joinDate: '2024-03-05',
//   },
//   {
//     id: 5,
//     name: 'Sophie Bernard',
//     email: 'sophie.bernard@example.com',
//     avatar: 'https://i.pravatar.cc/150?u=sophie',
//     progress: 91,
//     status: { label: 'Actif', value: 'active', color: 'emerald' },
//     course: 'Cybersécurité',
//     joinDate: '2024-01-08',
//   },
//   {
//     id: 6,
//     name: 'Lucas Moreau',
//     email: 'lucas.moreau@example.com',
//     avatar: 'https://i.pravatar.cc/150?u=lucas',
//     progress: 67,
//     status: { label: 'En attente', value: 'pending', color: 'yellow' },
//     course: 'Intelligence Artificielle',
//     joinDate: '2024-02-28',
//   },
// ])

const getStudentsLocal = async () => {
  try {
    const studentId = await getStudentRoleId()
    if (studentId) {
      const response = await getUserByRoles(
        studentId,
        searchText.value ?? '',
        pageNumber.value,
        pageSize.value,
      )

      console.log('Response =>', response)

      if (!response.ok) {
        // Tu peux activer un message d'erreur ici
        console.error('Erreur HTTP:', response.status)
        return
      }

      students.value = await response.json()
      console.log('Result =>', students.value)
    }
    students.value.sort((a:any, b:any) => a.name.localeCompare(b.name));
  } catch (error) {
    console.error('Erreur de récupération des étudiants =>', error)
  }
}

const getStudentRoleId = async (): Promise<string | null> => {
  try {
    const response = await getAllRoles()

    if (!response.ok) {
      console.error('Erreur lors de la récupération des rôles:', response.statusText)
      return null
    }

    const roles = await response.json()

    const studentRole = roles.find(
      (r: { id: string; title: string }) => r.title.toLowerCase() === 'student',
    )

    if (studentRole) {
      console.log('ID du rôle Student:', studentRole.id)
      return studentRole.id
    } else {
      console.warn('Rôle "Student" non trouvé.')
      return null
    }
  } catch (error) {
    console.error('Erreur lors de la récupération du rôle Student:', error)
    return null
  }
}

// const totalStudent = computed(()=>{return (records.value && records.value.length)??0});

// Computed properties
const filteredStudents = computed<Student[]>(() => {
  let filtered = students.value

  // Filter by search text
  if (searchText.value.trim()) {
    const search = searchText.value.toLowerCase().trim()
    filtered = filtered.filter(
      (student) =>
        student.name.toLowerCase().includes(search) ||
        student.email.toLowerCase().includes(search) ||
        student.course.toLowerCase().includes(search),
    )
  }

  if (selectedStatus.value !== 'all') {
    filtered = filtered.filter((student) => student.status.value === selectedStatus.value)
  }

  return filtered
})

// const filterOptions = [
//   { name: 'Newest', api: 'new' },
//   { name: 'Oldest ', api: 'old' },
//   { name: 'A-Z', api: 'a-z' },
//   { name: 'Z-A', api: 'z-a' },
//   { name: 'Published First', api: 'published' },
//   { name: 'Unpublished First', api: 'Unpublished' },
// ]



const setShowList = (value: boolean): void => {
  showList.value = value
}


const handleView = (student: Student): void => {
  console.log('Voir le profil de:', student.name)
  activeDropdown.value = null
}

const handleEdit = (student: Student): void => {
  console.log('Modifier:', student.name)
  activeDropdown.value = null
}

const handleDelete = (student: Student): void => {
  console.log('Supprimer:', student.name)
  activeDropdown.value = null
  if (confirm(`Êtes-vous sûr de vouloir supprimer ${student.name} ?`)) {
    const index = students.value.findIndex((s) => s.id === student.id)
    if (index > -1) {
      students.value.splice(index, 1)
    }
  }
}


onMounted(async () => {
  setTimeout(async () => {
    await getStudentsLocal()
    loading.value = false
  }, 500)
})




</script>
