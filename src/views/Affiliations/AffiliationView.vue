<template>
  <AdminLayout>
    <div class="min-h-screen bg-gray-50">
      <!-- Header Section -->
      <div class="bg-white border-b border-gray-200 rounded-t-xl">
        <div class="px-6 py-8">
          <div class="flex items-center justify-between">
            <div>
              <div class="flex items-center space-x-3">
                <div class="p-2 bg-indigo-100 rounded-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="lucide lucide-badge-dollar-sign-icon lucide-badge-dollar-sign text-indigo-600"
                  >
                    <path
                      d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"
                    />
                    <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" />
                    <path d="M12 18V6" />
                  </svg>
                </div>
                <div>
                  <h1 class="text-3xl font-bold text-gray-900">affiliations</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- List View -->
      <div class="pt-20">
        <div class="overflow-x-auto">
          <TableComponent
            :items="columns"
            :datas="records"
            @pageChange="handlePageChange"
            :showHeader="true"
            title="Affiliation"
            :pageSize="10"
            :pagination="true"
            :showButtonAllElement="true"
            :filterable="true"
            :loading="loading"
            @view="handleView"
            class="modern-table"
          />
        </div>
      </div>
    </div>
  </AdminLayout>
</template>

<script setup lang="ts">
import { ref,  onMounted } from 'vue'
import AdminLayout from '@/components/layout/AdminLayout.vue'
import TableComponent from '@/components/tables/TableComponent.vue'
import { getAffiliates } from '@/services/griot_affiliation_service'
import type { TableColumn } from '@/types/table'
import { formatDateT } from '@/components/utilities/UtilityFunction'

const records = ref([])
const showError = ref(false)
let selectedAffiliate = ref(null)
const loading = ref(true)

const columns: TableColumn[] = [
  { name: 'name', label: 'Name', sortable: true, type: 'text' },
  { name: 'company', label: 'Company', type: 'text', sortable: true },
  { name: 'email', label: 'Email', type: 'url', sortable: true },
  { name: 'totalFollower', label: 'Followers', type: 'text', sortable: true },
  { name: 'status', label: 'Status', type: 'badge', sortable: true },
  { name: 'createdDate', label: 'Join date', type: 'text', sortable: true },
  { name: 'region', label: 'Region', type: 'text', sortable: true },
  {
    name: 'actions',
    label: 'Actions',
    type: 'action',
    actions: [{ name: 'View', event: 'view', icone: '👁️‍🗨️' }],
  },
]

const pageNumber = ref(1)
const pageSize = ref(10)
const isLoading = ref(false)
const totalPage = ref(1)
const totalRecord = ref(0)

const handlePageChange = (page) => {
  pageNumber.value = page
  getAffiliatesLocal()
}

const getAffiliatesLocal = async () => {
  isLoading.value = true
  try {
    const response = await getAffiliates(pageNumber.value, pageSize.value)

    console.log('Response =>', response)

    if (!response.ok) {
      console.error('Erreur HTTP:', response.status)
      return
    }

    const result = await response.json()
    isLoading.value = false
    records.value = result.records
    totalPage.value = result.totalPage
    totalRecord.value = result.total
    records.value.sort((a:any, b:any) => a.name.localeCompare(b.name));
    console.log('Result =>', records.value)
  } catch (error) {
    console.error('Erreur de récupération des étudiants =>', error)
  }
}

// const filterOptions = [
//   { name: 'Newest', api: 'new' },
//   { name: 'Oldest ', api: 'old' },
//   { name: 'A-Z', api: 'a-z' },
//   { name: 'Z-A', api: 'z-a' },
//   { name: 'Published First', api: 'published' },
//   { name: 'Unpublished First', api: 'Unpublished' },
// ]

const handleView = (affiliate: any): void => {
  selectedAffiliate.value = affiliate
  console.log('selectedAffiliate.value', selectedAffiliate.value)
}

onMounted(async () => {
  setTimeout(async () => {
    await getAffiliatesLocal()
    loading.value = false
  }, 500)
})
</script>
