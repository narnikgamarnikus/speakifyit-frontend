const state = {
  isConnected: false,
  message: '',
  reconnectError: false
}

const getters = {}

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
    state.socket.reconnectError = true
  }
  // mutations for reconnect methods
  /*
  [ws.WS_RECONNECT] (state, count) {
    console.info (state, count)
  },
  [ws.WS_RECONNECT_ERROR] (state) {
    state.socket.reconnectError = true
  }
  */
}

const actions = {}

export default {
  state,
  getters,
  mutations,
  actions
}
