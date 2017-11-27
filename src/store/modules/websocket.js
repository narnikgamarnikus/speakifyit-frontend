const state = {
  isConnected: false,
  message: '',
  reconnectError: false
}

const getters = {}

const mutations = {
  socketOnOpen (state, event) {
    console.log(event)
    state.isConnected = true
    console.log(state.isConnected = true)
  },
  socketOnClose (state, event) {
    state.isConnected = false
    console.log(state.isConnected = false)
  },
  socketOnError (state, event) {
    console.error(state, event)
  },
  socketOnMessage (state, paylaod) {
    state.message = paylaod
    console.log(paylaod)
  },
  socketReconnect (state, count) {
    console.info(state, count)
  },
  socketReconnectError (state) {
    state.reconnectError = true
    console.log('state.reconnectError = true')
  }
}/*
const mutations = {
  SOCKET_ONOPEN (state, event) {
    state.isConnected = true
  },
  SOCKET_ONCLOSE (state, event) {
    state.isConnected = false
  },
  SOCKET_ONERROR (state, event) {
    console.error(state, event)
  },
  // default handler called for all methods
  SOCKET_ONMESSAGE (state, message) {
    state.message = message
  },
  SOCKET_RECONNECT (state, count) {
    console.info(state, count)
  },
  SOCKET_RECONNECT_ERROR (state) {
    state.reconnectError = true
  }

  // mutations for reconnect methods
  [ws.WS_RECONNECT] (state, count) {
    console.info (state, count)
  },
  [ws.WS_RECONNECT_ERROR] (state) {
    state.socket.reconnectError = true
  }
}
*/

const actions = {
  sendMessage (context, payload) {
    context.commit('socketOnMessage', payload)
    console.log(state.message)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
