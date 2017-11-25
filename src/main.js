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

import FlagIcon from 'vue-flag-icon'

Vue.use(VueNativeSock, 'ws://localhost:9090', { 
  reconnection: true, // (Boolean) whether to reconnect automatically (false)
  reconnectionAttempts: 5, // (Number) number of reconnection attempts before giving up (Infinity),
  reconnectionDelay: 3000, // (Number) how long to initially wait before attempting a new (1000)
})

Vue.use(FlagIcon)
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
Vue.filter('truncate', function (text, length, clamp) {
  text = text || ''
  clamp = clamp || '...'
  length = length || 30
  if (text.length <= length) return text

  var tcText = text.slice(0, length - clamp.length)
  var last = tcText.length - 1

  while (last > 0 && tcText[last] !== ' ' && tcText[last] !== clamp[0]) last -= 1

  // Fix for case when text dont have any `space`
  last = last || length - clamp.length

  tcText = tcText.slice(0, last)

  return tcText + clamp
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: {App}
})
