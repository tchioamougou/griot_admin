<template>
  <admin-layout>
    <SkeletonLoader v-if="isLoading || !course" />
    <div v-else class="min-h-screen bg-gradient-to-br from-indigo-500">
      <header class="sticky top-0 z-50 backdrop-blur-xl bg-white/10 border-b border-white/20">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <button @click="goBack"
              class="flex items-center gap-2 px-6 py-3 bg-white/20 hover:bg-white/30 border border-white/30 text-white rounded-full font-medium transition-all duration-300 hover:-translate-y-1 hover:shadow-xl backdrop-blur-sm">
              <i class="bi bi-arrow-left"></i>
              <span>{{ $t('go_back') }}</span>
            </button>

            <div class="text-center md:text-left">
              <h1 class="text-2xl font-bold text-white">{{ $t('course_detail') }}</h1>
              <div class="w-16 h-1 bg-gradient-to-r from-pink-400 to-yellow-400 rounded-full mt-2 mx-auto md:mx-0">
              </div>
            </div>
            <div v-if="course.status === 'Submitted'" class="flex gap-2">
              <button @click="approveCourseLocal"
                class=" py-1 px-3 bg-white/20 hover:bg-white/30 border border-white/30 text-white flex items-center justify-center transition-all duration-300 hover:scale-110 backdrop-blur-sm self-end md:self-auto cursor-pointer">
                {{ $t('approve') }}
              </button>
              <button @click="rejectCourseLocal"
                class=" py-1 px-3 bg-red-800 /20 hover:bg-red border border-white/30 text-white flex items-center justify-center transition-all duration-300 hover:scale-110 backdrop-blur-sm self-end md:self-auto cursor-pointer">
                {{ $t('reject') }}
              </button>
            </div>

          </div>
        </div>
      </header>

      <section class="relative min-h-[400px] flex items-center overflow-hidden">
        <div class="absolute inset-0 z-0">
          <img :src="course.picture" alt="Course Background" class="w-full h-full object-cover opacity-20" />
          <div class="absolute inset-0 bg-gradient-to-br from-indigo-600/80 via-purple-600/80 to-pink-600/80"></div>
        </div>

        <div class="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div class="mb-4">
            <span
              class="inline-block px-4 py-2 bg-white/20 rounded-full text-sm font-semibold backdrop-blur-sm border border-white/30 text-white">
              {{ certificate ? $t('certify') : $t('formated') }}
            </span>
          </div>

          <h1 class="text-2xl sm:text-3xl lg:text-4xl font-black mb-4 text-white leading-tight max-w-4xl">
            {{ course.title }}
          </h1>

          <p class="text-lg lg:text-xl text-white/90 mb-8 max-w-3xl">
            {{ course.subTitle }}
          </p>

          <div class="flex flex-col lg:flex-row lg:items-center gap-8 mb-8">
            <!-- Instructor Card -->
            <div v-if="instructors"
              class="flex items-center gap-4 p-4 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/20 max-w-md w-full">
              <img v-if="instructors.picture" :src="instructors.picture" alt="Photo de profil"
                class="w-16 h-16 rounded-full object-cover border border-white/30" />
              <div v-else
                class="w-16 h-16 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 flex items-center justify-center text-white font-bold text-xl">
                {{ getInitials(instructors.name) }}
              </div>

              <div>
                <h4 class="font-semibold text-lg text-white">{{ instructors.name }}</h4>
                <p v-if="instructors.email" class="text-white/80 text-sm">
                  📧 {{ instructors.email }}
                </p>
                <p class="text-white/80 text-sm">{{ instructors?.headLine }}</p>
                <p class="text-white/80 text-sm">⭐ {{ $t('note') }} : {{ instructors.rating ?? 0 }}</p>
              </div>
            </div>

            <!-- Course Stats -->
            <div class="grid grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-2xl">
              <div class="text-center">
                <p class="text-3xl font-black mb-2 text-white">{{ course.totalEnrolled }}</p>
                <p class="text-sm text-white/80">
                  {{ $t('student') }} {{ course.totalEnrolled > 1 ? 's' : '' }}
                </p>
              </div>
              <div class="text-center">
                <p class="text-3xl font-black mb-2 text-white">{{ course.totalDurations }}h</p>
                <p class="text-sm text-white/80">{{ $t('duration') }}</p>
              </div>
              <div class="text-center">
                <p class="text-3xl font-black mb-2 text-white">{{ course.totalLectures }}</p>
                <p class="text-sm text-white/80">{{ $t('lessons') }}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="bg-gray-50 py-16 dark:bg-gray-900">
        <div class="">
          <div class="grid lg:grid-cols-3 gap-8">
            <!-- Course Details Card -->
            <div class="lg:col-span-2">
              <div
                class="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl overflow-hidden hover:shadow-3xl transition-all duration-500 hover:-translate-y-2">
                <div class="p-8">
                  <div class="flex items-center gap-4 mb-6">
                    <h3 class="text-2xl font-bold text-gray-900 dark:text-white ">{{ $t('info_course') }}</h3>
                    <div class="flex-1 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
                  </div>

                  <!-- Info Grid -->
                  <div class="grid md:grid-cols-2 gap-4 mb-8">
                    <div
                      class="flex items-center gap-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl hover:from-blue-100 hover:to-indigo-100 transition-colors duration-300">
                      <div
                        class="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center text-white text-xl">
                        📅
                      </div>
                      <div>
                        <p class="text-sm text-gray-600">{{ $t('release_date') }}</p>
                        <p class="font-semibold text-gray-900 dark:text-white ">
                          {{ formatDate(course.lastModifyDate) }}
                        </p>
                      </div>
                    </div>

                    <div
                      class="flex items-center gap-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl hover:from-green-100 hover:to-emerald-100 transition-colors duration-300">
                      <div
                        class="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center text-white text-xl">
                        🌍
                      </div>
                      <div>
                        <p class="text-sm text-gray-600">{{ $t('language') }}</p>
                        <p class="font-semibold text-gray-900">{{ course.language }}</p>
                      </div>
                    </div>

                    <div
                      class="flex items-center gap-4 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl hover:from-yellow-100 hover:to-orange-100 transition-colors duration-300">
                      <div
                        class="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center text-white text-xl">
                        🏆
                      </div>
                      <div>
                        <p class="text-sm text-gray-600">{{ $t('certificate') }}</p>
                        <p class="font-semibold text-gray-900">
                          {{ certificate ? $t('included') : $t('not_included') }}
                        </p>
                      </div>
                    </div>

                    <div
                      class="flex items-center gap-4 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl hover:from-purple-100 hover:to-pink-100 transition-colors duration-300">
                      <div
                        class="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-white text-xl">
                        🎯
                      </div>
                      <div>
                        <p class="text-sm text-gray-600">{{ $t('level') }}</p>
                        <p class="font-semibold text-gray-900">{{ course.level }}</p>
                      </div>
                    </div>
                  </div>

                  <!-- Skills Section -->
                  <!-- <div class="mb-8">
                    <h4 class="text-lg font-semibold text-gray-900 mb-4">Compétences acquises</h4>
                    <div class="flex flex-wrap gap-3">
                      <span v-for="skill in course.skills" :key="skill"
                            class="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full text-sm font-medium hover:scale-105 transition-transform duration-200 cursor-default">
                        {{ skill }}
                      </span>
                    </div>
                  </div> -->

                  <!-- Description -->
                  <div>
                    <h4 class="text-lg font-semibold text-gray-900 mb-4 dark:text-white ">{{ $t('description') }}</h4>
                    <div v-if="course.description" class="prose prose-white max-w-none" v-html="course.description">
                    </div>
                    <p v-else class="text-gray-500 italic">
                      {{ $t('no_description') }}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Analytics Sidebar -->
            <div class="space-y-6">
              <!-- Earnings Card -->
              <div
                class="bg-white rounded-3xl shadow-2xl overflow-hidden hover:shadow-3xl transition-all duration-500 hover:-translate-y-1">
                <div class="p-6">
                  <div class="flex items-center justify-between mb-4">
                    <h3 class="text-lg font-semibold text-gray-900">{{ $t('course_income') }}</h3>
                    <div
                      class="flex items-center gap-1 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                      <i class="bi bi-arrow-up"></i>
                      <span>+0%</span>
                    </div>
                  </div>

                  <div class="flex items-end justify-center gap-2 h-24 mb-4">
                    <div class="w-6 bg-gradient-to-t from-purple-500 to-purple-300 rounded-t-lg animate-pulse"
                      style="height: 60%"></div>
                    <div class="w-6 bg-gradient-to-t from-purple-500 to-purple-300 rounded-t-lg animate-pulse"
                      style="height: 80%; animation-delay: 0.2s"></div>
                    <div class="w-6 bg-gradient-to-t from-purple-500 to-purple-300 rounded-t-lg animate-pulse"
                      style="height: 45%; animation-delay: 0.4s"></div>
                    <div class="w-6 bg-gradient-to-t from-purple-500 to-purple-300 rounded-t-lg animate-pulse"
                      style="height: 90%; animation-delay: 0.6s"></div>
                    <div class="w-6 bg-gradient-to-t from-purple-500 to-purple-300 rounded-t-lg animate-pulse"
                      style="height: 70%; animation-delay: 0.8s"></div>
                  </div>

                  <div class="text-center">
                    <p class="text-2xl font-bold text-gray-900">{{ course.earnsThisMonth }}FCFA</p>
                    <p class="text-sm text-gray-600">{{ $t('this_month') }}</p>
                  </div>
                </div>
              </div>

              <!-- Enrollments Card -->
              <div
                class="bg-white rounded-3xl shadow-2xl overflow-hidden hover:shadow-3xl transition-all duration-500 hover:-translate-y-1">
                <div class="p-6">
                  <div class="flex items-center justify-between mb-4">
                    <h3 class="text-lg font-semibold text-gray-900">{{ $t('new_registrations') }}</h3>
                    <div
                      class="flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                      <i class="bi bi-arrow-up"></i>
                      <span>+0%</span>
                    </div>
                  </div>

                  <div class="text-center">
                    <div class="relative w-24 h-24 mx-auto mb-4">
                      <div class="absolute inset-0 rounded-full bg-gradient-to-r from-blue-200 to-purple-200"></div>
                      <div class="absolute inset-2 rounded-full bg-white flex items-center justify-center">
                        <span class="text-xl font-bold text-gray-900">{{
                          course.enrolledThisMonth
                          }}</span>
                      </div>
                      <svg class="absolute inset-0 w-24 h-24 transform -rotate-90" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="10" stroke="url(#gradient)" strokeWidth="2" fill="none"
                          strokeDasharray="63" strokeDashoffset="16" strokeLinecap="round">
                          <defs>
                            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                              <stop offset="0%" stopColor="#3B82F6" />
                              <stop offset="100%" stopColor="#8B5CF6" />
                            </linearGradient>
                          </defs>
                        </circle>
                      </svg>
                    </div>
                    <p class="text-sm text-gray-600">{{ $t('new_registration_month') }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Reviews Section -->
      <section class="bg-white py-8 dark:bg-gray-900">
        <div class=" mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-8 pb-8 border-b border-gray-200">
            <div>
              <h2 class="text-3xl font-bold text-gray-900 mb-2">{{ $t('student_review') }}</h2>
              <p class="text-gray-600">{{ $t('find_out') }}</p>
            </div>

            <div class="flex items-center gap-4 mt-4 md:mt-0">
              <span class="text-4xl font-bold text-gray-900">{{ course.reviews }}</span>
              <div class="flex">
                <span v-for="star in 5" :key="star" :class="[
                  'text-2xl',
                  star <= Math.floor(course.reviews) ? 'text-yellow-400' : 'text-gray-300',
                ]">
                  ★
                </span>
              </div>
            </div>
          </div>

          <div class="">
            <TableComponent :items="columns" :datas="reviews" :showHeader="true" :title="$t('reviews')"
              :pagination="true" :pageSize="10" :showButtonAllElement="true" :filterable="true" :loading="loading"
              class="modern-table" />
          </div>
        </div>
      </section>
    </div>
  </admin-layout>
  <GConfirmation id="confirm_course" :message="$t(message)" :title="$t(titleComment)" ref="confirmation"
    @accepted="handleCommented" @cancel="onCancel" :accept-label="$t(titleComment)" :show-cancel="true">

    <!-- Warning message -->
    <div class="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded mb-4">
      <p class="font-semibold">{{ $t('courseApproval.warningTitle') }}</p>
      <p>{{ $t('courseApproval.warningBody') }}</p>
    </div>

    <!-- Comment input -->
    <div class="mb-6">
      <label for="approvalComment" class="block text-sm font-medium text-gray-700 mb-1">
        {{ $t('courseApproval.commentLabel') }}
      </label>
      <textarea id="approvalComment" v-model="comment" rows="4" :placeholder="$t('courseApproval.commentPlaceholder')"
        class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"></textarea>
    </div>
  </GConfirmation>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import AdminLayout from '@/components/layout/AdminLayout.vue'
