
<template>
    <admin-layout>
  <div class="min-h-screen bg-gray-50 p-6">
    <div class="max-w-7xl mx-auto">
      <!-- Header -->
      <div class="mb-8 inline-flex items-center space-x-2 text-gray-700">
        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chart-spline-icon lucide-chart-spline"><path d="M3 3v16a2 2 0 0 0 2 2h16"/><path d="M7 16c.5-2 1.5-7 4-7 2 0 2 3 4 3 2.5 0 4.5-5 5-7"/></svg>
        <h1 class="text-3xl font-semibold text-gray-900 mb-2">{{ $t('earnings') }}</h1>
      </div>

      <!-- Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div class="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-500 mb-1">{{ $t('total_revenus') }}</p>
              <!-- <p class="text-2xl font-bold text-gray-900">{{ formatCurrency(totalEarnings) }}</p> -->
              <p class="text-2xl font-bold text-gray-900">{{ totalEarnings }}FCFA</p>
            </div>
            <div class="p-3 bg-green-100 rounded-full">
              <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
              </svg>
            </div>
          </div>
          <div class="mt-4 flex items-center">
            <span class="text-green-500 text-sm font-medium">+12.5%</span>
            <span class="text-gray-500 text-sm ml-2">vs {{ $t('last_month') }}</span>
          </div>
        </div>

        <div class="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-500 mb-1">{{ $t('this_month') }}</p>
              <p class="text-2xl font-bold text-gray-900">{{ monthlyEarnings }} FCFA</p>
            </div>
            <div class="p-3 bg-blue-100 rounded-full">
              <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
              </svg>
            </div>
          </div>
        </div>

        <!-- <div class="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-500 mb-1">Cours Vendus</p>
              <p class="text-2xl font-bold text-gray-900">{{ totalCoursesSold }}</p>
            </div>
            <div class="p-3 bg-purple-100 rounded-full">
              <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
              </svg>
            </div>
          </div>
        </div> -->

        <div class="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-500 mb-1">{{ $t('total_students') }}</p>
              <p class="text-2xl font-bold text-gray-900">{{ totalStudents }}</p>
            </div>
            <div class="p-3 bg-orange-100 rounded-full">
              <svg class="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div class="overflow-x-auto">
            <TableComponent
              :items="columns"
              :datas="recentTransactions"
              :showHeader="true"
              :title="$t('recent_transaction')"
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
</admin-layout>
</template>

<script setup lang="ts">
import AdminLayout from '@/components/layout/AdminLayout.vue';
import TableComponent from '@/components/tables/TableComponent.vue';
import { ref, computed } from 'vue'
import { useI18n } from "vue-i18n";
import type { ComputedRef } from 'vue'
import type { TableColumn } from '@/types/table'

interface Transaction {
  id: string
  courseName: string
  courseImage: string
  category: string
  studentName: string
  studentEmail: string
  amount: string
  date: string
  status: 'Complété' | 'En attente' | 'Remboursé'
}

// Data
const totalEarnings = ref(15420.50)
const monthlyEarnings = ref(3240.80)
const totalStudents = ref(142)
const loading=ref(false)

const { t } = useI18n();

const columns:ComputedRef<TableColumn[]>  = computed(()=> [
  { name: 'courseName', label: t('course_name'), sortable: true, type: 'text' },
  { name: 'studentName', label: t('student_name'), type: 'text', sortable: true },
  { name: 'amount', label: t('amount'), type: 'text', sortable: true },
  { name: 'date', label: t('date'), type: 'text', sortable: true },
])

const recentTransactions = ref<Transaction[]>([
  {
    id: '1',
    courseName: 'Vue.js Masterclass',
    courseImage: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=100',
    category: 'Développement Web',
    studentName: 'Jean Dupont',
    studentEmail: 'jean@email.com',
    amount: '89000 FCFA',
    date: '2024-12-15',
    status: 'Complété'
  },
  {
    id: '2',
    courseName: 'Python pour Débutants',
    courseImage: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=100',
    category: 'Programmation',
    studentName: 'Marie Martin',
    studentEmail: 'marie@email.com',
    amount: '89000 FCFA',
    date: '2024-12-15',
    status: 'Complété'
  },
  {
    id: '3',
    courseName: 'Design System avec Figma',
    courseImage: 'https://images.unsplash.com/photo-1558655146-364adaf25c8d?w=100',
    category: 'Design',
    studentName: 'Pierre Leroy',
    studentEmail: 'pierre@email.com',
    amount: '89000 FCFA',
    date: '2024-12-15',
    status: 'En attente'
  }
])

// Methods
const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR'
  }).format(amount)
}

const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('fr-FR', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(date)
}

// const getStatusClass = (status: string): string => {
//   switch (status) {
//     case 'Complété':
//       return 'bg-green-100 text-green-800'
//     case 'En attente':
//       return 'bg-yellow-100 text-yellow-800'
//     case 'Remboursé':
//       return 'bg-red-100 text-red-800'
//     default:
//       return 'bg-gray-100 text-gray-800'
//   }
// }
</script>
