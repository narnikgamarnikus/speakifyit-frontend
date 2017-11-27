import Vue from 'vue'
import Router from 'vue-router'
import Users from '@/components/Users.vue'
import Home from '@/components/Home.vue'
import Login from '@/components/Login.vue'
import Logout from '@/components/Logout.vue'
import Chat from '@/components/Chat.vue'
import NotFoundComponent from '@/components/NotFoundComponent.vue'
import {store} from '@/store'
Vue.use(Router)

export const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login
      /*
      beforeEnter: (to, from, next) => {
        if (store.state.auth.loggedIn) {
          next({
            path: from.fullPath
          })
        } else {
          next()
        }
      }
      */
    },
    {
      path: '/logout',
      name: 'logout',
      component: Logout// ,
      // meta: { requiresAuth: true }
    },
    {
      path: '/users',
      name: 'users',
      component: Users,
      meta: { requiresAuth: true }
    },
    {
      path: '/chat',
      name: 'chat',
      component: Chat,
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
