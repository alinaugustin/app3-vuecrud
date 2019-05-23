import Vue from 'vue'
import Router from 'vue-router'
import store from './store.js'
import Home from './views/Home.vue'
import Login from '@/components/Login'
import Login2 from '@/components/Login2'
import Editpost from '@/components/Editpost'
import Listusers from '@/components/Listusers'
import Registeruser from '@/components/Registeruser'
import Dashboard from '@/components/Dashboard'
import Editusers from '@/components/Editusers'
import Posts from '@/components/Posts'

import Savepostpdf from '@/components/Savepostpdf'

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
      path: '/login2',
      name: 'Login2',
      component: Login2,
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
      },
        {
          path: '/savepostpdf',
          name: 'Savepostpdf',
          component: Savepostpdf,
          meta: {
            requiresAuth: true
          }
      },
      {
        path: '/posts',
        name: 'Posts',
        component: Posts,
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