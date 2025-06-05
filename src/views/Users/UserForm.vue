<template>
  <admin-layout>
    <div class="translate-y-20">
      <ComponentCard :cardTitle="`${getAction(props.action)} User`">
        <template v-slot:button>
          <button class="flex items-center" @click="router.back()">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-5"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
              /></svg
            >&nbsp;&nbsp;
            <span class="text-nowrap">{{ 'Go back' }}</span>
            &nbsp;&nbsp;&nbsp;&nbsp;
          </button>
        </template>
        <form @submit.prevent="handleSubmit" class="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
          <!-- First Name -->
          <div class="col-span-1">
            <Input
              :lb="'firstName'"
              :placeholder="'Enter first name'"
              :id="'firstName'"
              :forLabel="'firstName'"
              v-model="form.firstName"
            />
          </div>

          <!-- Last Name -->
          <div class="col-span-1">
            <Input
              :lb="'lastName'"
              :placeholder="'Enter last name'"
              :id="'lastName'"
              :forLabel="'lastName'"
              v-model="form.lastName"
            />
          </div>

          <!-- Email -->
          <div class="col-span-1">
            <Input
              :lb="'Email'"
              :placeholder="'Enter email'"
              :id="'email'"
              :forLabel="'email'"
              v-model="form.email"
            />
          </div>

          <!-- Phone -->
          <div class="col-span-1">
            <Input
              :lb="'phone'"
              :placeholder="'Enter phone number'"
              :id="'phone'"
              :forLabel="'phone'"
              v-model="form.phone"
            />
          </div>

          <!-- Role -->
          <div class="col-span-1 md:col-span-2">
            <Select :lb="'Role'" :options="rolesOptions" />
          </div>

          <!-- Buttons -->
          <div class="col-span-1 md:col-span-2 flex justify-end gap-4 mt-6">
            <button
              type="button"
              @click="router.back()"
              class="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium px-4 py-2 rounded-lg shadow"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-2 rounded-lg shadow"
            >
              {{ getAction(props.action) }}
            </button>
          </div>
        </form>
      </ComponentCard>
    </div>
  </admin-layout>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import AdminLayout from '@/components/layout/AdminLayout.vue'
import ComponentCard from '@/components/common/ComponentCard.vue'
import { getAllRoles } from '@/services/griot_service'
import Input from '@/components/forms/FormElements/Input.vue'
import Select from '@/components/forms/FormElements/Select.vue'

const props = defineProps({
  action: { type: String, default: 'create' },
})

const router = useRouter()

const form = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  role: '',
})

const rolesOptions = ref<{ name: string; value: string }[]>([])

const getAction = (act: string | undefined) => {
  switch (act) {
    case 'edit':
      return 'Update'
    case 'delete':
      return 'Delete'
    case 'create':
      return 'Save'
    default:
      return 'Update'
  }
}

const handleSubmit = () => {
  console.log(`${getAction(props.action)} user:`, form.value)
  // Ici tu peux envoyer form.value à ton backend
}

onMounted(async () => {
  const response = await getAllRoles()
  if (response.ok) {
    const result = await response.json()
    rolesOptions.value = result.map((r) => ({ label: r.title, value: r.id }))
  }
})
</script>
