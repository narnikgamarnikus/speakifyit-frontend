// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import {router} from './router'
import {store} from './store'

import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.css'

import MainContainer from './components/Main-container.vue'
import Content from './components/Content.vue'

import infiniteScroll from 'vue-infinite-scroll'

import FlagIcon from 'vue-flag-icon'

Vue.use(FlagIcon)
Vue.use(infiniteScroll)
Vue.use(Vuetify, {
  theme: {
    primary: '#3f51b5',
    secondary: '#b0bec5',
    accent: '#8c9eff',
    error: '#b71c1c'
  }
})
Vue.config.productionTip = false
Vue.component('main-container', MainContainer)
Vue.component('main-content', Content)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {App}
})
