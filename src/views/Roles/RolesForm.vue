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

        <form @submit.prevent="handleSubmit" class="p-4 space-y-4">
          <!-- Title -->
          <div>
            <Input
              :lb="$t('title')"
              :placeholder="$t('enter_title')"
              id="title"
              :forLabel="'title'"
              v-model="form.title"
            />
          </div>

          <!-- Description -->
          <div>
            <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
              {{ $t('description') }}
            </label>
            <textarea
              v-model="form.description"
              :placeholder="$t('enter_description')"
              rows="6"
              class="dark:bg-dark-900 h-40 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-500 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
            ></textarea>
          </div>

          <!-- Buttons -->
          <div class="flex justify-end gap-4 mt-6">
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
              <span v-if="!loading">
                {{ cardTitle }}
              </span>
              <span v-else>
                <Spinner class="w-4 h-4" />
                {{ $t('processing') }}...
              </span>
            </button>
          </div>
        </form>
      </ComponentCard>
    </div>
  </admin-layout>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';

import AdminLayout from '@/components/layout/AdminLayout.vue';
import ComponentCard from '@/components/common/ComponentCard.vue';
import Input from '@/components/forms/FormElements/Input.vue';
import Spinner from '@/components/spinner/Spinner.vue';
import { useRoleStore } from '@/composables/roleStore';
// import { createRoles } from '@/services/griot_service';

const props = defineProps({
  action: { type: String, default: 'create' },
  role: {
    type: Object,
    required: false,
  }
});

const route = useRoute();
const router = useRouter();
const { t } = useI18n();
const loading = ref(false);
const roleStore = useRoleStore()
const id = route.params.id
const isEdit = !!id
const form = ref({
  title: '',
  description: ''
});

onMounted(() => {
  if (props.role) {
    form.value.title = props.role.title || '';
    form.value.description = props.role.description || '';
  }
});


const cardTitle = computed(() =>
  t('rolesaction.actionTitles', { action: t(isEdit ? 'actions.edit' : 'actions.create') })
)


const createNewRecord = async () => {
  loading.value = true;
  try {
    const payload = [{
      title: form.value.title,
      description: form.value.description
    }];
    console.log("payload",payload)
    // const response = await createRoles(payload);
    // const result = await response.json();
    // console.log('createRoles ===> result', result);
  } catch (error) {
    console.error('createRoles ==> error', error);
  } finally {
    loading.value = false;
  }
};

const updateRecord = async () => {
  loading.value = true
  try {
    const payload = {
      id,
      title: form.value.title,
      description: form.value.description
    }
    console.log("payload",payload)
    // const response = await updateRole(payload)
    // const result = await response.json()
    // console.log('updateRole ===> result', result)
  } catch (error) {
    console.error('updateRole ==> error', error)
  } finally {
    loading.value = false
  }
}

const handleSubmit = () => {
  if (isEdit) {
    updateRecord()
  } else {
    createNewRecord()
  }
}



onMounted(() => {
  if (isEdit && roleStore.currentRole) {
    form.value.title = roleStore.currentRole.title || ''
    form.value.description = roleStore.currentRole.description || ''
    roleStore.clearRole()
  }
})

// onMounted(async () => {
//   if (isEdit) {
//     try {
//       const response = await getRoleById(id)
//       if (response.ok) {
//         const data = await response.json()
//         form.value.title = data.title || ''
//         form.value.description = data.description || ''
//       } else {
//         console.error('Erreur HTTP', response.status)
//       }
//     } catch (error) {
//       console.error('Erreur lors du chargement du rôle', error)
//     }
//   }
// })

</script>