import { formatDateT } from '@/components/utilities/UtilityFunction'
import TableComponent from '@/components/tables/TableComponent.vue'
import { getCourseById, getReviews, getUser, publishCourse, refuseCourse } from '@/services/griot_service'
import SkeletonLoader from '@/components/skeleton/SkeletonLoader.vue'
import { useRoute } from 'vue-router'
import type { TableColumn } from '@/types/table'
import type { ComputedRef } from 'vue'
import { useI18n } from "vue-i18n";
import GConfirmation from '@/ui/GConfirmation.vue'
import { createNewProduct } from '@/stripe/Products';
import { sendGriotEmail } from '@/utilities/utilityFunction'

const isLoading = ref(true)
const isError = ref(false)
const reviews = ref<any[]>([])
const loading = ref(false)
const section = 'IntendedLearners'
const route = useRoute();
const comment = ref<string>('');
const courseId = route.params.id as string
const error = ref<string | null>(null)
const course = ref<any>(null)
const instructorId = ref<any>(null)
const instructors = ref<any>(null)
const certificate = ref(true)
const { t } = useI18n();
const confirmation = ref<InstanceType<typeof GConfirmation> | null>(null);
const titleComment = ref<string>('');
const action = ref<string>('');
const message = ref<string>('');
const fetchCourseLocal = async () => {
  // isLoading.value = true;
  error.value = null
  try {
    const response = await getCourseById(courseId, section)
    if (!response.ok) throw new Error('Erreur lors de la récupération du cours')
    const data = await response.json()
    course.value = data
    instructorId.value = data.instructorId
    if (instructorId.value) await fetchInstructorCourses(instructorId.value)
  } catch (err: any) {
    error.value = err.message || 'Erreur inconnue'
    console.error('Erreur fetchCourseLocal :', err)
  }
}
const onCancel = () => confirmation.value?.hide();
onMounted(async () => {
  isLoading.value = true
  await fetchCourseLocal()
  await fetchCourseReviews()
  isLoading.value = false
})

