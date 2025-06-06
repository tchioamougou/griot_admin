<template>
  <admin-layout>
    <div class="translate-y-20">
      <ComponentCard :cardTitle="cardTitle">
        <template #button>
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
              />
            </svg>
            <span class="ml-2 text-nowrap">{{ $t('go_back') }}</span>
          </button>
        </template>

        <form @submit.prevent="handleSubmit" class="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
          <!-- First Name -->
          <Input
            :lb="$t('firstName')"
            :placeholder="$t('enter_firstName')"
            id="firstName"
            :forLabel="'firstName'"
            v-model="form.firstName"
          />

          <!-- Last Name -->
          <Input
            :lb="$t('lastName')"
            :placeholder="$t('enter_your_lastName')"
            id="lastName"
            :forLabel="'lastName'"
            v-model="form.lastName"
          />

          <!-- Email -->
          <Input
            :lb="$t('email')"
            :placeholder="$t('enter_email')"
            id="email"
            :forLabel="'email'"
            v-model="form.email"
          />

          <!-- Phone -->
          <Input
            :lb="$t('phone')"
            :placeholder="$t('enter_your_phone')"
            id="phone"
            :forLabel="'phone'"
            v-model="form.phone"
          />

          <!-- Role -->
          <Select
            class="col-span-1 md:col-span-2"
            :lb="$t('role')"
            :options="rolesOptions"
            v-model="form.roleId"
          />

          <!-- Error message -->
          <div v-if="showError" class="col-span-2 text-red-500 font-medium">
            {{ errorMessage }}
          </div>

          <!-- Buttons -->
          <div class="col-span-2 flex justify-end gap-4 mt-6">
            <button
              type="button"
              @click="router.back()"
              class="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium px-4 py-2 rounded-lg shadow"
            >
              {{ $t('cancel') }}
            </button>

            <button
              :disabled="loading"
              type="submit"
              class="bg-blue-500 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg shadow flex items-center gap-2"
            >
              <template v-if="!loading">{{ cardTitle }}</template>
              <template v-else>
                <Spinner class="w-4 h-4" />
                {{ $t('processing') }}...
              </template>
            </button>
          </div>
        </form>
      </ComponentCard>
    </div>
  </admin-layout>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import AdminLayout from '@/components/layout/AdminLayout.vue'
import ComponentCard from '@/components/common/ComponentCard.vue'
import Input from '@/components/forms/FormElements/Input.vue'
import Select from '@/components/forms/FormElements/Select.vue'
import Spinner from '@/components/spinner/Spinner.vue'
import { useI18n } from 'vue-i18n'
import { getAllRoles, createUsers } from '@/services/griot_service'

const props = defineProps({
  action: { type: String, default: 'create' },
})

const router = useRouter()
const loading = ref(false)
const showError = ref(false)
const errorMessage = ref('')
const rolesOptions = ref<{ label: string; value: string }[]>([])

const { t } = useI18n()

const form = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  roleId: ''
})

const cardTitle = computed(() => {
  const validActions = ['edit', 'delete', 'create']
  const safeAction = validActions.includes(props.action || '') ? props.action : 'edit'
  return t('user.actionTitle', {
    action: t(`actions.${safeAction}`)
  })
})

const validData = (): boolean => {
  const { email, firstName, lastName, phone, roleId } = form.value
  return !!(email && firstName && lastName && phone && roleId)
}

const handleSubmit = () => {
  console.log(`${cardTitle.value}:`, form.value)
  if (validData()) {
    showError.value = false
    errorMessage.value = ''

    // createUser()
  } else {
    showError.value = true
    errorMessage.value = 'Please fill all required fields'
  }
}

onMounted(async () => {
  const response = await getAllRoles()
  if (response.ok) {
    const result = await response.json()
    rolesOptions.value = result.map((r: any) => ({ label: r.title, value: r.id }))
  }
})
</script>
