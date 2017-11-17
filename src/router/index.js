import Vue from 'vue'
import Router from 'vue-router'
import Users from '@/components/Users.vue'
import Home from '@/components/Home.vue'
import Login from '@/components/Login.vue'
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
    },
    {
      path: '/users',
      name: 'users',
      component: Users,
      meta: { requiresAuth: false }
    },
    {
      path: '/chat',
      name: 'chat',
      component: Chat,
      meta: { requiresAuth: false }
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
