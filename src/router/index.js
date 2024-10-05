import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/components/Login.vue'
import store from "@/store";

Vue.use(VueRouter)

// Mock authentication check function
// You should replace this with your actual authentication logic
function isAuthenticated() {
  return !!localStorage.getItem('authToken');  // Check if a token exists in localStorage
}

const routes = [
  {
    path: '/',
    name: 'login',
    component: Login
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/myprofile',
    name: 'profile',
    component: () => import(/* webpackChunkName: "profile" */ '../components/Profile.vue'),
    meta: { requiresAuth: true }  // This route requires authentication
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import(/* webpackChunkName: "dashboard" */ '../components/DashboardStudent.vue'),
    meta: { requiresAuth: true }  // This route requires authentication
  },
  {
    path: '/about',
    name: 'about',
    meta: { requiresAuth: true } , // This route requires authentication
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/companies',
    name: 'companies',
    meta: { requiresAuth: true } , // This route requires authentication
    component: () => import(/* webpackChunkName: "about" */ '../components/Companies.vue')
  },
  {
    path: '/student',
    name: 'student',
    meta: { requiresAuth: true } ,
    component: () => import(/* webpackChunkName: "about" */ '../components/Student.vue')
  },
  {
    path: '/professor',
    name: 'professor',
    meta: { requiresAuth: true } , // This route requires authentication
    component: () => import(/* webpackChunkName: "about" */ '../components/ProfessorIndex.vue')
  },
  {
    path: '/students',
    name: 'students',
    meta: { requiresAuth: true } , // This route requires authentication
    component: () => import(/* webpackChunkName: "about" */ '../components/Students.vue')
  },
  {
    path: '/courses',
    name: 'professorCourses',
    meta: { requiresAuth: true } , // This route requires authentication
    component: () => import(/* webpackChunkName: "about" */ '../components/Courses.vue')
  },
  {
    path: '/internships',
    name: 'interships',
    meta: { requiresAuth: true } , // This route requires authentication
    component: () => import(/* webpackChunkName: "about" */ '../components/Interships.vue')
  },
  {
    path: '/invitations',
    name: 'invitations',
    meta: { requiresAuth: true } , // This route requires authentication
    component: () => import(/* webpackChunkName: "about" */ '../components/Invitations.vue')
  },
  {
    path: '/news',
    name: 'News',
    meta: { requiresAuth: true } , // This route requires authentication
    component: () => import(/* webpackChunkName: "about" */ '../components/News.vue')
  },
  // Catch-all route for non-existent paths, redirect to login
  {
    path: '*',
    redirect: '/login'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  // Check if the route requires authentication
  if (to.matched.some(record => record.meta.requiresAuth)) {
    const token = localStorage.getItem('authToken');

    if (!token) {
      next({ name: 'login' });
    } else {
      store.dispatch('getUserWithToken', token)
          .then(user => {
            // If roleId = 1 (student), prevent access to /professor route
            if (user.roleId === 1 && (to.path.startsWith('/professor') || to.path.startsWith('/internships') || to.path.startsWith('/courses'))) {
              next({ name: 'login' }); // Redirect to login if a student tries to access restricted routes
              localStorage.clear();
            } else {
              next(); // Otherwise, allow access
            }
          })
          .catch(error => {
            console.error('Error fetching user:', error);
            next({ name: 'login' }); // Redirect to login if user fetch fails
          });
    }
  } else {
    next(); // If the route doesn't require authentication, allow access
  }
});



export default router;
