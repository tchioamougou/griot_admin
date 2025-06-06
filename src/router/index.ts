import { createRouter, createWebHistory } from 'vue-router'
import { auth } from '@/firebase';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { left: 0, top: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'SignIn',
      component: () => import('../views/Auth/Signin.vue'),
    },
    {
      path: '/dashboard',
      name: 'Gdashboard',
      component: () => import('../views/GDashboard.vue'),
      meta: { requiresAuth: true }

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
      component: () => import('../views/Instructors/InstructorsView.vue'),

    },
    {
      path:'/earning',
      name: 'Earning',
      component: () => import('../views/Earnings/EarningView.vue'),

    },
    {
      path:'/review',
      name: 'Review',
      component: () => import('../views/Reviews/ReviewView.vue'),

    },
    {
      path:'/user',
      name: 'Users',
      component: () => import('../views/Users/UserView.vue'),

    },
    {
      path:'/userForm',
      name: 'UserForm',
      component: () => import('../views/Users/UserForm.vue'),

    },
    {
      path:'/role',
      name: 'Role',
      component: () => import('../views/Roles/RoleView.vue'),

    },
    {
      path:'/roleForm/:id?',
      name: 'RoleForm',
      component: () => import('../views/Roles/RolesForm.vue'),
      props: true,

    },
    {
      path:'/setting',
      name: 'Setting',
      component: () => import('../views/Setting/SettingView.vue'),

    },
  ],
})

export default router

// router.beforeEach((to, from, next) => {
//   const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
//   const currentUser = auth.currentUser;

//   document.title = `griot-admin`;

//   if (requiresAuth && !currentUser) {
//     next({ path: '/', query: { redirect: to.fullPath } });
//   } else {
//     next();
//   }
// });
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const currentUser = auth.currentUser

  document.title = 'griot-admin'

  if (requiresAuth && !currentUser) {
    next({ path: '/', query: { redirect: to.fullPath } })
  } else {
    next()
  }
})
