 <template>
   <admin-layout>
  <div class="min-h-screen bg-gray-50 p-6">
    <div class="max-w-7xl mx-auto">

      <div class="mb-8 flex justify-between items-center">
        <div>
          <h1 class="text-3xl font-bold text-gray-900 mb-2">{{ $t('manage_review') }}</h1>
          <p class="text-gray-600">{{ $t('approve_review') }}</p>
        </div>
        <div class="flex gap-3">
          <button
            @click="filterStatus = 'all'"
            :class="filterStatus === 'all' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'"
            class="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors hover:text-blue-500"
          >
            {{ $t('all') }} ({{ reviews.length }})
          </button>
          <button
            @click="filterStatus = 'pending'"
            :class="filterStatus === 'pending' ? 'bg-orange-600 text-white' : 'bg-white text-gray-700'"
            class="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors hover:text-orange-500"
          >
            {{ $t('pending') }} ({{ pendingCount }})
          </button>
          <button
            @click="filterStatus = 'approved'"
            :class="filterStatus === 'approved' ? 'bg-green-600 text-white' : 'bg-white text-gray-700'"
            class="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors hover:text-green-500"
          >
            {{ $t('approved') }} ({{ approvedCount }})
          </button>
          <button
            @click="filterStatus = 'rejected'"
            :class="filterStatus === 'rejected' ? 'bg-red-600 text-white' : 'bg-white text-gray-700'"
            class="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors hover:text-red-500"
          >
            {{ $t('rejected') }} ({{ rejectedCount }})
          </button>
        </div>
      </div>


      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div class="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div class="flex items-center">
            <div class="p-3 bg-blue-100 rounded-full mr-4">
              <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path>
              </svg>
            </div>
            <div>
              <p class="text-2xl font-bold text-gray-900">{{ averageRating.toFixed(1) }}</p>
              <p class="text-sm text-gray-500">{{ $t('average_rating') }}</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div class="flex items-center">
            <div class="p-3 bg-orange-100 rounded-full mr-4">
              <svg class="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <div>
              <p class="text-2xl font-bold text-gray-900">{{ pendingCount }}</p>
              <p class="text-sm text-gray-500">{{ $t('pending') }}</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div class="flex items-center">
            <div class="p-3 bg-green-100 rounded-full mr-4">
              <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <div>
              <p class="text-2xl font-bold text-gray-900">{{ approvedCount }}</p>
              <p class="text-sm text-gray-500">{{ $t('approved') }}</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div class="flex items-center">
            <div class="p-3 bg-purple-100 rounded-full mr-4">
              <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
              </svg>
            </div>
            <div>
              <p class="text-2xl font-bold text-gray-900">{{ totalReviews }}</p>
              <p class="text-sm text-gray-500">{{ $t('total_reviews') }}</p>
            </div>
          </div>
        </div>
      </div>


      <div class="space-y-6">
        <div
          v-for="review in filteredReviews"
          :key="review.id"
          class="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
        >
          <div class="flex justify-between items-start mb-4">
            <div class="flex items-start space-x-4">
              <img :src="review.studentAvatar" :alt="review.studentName" class="w-12 h-12 rounded-full object-cover">
              <div>
                <h3 class="font-semibold text-gray-900">{{ review.studentName }}</h3>
                <p class="text-sm text-gray-500">{{ review.courseName }}</p>
                <div class="flex items-center mt-1">
                  <div class="flex">
                    <svg
                      v-for="i in 5"
                      :key="i"
                      :class="i <= review.rating ? 'text-yellow-400' : 'text-gray-300'"
                      class="w-4 h-4 fill-current"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
                    </svg>
                  </div>
                  <span class="ml-2 text-sm text-gray-500">{{ formatDate(review.date) }}</span>
                </div>
              </div>
            </div>
            <div class="flex items-center space-x-2">
              <span
                :class="getStatusBadgeClass(review.status)"
                class="px-3 py-1 text-xs font-semibold rounded-full"
              >
                {{ review.status }}
              </span>
            </div>
          </div>

          <div class="mb-4">
            <p class="text-gray-700 leading-relaxed">{{ review.comment }}</p>
          </div>

          <div v-if="review.status === 'Pending'" class="flex space-x-3">
            <button
              @click="approveReview(review.id)"
              class="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
             {{ $t('approve') }}
            </button>
            <button
              @click="rejectReview(review.id)"
              class="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
              {{ $t('reject') }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  </admin-layout>
</template>

<script setup lang="ts">
import AdminLayout from '@/components/layout/AdminLayout.vue';
import { ref, computed } from 'vue'

interface Review {
  id: string
  studentName: string
  studentAvatar: string
  courseName: string
  rating: number
  comment: string
  date: Date
  status: 'Pending' | 'Approve' | 'Reject'
}

// Data
const filterStatus = ref<'all' | 'pending' | 'approved' | 'rejected'>('all')

const reviews = ref<Review[]>([
  {
    id: '1',
    studentName: 'Alice More',
    studentAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b2e2c2c2?w=100',
    courseName: 'Salesforce',
    rating: 5,
    comment: 'Very informative course with great examples. The instructor explains complex concepts clearly.',
    date: new Date('2024-12-10'),
    status: 'Pending'
  },
  {
    id: '2',
    studentName: 'Thomas Bernard',
    studentAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
    courseName: 'Python ',
    rating: 4,
    comment: 'Very good course for beginners in Python. The instructor takes the time to explain each concept and the projects are interesting.',
    date: new Date('2024-12-08'),
    status: 'Approve'
  },
  {
    id: '3',
    studentName: 'Sophie Laurent',
    studentAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100',
    courseName: 'Design System ',
    rating: 5,
    comment: 'Comprehensive and well-structured training. I was able to create my first design system thanks to this course. Thank you!',
    date: new Date('2024-12-05'),
    status: 'Pending'
  },
  {
    id: '4',
    studentName: 'Marc Dubois',
    studentAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100',
    courseName: 'Vue.js ',
    rating: 4,
    comment: 'Quality course with good practical examples. Perhaps a little fast for complete beginners.',
    date: new Date('2024-12-03'),
    status: 'Reject'
  }
])

// Computed
const filteredReviews = computed(() => {
  switch (filterStatus.value) {
    case 'pending':
      return reviews.value.filter(review => review.status === 'Pending')
    case 'approved':
      return reviews.value.filter(review => review.status === 'Approve')
      case 'rejected':
      return reviews.value.filter(review => review.status === 'Reject')
    default:
      return reviews.value
  }
})

const pendingCount = computed(() =>
  reviews.value.filter(review => review.status === 'Pending').length
)

const approvedCount = computed(() =>
  reviews.value.filter(review => review.status === 'Approve').length
)

const rejectedCount = computed(() =>
  reviews.value.filter(review => review.status === 'Reject').length
)

const totalReviews = computed(() => reviews.value.length)

const averageRating = computed(() => {
  const approvedReviews = reviews.value.filter(review => review.status === 'Approve')
  if (approvedReviews.length === 0) return 0

  const totalRating = approvedReviews.reduce((sum, review) => sum + review.rating, 0)
  return totalRating / approvedReviews.length
})

// Methods
const approveReview = (reviewId: string) => {
  const review = reviews.value.find(r => r.id === reviewId)
  if (review) {
    review.status = 'Approve'
  }
}

const rejectReview = (reviewId: string) => {
  const review = reviews.value.find(r => r.id === reviewId)
  if (review) {
    review.status = 'Reject'
  }
}

const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('fr-FR', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(date)
}

const getStatusBadgeClass = (status: string): string => {
  switch (status) {
    case 'Approve':
      return 'bg-green-100 text-green-800'
    case 'Pending':
      return 'bg-orange-100 text-orange-800'
    case 'Reject':
      return 'bg-red-100 text-red-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}
</script>
