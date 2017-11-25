import Vue from 'vue'
import Vuex from 'vuex'
// import VuexPersist from 'vuex-persist'

import users from './services/users'

import auth from './modules/auth'
import websocket from './modules/websocket'
import createPersistedState from 'vuex-persistedstate'

import VuexWebsocket from '@/plugins/vuex-websocket'

Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    users,
    auth,
    websocket
  },
  plugins: [
    createPersistedState({key: 'vuexx'}),
    VuexWebsocket({
      path: 'ws://127.0.0.1:8000/token=',
      loginChecker: state => state.auth.loggedIn,
      tokenChecker: state => state.auth.token
    })
  ]
})
