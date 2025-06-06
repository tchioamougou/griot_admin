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
                  <h1 class="text-3xl font-bold text-gray-900">{{ $t('roles') }}</h1>
                  <p class="text-sm text-gray-500 mt-1">{{ $t('manage_role') }}</p>
                </div>
              </div>
            </div>
            <div>
              <button
                @click="handleAddRole"
                class="bg-green-500 text-white px-4 py-2 rounded-lg shadow hover:bg-green-700 transition flex items-center"
              >
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" stroke-width="2"
                    viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" /></svg>
                {{ $t('new_role') }}
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
              :datas="Roles"
              :showHeader="true"
              :title="$t('roles')"
              :pageSize="10"
              :pagination="true"
              :showButtonAllElement="true"
              :filterable="true"
              :loading="loading"
              :total-page="totalPages"
              @edit="onEditRole"
              @delete="onDeleteRole"
              class="modern-table"
            />


          </div>
        </div>
      </div>


    </div>
    <ModalDelete
      :isOpen="showDeleteModal"
      :isLoading="isDeleting"
      :title="$t('confirm_delete')"
      :message="$t('you_are_sure')"
      :confirmLabel="$t('yes_delete')"
      :cancelLabel="$t('no_cancel')"
      :processingLabel="$t('processing')"
      @confirm="handleDelete"
      @cancel="cancelDelete"
    />

  </AdminLayout>
</template>

<script setup lang="ts">
import { ref , onMounted, computed} from 'vue'
import AdminLayout from '@/components/layout/AdminLayout.vue'
import TableComponent from '@/components/tables/TableComponent.vue'
import {  getAllRoles } from '@/services/griot_service'
import { formatDateT } from '@/components/utilities/UtilityFunction'
import type { TableColumn } from '@/types/table'
import { useRouter } from 'vue-router'
import type { ComputedRef } from 'vue'
import { useI18n } from "vue-i18n";
import { useRoleStore } from '@/composables/roleStore'
import ModalDelete from '@/components/modal/ModalDelete.vue'




// Reactive state
const { t } = useI18n();
const Roles =ref<any[]>([])
const selectedRole = ref<any>(null)
const totalPages = ref(1);
const loading = ref(true)
const showDeleteModal = ref(false)
const router = useRouter()
const roleStore = useRoleStore()
const roleToDelete = ref<any | null>(null)
const isDeleting = ref(false)

const columns: ComputedRef<TableColumn[]>  = computed(()=> [
  { name: 'id', label: t('id'), sortable: true, type: 'text' },
  { name: 'title', label: t('title'), type: 'text', sortable: true },
  { name: 'description', label: t('description'), type: 'text', sortable: true },
  { name: 'date', label: t('created_date'), type: 'text', sortable: true },
  {
    name: 'actions',
    label: t('action'),
    type: 'action',
    actions: [
       { name: 'Edit', event: 'edit', icone: '✏️' },
      { name: 'Delete', event: 'delete', icone: '🗑️' },
    ],
  },
])



const getRoles = async () => {
  try {
      const response = await getAllRoles()
      console.log('Response =>', response)

      if (!response.ok) {
        console.error('Erreur HTTP:', response.status)
        return
      }

      const result = await response.json()
       Roles.value = result
       .map((r:any)=>{
        return{
          ...r,
          date:formatDateT(r.createdDate)
        }
      });
      console.log('Result =>', result)

      loading.value = false;
      Roles.value.sort((a:any, b:any) => a.title.localeCompare(b.title));


  } catch (error) {
    loading.value = false;
    console.error('Erreur de récupération  =>', error)
  }
}

const handleAddRole = () => {
  router.push({ name: 'RoleForm' })
}


const onEditRole = (r: any): void => {
  selectedRole.value = r
  roleStore.setRole(r)
  router.push({ name: 'RoleForm', params: { id: r.id } })
  console.log('role:', r)
}


const onDeleteRole = (r: any): void => {
  roleToDelete.value = r
  showDeleteModal.value = true
}



onMounted(async () => {
  setTimeout(async () => {
    await getRoles()
    loading.value = false
  }, 500)
})

const handleDelete = async (): Promise<void> => {
  if (!roleToDelete.value) return

  isDeleting.value = true
  try {
    // await deleteRole(roleToDelete.value.id)
    console.log('Deleting role', roleToDelete.value)

  } catch (error) {
    console.error('Erreur de suppression', error)
  } finally {
    isDeleting.value = false
    showDeleteModal.value = false
    roleToDelete.value = null
  }
}

const cancelDelete = (): void => {
  showDeleteModal.value = false
  roleToDelete.value = null
}




</script>
