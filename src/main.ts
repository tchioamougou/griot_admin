import './assets/main.css'
import 'jsvectormap/dist/jsvectormap.css'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { createApp, type App as VueApp } from 'vue'
import { createPinia } from 'pinia'
import { createI18n } from 'vue-i18n'
import App from './App.vue'
import router from './router'
import messages from '@/lang/index'
import { auth } from './firebase'
import { onAuthStateChanged } from 'firebase/auth'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

const i18n = createI18n({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  messages,
})

let app: VueApp<Element> | null = null

onAuthStateChanged(auth, () => {
  if (!app) {
    app = createApp(App)
    app.use(router)
    app.use(pinia)
    app.use(i18n)
    app.mount('#app')
  }
})
