import Vue from 'vue'
import Router from 'vue-router'
import Users from '@/components/Users.vue'
import Profile from '@/components/Profile.vue'
import Login from '@/components/Login.vue'
import NotFoundComponent from '@/components/NotFoundComponent.vue'
import {store} from '@/store'
Vue.use(Router)

export const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Profile
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/users',
      name: 'users',
      component: Users,
      meta: { requiresAuth: true }
    },
    {
      path: '*',
      name: 'notFound',
      component: NotFoundComponent
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.state.auth.loggedIn) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next()
  }
})
