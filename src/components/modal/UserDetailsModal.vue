
<template>
  <div class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto modal z-99999">
    <div class="bg-white w-full max-w-4xl max-h-[90vh] rounded-3xl shadow-2xl overflow-hidden relative animate-scale-in">
      <!-- Header avec gradient et responsive -->
      <div class="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 p-4 sm:p-6 relative">
        <button
          @click="close"
          class="absolute top-4 right-4 text-white/80 hover:text-white hover:bg-white/20 rounded-full p-2 transition-all duration-200 hover:rotate-90"
        >
          <svg class="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <!-- Profile Section - Responsive Layout -->
        <div class="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6">
          <div class="relative flex-shrink-0">
            <img
              v-if="user.picture"
              :src="user.picture"
              alt="Photo utilisateur"
              class="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-4 border-white/30 shadow-lg"
            />
            <div
              v-else
              class="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-white/30 to-white/10 backdrop-blur-sm flex items-center justify-center text-white text-xl sm:text-2xl font-bold border-4 border-white/30"
            >
              {{ userInitials }}
            </div>
            <!-- Badge de statut -->
            <div
              :class="[
                'absolute -bottom-1 -right-1 w-5 h-5 sm:w-6 sm:h-6 rounded-full border-3 sm:border-4 border-white shadow-lg',
                user.isActive ? 'bg-green-500' : 'bg-red-500'
              ]"
            ></div>
          </div>

          <div class="text-white text-center sm:text-left flex-1">
            <h2 class="text-2xl sm:text-3xl font-bold mb-1">{{ user.name }}</h2>
            <p class="text-white/80 text-base sm:text-lg mb-1">{{ user.email }}</p>
            <p class="text-white/80 text-base sm:text-md mb-3">{{ user.phoneNumber }}</p>
            <div class="flex flex-wrap justify-center sm:justify-start items-center gap-2 text-xs sm:text-sm">
              <span class="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full border border-white/30">
                {{ user.isActive ? $t('actif') : $t('inactif') }}
              </span>
              <span class="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full border border-white/30">
                {{ user.griotCredits }} {{ $t('credits') }}
              </span>
              <span class="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full border border-white/30">
                {{ user.currencySymbol }} {{ user.currencyName }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Contenu principal - Scrollable -->
      <div class="p-4 sm:p-6 lg:p-8 overflow-y-auto max-h-[calc(90vh-200px)]">
        <!-- Stats cards - Responsive Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <StatCard
            :title="$t('earnings_month')"
            :value="formatCurrency(user.earnsThisMonth)"
            icon="💰"
            gradient="from-green-400 to-emerald-600"
            bgGradient="from-green-50 to-emerald-50"
            textColor="text-green-700"
          />

          <StatCard
            :title="$t('griot_credits')"
            :value="user.griotCredits.toString()"
            icon="⭐"
            gradient="from-blue-400 to-indigo-600"
            bgGradient="from-blue-50 to-indigo-50"
            textColor="text-blue-700"
          />

          <StatCard
            :title="$t('sponsorship_code')"
            :value="user.referralCode"
            icon="🎯"
            gradient="from-purple-400 to-pink-600"
            bgGradient="from-purple-50 to-pink-50"
            textColor="text-purple-700"
            :copyable="true"
          />
        </div>

        <!-- Sections principales - Responsive Layout -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 ">
          <!-- Section Paramètres -->
          <InfoSection
            :title="$t('setting')"
            icon="⚙️"
            :items="[
              {
                label: t('instructor_alerts'),
                value: user.alertInstructor,
                type: 'boolean',
                icon: '🔔'
              },
              {
                label: t('student_alerts'),
                value: user.alertStudent,
                type: 'boolean',
                icon: '📚'
              }
            ]"
          />

          <!-- Section Informations -->
          <InfoSection
            :title="$t('informations')"
            icon="📊"
            :items="[
              {
                label: t('created_date'),
                value: formatDate(user.createdDate),
                type: 'date',
                icon: '📅'
              },
              {
                label: t('last_modified'),
                value: formatDate(user.lastModifyDate),
                type: 'date',
                icon: '🔄'
              }
            ]"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, computed } from 'vue';
import InfoSection from './InfoSection.vue';
import StatCard from './StatCard.vue'
import { useI18n } from "vue-i18n";




const { t } = useI18n();

interface User {
  name: string;
  email: string;
  isActive: boolean;
  alertInstructor: boolean;
  alertStudent: boolean;
  currencyName: string;
  currencySymbol: string;
  earnsThisMonth: number;
  griotCredits: number;
  createdDate: string;
  lastModifyDate: string;
  referralCode: string;
  picture: string | null;
  phoneNumber:number | null
}

const props = defineProps<{ user: User }>();
const emit = defineEmits(['close']);

const close = () => emit('close');

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

const formatCurrency = (value: number) =>
  new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
  }).format(value);

const userInitials = computed(() => {
  const names = props.user.name.trim().split(' ');
  return names.map(n => n[0]).slice(0, 2).join('');
});
</script>
