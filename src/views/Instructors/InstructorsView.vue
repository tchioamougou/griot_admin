<template>
  <AdminLayout>
    <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
      <!-- Header Section -->
      <div class="bg-white border-b border-gray-200 rounded-t-xl dark:bg-gray-900">
        <div class="px-6 py-8">
          <div class="flex items-center justify-between">
            <div>
              <div class="flex items-center space-x-3">
                <div class="p-2 bg-indigo-100 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-user-round-check-icon lucide-user-round-check text-indigo-600"><path d="M2 21a8 8 0 0 1 13.292-6"/><circle cx="10" cy="8" r="5"/><path d="m16 19 2 2 4-4"/></svg>
                </div>
                <div>
                  <h1 class="text-3xl font-bold text-gray-900 dark:text-white">{{ $t('instructors') }}</h1>
                  <p class="text-sm text-gray-500 mt-1">{{ $t('manage_instructors') }}</p>
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
              <span class="font-medium text-gray-900">{{ totalInstructor }}</span> {{ $t('instructors') }}
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
        <div v-if="filteredInstructors.length === 0" class="text-center py-12">
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
          <h3 class="mt-4 text-lg font-medium text-gray-900">{{ $t('no_instructor') }}</h3>
          <p class="mt-2 text-sm text-gray-500">{{ $t('try_search') }}</p>
        </div>

        <!-- Card View -->
        <div v-else-if="!showList" >
          <div class="">
            <InstructorCardList
              :records="filteredInstructors"
              :page-size="6"
              @view="handleView"
              @edit="handleEdit"
              @delete="handleDelete"
            />

        </div>

        </div>


        <!-- List View -->
        <div v-else>
          <div class="overflow-x-auto">
            <TableComponent
              :items="columns"
              :datas="filteredInstructors"
              :showHeader="true"
              :title="$t('instructors')"
              :pageSize="10"
              :pagination="true"
              @pageChange="handlePageChange"
              :showButtonAllElement="true"
              :filterable="true"
              :loading="loading"
              @view="handleView"
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
import InstructorCardList from '@/components/cards/InstructorCardList.vue'
import TableComponent from '@/components/tables/TableComponent.vue'
import Select from '@/components/forms/FormElements/Select.vue'
import { getUserByRoles, getAllRoles } from '@/services/griot_service'
import type { TableColumn } from '@/types/table'
import {formatDateT} from '@/components/utilities/UtilityFunction'
import { useI18n } from "vue-i18n";
import type { ComputedRef } from 'vue'


const showList = ref<boolean>(false)
const searchText = ref<string>('')
const selectedStatus = ref<string>('all')
const activeDropdown = ref<number | null>(null)
const records = ref([]);
const showError = ref(false);
const pageNumber = ref(1)
const pageSize = ref(10)
const loading = ref(true)
const { t } = useI18n();

const columns:ComputedRef<TableColumn[]>  = computed(()=> [
  { name: 'name', label: t('instructor_name'), sortable: true, type: 'text' },
  { name: 'headLine', label: t('headline'), type: 'text', sortable: true },
  { name: 'totalCourses', label: t('total_course'), type: 'text', sortable: true },
  { name: 'totalStudents', label: t('students'), type: 'text', sortable: true },
  { name: 'rating', label: t('rating'), type: 'rating', sortable: true },
  { name: 'date', label: t('joined'), type: 'text', sortable: true },
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


const totalInstructor = computed(() => { return (records.value && records.value.length) ?? 0 });

const getInstructorLocal = async () => {
  try {
    const instructorId = await getInstructorRoleId()
    if (instructorId) {
      const response = await getUserByRoles(
        instructorId,
        searchText.value ?? '',
        pageNumber.value,
        pageSize.value,
      )

      console.log('Response =>', response)

      if (!response.ok) {
        console.error('Erreur HTTP:', response.status)
        return
      }

      const result = await response.json()
      records.value = result.map((i:any)=>{
        return {
          ...i,
          date: formatDateT(i.createdDate)
        }
      })
      records.value.sort((a:any, b:any) => a.name.localeCompare(b.name));
      console.log('Result =>', records.value)
    }

  } catch (error) {
    console.error('Erreur de récupération des étudiants =>', error)
  }
}

const getInstructorRoleId = async (): Promise<string | null> => {
  try {
    const response = await getAllRoles()

    if (!response.ok) {
      console.error('Erreur lors de la récupération des rôles:', response.statusText)
      return null
    }

    const roles = await response.json()

    const instructorRole = roles.find(
      (r: { id: string; title: string }) => r.title.toLowerCase() === 'instructor',
    )

    if (instructorRole) {
      console.log('ID du rôle Instructor:', instructorRole.id)
      return instructorRole.id
    } else {
      console.warn('Rôle "instructor" non trouvé.')
      return null
    }
  } catch (error) {
    console.error('Erreur lors de la récupération du rôle instructor:', error)
    return null
  }
}

const filteredInstructors = computed<any[]>(() => {
  let filtered = records.value
  if (searchText.value.trim()) {
    const search = searchText.value.toLowerCase().trim()
    filtered = filtered.filter(
      (instructor:any) =>
        instructor.name.toLowerCase().includes(search) ||
        instructor.headLine.toLowerCase().includes(search)
    )
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


const handleView = (instructor: any): void => {
  console.log('Voir le profil de:', instructor.name)
  activeDropdown.value = null
}

const handleEdit = (instructor: any): void => {
  console.log('Modifier:', instructor.name)
  activeDropdown.value = null
}

const handleDelete = (instructor: any): void => {
  console.log('Supprimer:', instructor.name)
  activeDropdown.value = null
  if (confirm(`Êtes-vous sûr de vouloir supprimer ${instructor.name} ?`)) {
    const index = records.value.findIndex((s:any) => s.id === instructor.id)
    if (index > -1) {
      records.value.splice(index, 1)
    }
  }
}

onMounted(async () => {
  setTimeout(async () => {
    await getInstructorLocal()
    loading.value = false
  }, 500)
})

const handlePageChange =(page: number) =>{
  pageNumber.value = page;
  console.log('Page changed to:', page)
}



</script>
