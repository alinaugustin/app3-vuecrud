import Vue from 'vue'
import Router from 'vue-router'
import store from './store.js'
import Home from './views/Home.vue'
import Login from '@/components/Login'
import Editpost from '@/components/Editpost'
import Listusers from '@/components/Listusers'
import Registeruser from '@/components/Registeruser'
import Dashboard from '@/components/Dashboard'
import Editusers from '@/components/Editusers'

Vue.use(Router)

let router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/editpost',
      name: 'Editpost',
      component: Editpost,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/listusers',
      name: 'Listusers',
      component: Listusers,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/registeruser',
      name: 'Registeruser',
      component: Registeruser,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard,
      meta: {
        requiresAuth: true
      }
    },
      {
        path: '/editusers',
        name: 'Editusers',
        component: Editusers,
        meta: {
          requiresAuth: true
        }
    }
  ]

})
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // console.log(store)
    if (store.getters.isLoggedIn) {
      next()
      return
    }
    next('/login')
  } else {
    next()
  }
})

export default router