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
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-user-round-plus-icon lucide-user-round-plus text-indigo-600"><path d="M2 21a8 8 0 0 1 13.292-6"/><circle cx="10" cy="8" r="5"/><path d="M19 16v6"/><path d="M22 19h-6"/></svg>
                </div>
                <div>
                  <h1 class="text-3xl font-bold text-gray-900">Users</h1>
                  <p class="text-sm text-gray-500 mt-1">Gérez votre liste d'utilisateurs</p>
                </div>
              </div>
            </div>
            <div>
              <button
                @click="handleAddUser"
                class="bg-green-500 text-white px-4 py-2 rounded-lg shadow hover:bg-green-700 transition flex items-center"
              >
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" stroke-width="2"
                    viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" /></svg>
                {{ $t('New User') }}
              </button>
            </div>

          </div>
        </div>
      </div>


      <!-- Content -->
      <div class="px-6 py-20">
        <div>
          <div class="overflow-x-auto">
            <TableComponent
              :items="columns"
              :datas="Users"
              :showHeader="true"
              title="Users"
              :pageSize="10"
              :pagination="true"
              :showButtonAllElement="true"
              :filterable="true"
              :loading="loading"
              :page="pageNumber"
              :total-page="totalPages"
              @change-page="onChangeCurrentPage"
              @view="onViewUser"
              class="modern-table"
            />


          </div>
        </div>
      </div>

      <UserDetailsModal v-if="showModal" :user="selectedUser" @close="showModal = false" />

    </div>
  </AdminLayout>
</template>

<script setup lang="ts">
import { ref , onMounted} from 'vue'
import AdminLayout from '@/components/layout/AdminLayout.vue'
import TableComponent from '@/components/tables/TableComponent.vue'
import { getUsers, getAllRoles } from '@/services/griot_service'
import { formatDateT } from '@/components/utilities/UtilityFunction'
import type { TableColumn } from '@/types/table'
import { useRouter } from 'vue-router'
import UserDetailsModal from '@/components/modal/UserDetailsModal.vue'



// Reactive state
const rolesOptions =ref<any[]>([])
const Users = ref<any[]>([])
const selectedUser = ref<any>(null)
const pageNumber = ref(1)
const pageSize = ref(10)
const totalPages = ref(1);
const loading = ref(true)
const showModal = ref(false)
const router = useRouter()
const columns: TableColumn[] = [
  { name: 'name', label: 'Name', sortable: true, type: 'text' },
  { name: 'email', label: 'Email', type: 'imageText', sortable: true },
  { name: 'date', label: 'Joined', type: 'text', sortable: true },
  { name: 'phoneNumber', label: 'Phone', type: 'text', sortable: true },
  {
    name: 'actions',
    label: 'Actions',
    type: 'action',
    actions: [
      { name: 'View', event: 'view', icone: '👁️‍🗨️' },
       { name: 'Edit', event: 'edit', icone: '✏️' },
      { name: 'Delete', event: 'delete', icone: '🗑️' },
    ],
  },
]


const getUsersLocal = async () => {
  try {
      const response = await getUsers(pageNumber.value, pageSize.value)
      console.log('Response =>', response)

      if (!response.ok) {
        console.error('Erreur HTTP:', response.status)
        return
      }

      const result = await response.json()
      Users.value = result.records.map((u:any)=>{
        return{
          ...u,
          date:formatDateT(u.createdDate)
        }
      });
      // totalUsers.value = result.total
       totalPages.value = result.totalPage
      loading.value = false;
      Users.value.sort((a:any, b:any) => a.name.localeCompare(b.name));
      console.log('Result =>', result)

  } catch (error) {
    loading.value = false;
    console.error('Erreur de récupération des étudiants =>', error)
  }
}

const onChangeCurrentPage =(value)=>{
  pageNumber.value = value;
  getUsersLocal();
}

const handleAddUser = () => {
  router.push('/userForm')
}


// const totalStudent = computed(()=>{return (records.value && records.value.length)??0});

// const filterOptions = [
//   { name: 'Newest', api: 'new' },
//   { name: 'Oldest ', api: 'old' },
//   { name: 'A-Z', api: 'a-z' },
//   { name: 'Z-A', api: 'z-a' },
//   { name: 'Published First', api: 'published' },
//   { name: 'Unpublished First', api: 'Unpublished' },
// ]





const onViewUser = (u: any): void => {
  selectedUser.value = u
  showModal.value = true
  console.log('Voir le profil de:', u)

}

// const handleEdit = (student: Student): void => {
//   console.log('Modifier:', student.name)
//   activeDropdown.value = null
// }

// const handleDelete = (student: Student): void => {
//   console.log('Supprimer:', student.name)
//   activeDropdown.value = null
//   if (confirm(`Êtes-vous sûr de vouloir supprimer ${student.name} ?`)) {
//     const index = students.value.findIndex((s) => s.id === student.id)
//     if (index > -1) {
//       students.value.splice(index, 1)
//     }
//   }
// }


onMounted(async () => {
  setTimeout(async () => {
    await getUsersLocal()
    loading.value = false
  }, 500)
})




</script>
