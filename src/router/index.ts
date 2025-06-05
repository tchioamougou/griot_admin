import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { left: 0, top: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'Gdashboard',
      component: () => import('../views/GDashboard.vue'),
    },
    {
      path: '/course',
      name: 'Course',
      component: () => import('../views/Course/CourseView.vue'),
    },
    {
      path: '/course/:id',
      name: 'Cours',
      component: () => import('../views/Course/CourseDetails.vue'),
    },
    {
      path: '/student',
      name: 'Student',
      component: () => import('../views/Students/StudentsView.vue'),
    },
    {
      path:'/instructor',
      name: 'Instructor',
      component: () => import('../views/Instructors/InstructorsView.vue')
    },
    {
      path:'/earning',
      name: 'Earning',
      component: () => import('../views/Earnings/EarningView.vue')
    },
    {
      path:'/affiliation',
      name: 'Affiliation',
      component: () => import('../views/Affiliations/AffiliationView.vue')
    },
    {
      path:'/user',
      name: 'Users',
      component: () => import('../views/Users/UserView.vue')
    },
    {
      path:'/userForm',
      name: 'User',
      component: () => import('../views/Users/UserForm.vue')
    }



  ],
})

export default router

router.beforeEach((to, from, next) => {
  document.title = `griot-admin`
  next()
})
