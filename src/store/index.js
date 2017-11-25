import Vue from 'vue'
import Vuex from 'vuex'
// import VuexPersist from 'vuex-persist'

import users from './services/users'

import auth from './modules/auth'
import websocket from './modules/websocket'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    users,
    auth,
    websocket
  },
  plugins: [createPersistedState({key: 'vuexx'})]
})
