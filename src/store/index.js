import Vue from 'vue'
import Vuex from 'vuex'

import users from './services/users'

import auth from './modules/auth'
import websocket from './modules/websocket'

Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    users,
    auth,
    websocket
  }
})
