<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useI18n } from 'vue-i18n'
import ModalDelete from '@/components/modal/ModalDelete.vue'

const { t } = useI18n()

interface CloseAccountForm {
  reason: string
  feedback: string
  password: string
  confirmText: string
}

const form = reactive<CloseAccountForm>({
  reason: '',
  feedback: '',
  password: '',
  confirmText: ''
})

const showConfirmModal = ref(false)
const isLoading = ref(false)
const errors = reactive({
  reason: '',
  password: '',
  confirmText: ''
})

const reasons = [
  { value: 'not_using', label: t('not_using_service') },
  { value: 'privacy_concerns', label: t('privacy_concerns') },
  { value: 'too_expensive', label: t('too_expensive') },
  { value: 'technical_issues', label: t('technical_issues') },
  { value: 'found_alternative', label: t('found_alternative') },
  { value: 'other', label: t('other') }
]

const validateForm = (): boolean => {
  // Reset errors
  Object.keys(errors).forEach(key => {
    errors[key as keyof typeof errors] = ''
  })

  let isValid = true

  if (!form.reason) {
    errors.reason = t('reason_required')
    isValid = false
  }

  if (!form.password) {
    errors.password = t('password_required')
    isValid = false
  }

  if (form.confirmText.toLowerCase() !== 'delete') {
    errors.confirmText = t('confirm_text_invalid')
    isValid = false
  }

  return isValid
}

const handleSubmit = () => {
  if (validateForm()) {
    showConfirmModal.value = true
  }
}

const confirmCloseAccount = async () => {
  isLoading.value = true

  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))

    // Here you would make the actual API call to close the account
    console.log('Account closure requested:', form)

    // Show success message or redirect
    alert(t('account_closure_submitted'))

  } catch (error) {
    console.error('Error closing account:', error)
    alert(t('error_occurred'))
  } finally {
    isLoading.value = false
    showConfirmModal.value = false
  }
}

const cancelModal = () => {
  showConfirmModal.value = false
}
</script>

<template>
  <div class="py-6  ">
  <div class="bg-white dark:bg-gray-950 p-8 rounded-xl shadow-sm max-w-4xl mx-auto ">
    <!-- Header -->
    <div class="mb-8">
      <h2 class="text-2xl font-bold text-gray-900 mb-2">{{ $t('close_account') }}</h2>
      <p class="text-gray-600">
        {{ $t('close_account_description') }}
      </p>
    </div>

    <!-- Warning Notice -->
    <div class="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
      <div class="flex items-start">
        <svg class="w-5 h-5 text-red-400 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
        </svg>
        <div>
          <h3 class="text-sm font-medium text-red-800">{{ $t('warning') }}</h3>
          <div class="text-sm text-red-700 mt-1">
            <ul class="list-disc list-inside space-y-1">
              <li>{{ $t('account_data_deleted') }}</li>
              <li>{{ $t('subscriptions_cancelled') }}</li>
              <li>{{ $t('action_irreversible') }}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <!-- Form -->
    <form @submit.prevent="handleSubmit" class="space-y-6">
      <!-- Reason Selection -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          {{ $t('reason_for_closing') }} <span class="text-red-500">*</span>
        </label>
        <select
          v-model="form.reason"
          class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          :class="{ 'border-red-500': errors.reason }"
        >
          <option value="">{{ $t('select_reason') }}</option>
          <option v-for="reason in reasons" :key="reason.value" :value="reason.value">
            {{ reason.label }}
          </option>
        </select>
        <p v-if="errors.reason" class="text-red-500 text-sm mt-1">{{ errors.reason }}</p>
      </div>

      <!-- Feedback -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          {{ $t('additional_feedback') }} <span class="text-gray-400">({{ $t('optional') }})</span>
        </label>
        <textarea
          v-model="form.feedback"
          rows="4"
          class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          :placeholder="$t('feedback_placeholder')"
        ></textarea>
      </div>

      <!-- Password Confirmation -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          {{ $t('confirm_password') }} <span class="text-red-500">*</span>
        </label>
        <input
          type="password"
          v-model="form.password"
          class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          :class="{ 'border-red-500': errors.password }"
          :placeholder="$t('enter_password')"
        />
        <p v-if="errors.password" class="text-red-500 text-sm mt-1">{{ errors.password }}</p>
      </div>

      <!-- Confirmation Text -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          {{ $t('type_delete_to_confirm') }} <span class="text-red-500">*</span>
        </label>
        <input
          type="text"
          v-model="form.confirmText"
          class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          :class="{ 'border-red-500': errors.confirmText }"
          placeholder="DELETE"
        />
        <p class="text-sm text-gray-500 mt-1">{{ $t('type_delete_instruction') }}</p>
        <p v-if="errors.confirmText" class="text-red-500 text-sm mt-1">{{ errors.confirmText }}</p>
      </div>

      <!-- Submit Button -->
      <div class="pt-4">
        <button
          type="submit"
          class="w-full bg-red-600 text-white py-3 px-4 rounded-md hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 font-medium transition-colors duration-200"
        >
          {{ $t('request_account_closure') }}
        </button>
      </div>
    </form>

    <!-- Confirmation Modal -->
    <ModalDelete
      :isOpen="showConfirmModal"
      :isLoading="isLoading"
      :title="$t('confirm_account_closure')"
      :message="$t('final_confirmation_message')"
      :confirmLabel="$t('yes_delete')"
      :cancelLabel="$t('no_cancel')"
      :processingLabel="$t('processing')"
      @confirm="confirmCloseAccount"
      @cancel="cancelModal"
    />

    <!-- <div v-if="showConfirmModal" class="fixed inset-0 modal z-99999 flex items-center justify-center px-4 py-6 bg-black/40 backdrop-blur-sm">
      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl max-w-md w-full p-6 relative">
        <div class="text-center mb-6">
          <svg class="w-12 h-12 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
          <h3 class="text-lg font-semibold text-gray-900 mb-2">{{ $t('confirm_account_closure') }}</h3>
          <p class="text-gray-600">{{ $t('final_confirmation_message') }}</p>
        </div>

        <div class="flex space-x-3">
          <button
            @click="cancelModal"
            :disabled="isLoading"
            class="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 transition-colors duration-200 disabled:opacity-50"
          >
            {{ $t('cancel') }}
          </button>
          <button
            @click="confirmCloseAccount"
            :disabled="isLoading"
            class="flex-1 bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition-colors duration-200 disabled:opacity-50 flex items-center justify-center"
          >
            <svg v-if="isLoading" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            {{ isLoading ? $t('processing') : $t('confirm_close') }}
          </button>
        </div>
      </div>
    </div> -->
  </div>
</div>
</template>
