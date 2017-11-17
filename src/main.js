// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import {router} from './router'
import MainContainer from './components/Main-container.vue'
import NavigationDrawer from './components/NavigationDrawer.vue'
// import Users from './components/Users.vue'
import Login from './components/Login.vue'
import Toolbar from './components/Toolbar.vue'
import Content from './components/Content.vue'

// import UserDialog from './components/UserDialog.vue'
import {store} from './store'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.css'
Vue.use(Vuetify, {
  theme: {
    primary: '#3f51b5',
    secondary: '#b0bec5',
    accent: '#8c9eff',
    error: '#b71c1c'
  }
})
// Vue.use(VueMaterial)
Vue.config.productionTip = false
Vue.component('main-container', MainContainer)
Vue.component('navigation-drawer', NavigationDrawer)
// Vue.component('users', Users)
// Vue.component('user-dialog', UserDialog)
Vue.component('login', Login)
Vue.component('toolbar', Toolbar)
Vue.component('main-content', Content)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {App}
})
