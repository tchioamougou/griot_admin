<template>
  <div class="space-y-6 bg-white dark:bg-gray-950 p-8 rounded-xl shadow-sm">
    <h2 class="text-xl font-semibold text-gray-800 dark:text-white">
      {{ $t('notification_setting') }}
    </h2>

    <div class="bg-gray-50 p-5 mb-4 rounded-lg border border-gray-200 dark:bg-gray-950 dark:text-white">
        <h3 class="text-lg font-medium mb-3">{{ t('preferences') }}</h3>
        <div class="space-y-3">
          <div class="flex items-center justify-between">
            <div>
              <h4 class="text-sm font-medium">{{ t('language') }}</h4>
              <p class="text-xs text-gray-500">{{ t('select_yourpreferred_language') }}</p>
            </div>
              <ButtonLanguage></ButtonLanguage>
          </div>

          <div class="flex items-center justify-between">
            <div>
              <h4 class="text-sm font-medium">{{ t('timezone') }}</h4>
              <p class="text-xs text-gray-500">{{ t('setyour_localtimezone') }}</p>
            </div>
            <div class="w-64">
            <Select :options="timezones"  v-model="preferences.timezone"/>
            </div>
          </div>

          <div class="flex items-center justify-between pt-8 mt-10 ">
            <div>
              <h4 class="text-sm font-medium">{{ t('dark_mode') }}</h4>
              <p class="text-xs text-gray-500">{{ t('enable_darktheme') }}</p>
            </div>
            <label class="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" v-model="preferences.darkMode" class="sr-only peer">
              <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brand-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-600"></div>
            </label>
          </div>

          <div class="flex items-center justify-between pt-2">
            <div>
              <h4 class="text-sm font-medium">{{ t('email_notifications') }}</h4>
              <p class="text-xs text-gray-500">{{ t('receive_email_notifications') }}</p>
            </div>
            <label class="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" v-model="preferences.emailNotifications" class="sr-only peer">
              <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brand-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-600"></div>
            </label>
          </div>
        </div>
      </div>
  </div>
  </template>
  <script setup lang="ts">
import { useI18n } from 'vue-i18n'
import {ref,computed,watch,defineAsyncComponent} from 'vue'
import { useTheme } from '@/composables/useTheme'
import ButtonLanguage from '@/components/buttons/ButtonLanguage.vue'


const Select = defineAsyncComponent(() => import('@/components/forms/FormElements/Select.vue'));
const { toggleTheme }: any = useTheme()
const { t } = useI18n()

const preferences = ref({
  language: 'en',
  timezone: 'UTC',
  darkMode: false,
  emailNotifications: true
});
watch(() => preferences.value.darkMode, (isDark:boolean) => {
  toggleTheme(isDark ? 'dark' : 'light')
})
const timezones = computed(() => [
  { value: 'UTC', label: t('timezones.utc') },
  { value: 'America/New_York', label: t('timezones.et') },
  { value: 'America/Chicago', label: t('timezones.ct') },
  { value: 'America/Denver', label: t('timezones.mt') },
  { value: 'America/Los_Angeles', label: t('timezones.pt') },
  { value: 'Europe/Paris', label: t('timezones.cet') },
])
</script>