const columns: ComputedRef<TableColumn[]> = computed(() => [
  { name: 'name', label: t('student_name'), sortable: true, type: 'text' },
  { name: 'email', label: t('date'), type: 'url', event: 'viewProfile' },
  { name: 'showPrice', label: t('rating'), type: 'text' },
  {
    name: 'actions',
    label: t('action'),
    type: 'action',
    actions: [
      { name: 'Modifier', event: 'edit', icone: '✏️' },
      { name: 'Supprimer', event: 'delete', icone: '🗑️' },
    ],
  },
])
// const props = defineProps<{
//   courseId: string
// }>()
const fetchCourseReviews = async () => {
  // isLoading.value = true
  error.value = null

  try {
    const response = await getReviews([courseId], false, false, '', 0, 1, 10)

    if (!response.ok) throw new Error('Erreur API')

    const data = await response.json()
    console.log('sssss', data)
    reviews.value = data.records
    reviews.value.sort((a: any, b: any) => a.name.localeCompare(b.name))
  } catch (err: any) {
    error.value = err.message || 'Erreur inconnue'
  }
}

const fetchInstructorCourses = async (id: string) => {
  try {
    const response = await getUser(id)

    if (!response.ok) {
      throw new Error(`Erreur ${response.status}: ${response.statusText}`)
    }

    instructors.value = await response.json()
    console.log('instructors', instructors)
    return instructors.value
  } catch (error) {
    console.error('Erreur de récupération des cours :', error)
    throw error
  }
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

const formatDate = (dt: string) => formatDateT(dt)

const goBack = () => {
  window.history.back()
}
const approveCourse = (message: string) => {
  createNewProductStripe(message);
};
const approveCourseLocal = () => {
  titleComment.value = "Approve";
  action.value = 'approve';
  confirmation.value?.show();
}
const rejectCourseLocal = () => {
  titleComment.value = "reject";
  action.value = 'refuse';
  confirmation.value?.show();
}

const refuseCourseLocal = () => {
  const request:any = {
    Comment: comment.value,
  };
   const record = course.value;
  refuseCourse(record.id, request)
    .then((response) => {
      console.log("refuseCourseLocal==> response", response);
      return response.json();
    })
    .then((result) => {
      console.log("refuseCourseLocal==>result", result);
      confirmation.value?.hideSpinner();
      confirmation.value?.hide();
      sendEmailToCourseInstructor(comment.value, {});
    })
    .catch((error) => {
      confirmation.value?.hideSpinner();
      console.log("updateCourseLocal==>error", error);
    });
};

/** this is the handle event when user has added a message*/
const handleCommented = () => {
  confirmation.value?.showSpinner();
  if (action.value === "approve") {
    approveCourse(comment.value);
  } else if (action.value === "refuse") {
    refuseCourseLocal();
  }
};

//
const sendEmailToCourseInstructor = (message: string, recipient: any) => {
  sendGriotEmail(recipient.email, "Course Approved", message);
};
//

const updateCourseLocal = (record: any, message: any, stripeProduct: any) => {
  const request: any = {
    stripeProductId: stripeProduct.id,
    Comment: message,
  };
  publishCourse(record.id, request)
    .then((response) => {
      console.log("updateCourseLocal==> response", response);
      return response.json();
    })
    .then((result) => {
      console.log("updateCourseLocal==>result", result);
      confirmation.value?.hideSpinner();
      confirmation.value?.hide();
      sendEmailToCourseInstructor(message, {});
    })
    .catch((error) => {
      confirmation.value?.hideSpinner();
      console.log("updateCourseLocal==>error", error);
    });
};
/** Create the product for user on stripe and created also the price */
const createNewProductStripe = (message: string) => {
  const record = course.value;
  const product = {
    name: record.title,
    description: record.subTitle,
    attributes: ["captions"],
    images: ["" + record.picture],
  };
  createNewProduct(product)
    .then((pro) => {
      console.log("this is the product I have created", pro);
      updateCourseLocal(record, message, pro);
    })
    .catch((error) => {
      confirmation.value?.hideSpinner();
      //message.value.toast("Error", "An error occur", "error");
      console.log("strip error", error);
    });
};
</script>


<style scoped>
/* Animations personnalisées pour les barres de graphique */
@keyframes slideUp {
  from {
    height: 0;
    opacity: 0;
  }

  to {
    height: var(--target-height);
    opacity: 1;
  }
}

.animate-slide-up {
  animation: slideUp 1s ease-out forwards;
}

/* Effet de glassmorphisme renforcé */
.backdrop-blur-xl {
  backdrop-filter: blur(24px);
}

/* Animations pour les étoiles */
@keyframes twinkle {

  0%,
  100% {
    opacity: 1;
  }

  50% {
    opacity: 0.3;
  }
}

.star-twinkle {
  animation: twinkle 2s ease-in-out infinite;
}

/* Hover effects personnalisés */
.hover-lift {
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}

.hover-lift:hover {
  transform: translateY(-8px);
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}

/* Gradient text pour les titres */
.gradient-text {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Custom scrollbar pour la section */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(135deg, #667eea, #764ba2);
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(135deg, #5a67d8, #6b46c1);
}
</style>
