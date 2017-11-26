/*
const VuexWebsocket = {

  install (Vue, options, path, loginChecker, token) {
    options = options || {}
    path = options.path || 'ws://127.0.0.1:8080/'
    loginChecker = options.loginChecker || !!options.loginChecker
    token = options.token || !!options.token

    console.log(options)
    console.log(loginChecker)

    if (loginChecker) {
      Vue.prototype.$socket = new WebSocket(path + token)
    }
    Vue.mixin({})
  }
}

export default VuexWebsocket

const VuexWebsocket = store => {
  // вызывается после инициализации хранилища
  store.subscribe((mutation, state) => {
    // вызывается после каждой мутации
    // мутация передаётся в формате `{ type, payload }`.
  })
}
*/

export default function VuexWebsocket (
  options, path, loginChecker, tokenChecker,
  reconnection, reconnectionAttempts, reconnectionDelay
  ) {
  return store => {
    reconnection = options.reconnection || false
    reconnectionAttempts = options.reconnectionAttempts || Infinity
    reconnectionDelay = options.reconnectionDelay || 1000
    var reconnectTimeoutId = 0
    var reconnectionCount = 0
    console.log(options)
    path = options.path || 'ws://127.0.0.1:8080'
    loginChecker = options.loginChecker(store.state) || !!options.loginChecker
    tokenChecker = options.tokenChecker(store.state) || ''// !!options.tokenChecker
    console.log(loginChecker)
    console.log(tokenChecker)

    if (loginChecker && tokenChecker) {
      var socket = new WebSocket(path + tokenChecker)
      // connect()
    }

    // var connect = function () {
    //  var socket = new WebSocket(path + tokenChecker)
    // }

    socket.onopen = function () {
      store.commit('socketOnOpen', 'hello world')
      console.log('Соединение установлено.')
    }

    var reconnect = function () {
      if (reconnectionCount <= reconnectionAttempts) {
        reconnectionCount++
        clearTimeout(reconnectTimeoutId)

        reconnectTimeoutId = setTimeout(() => {
          store.commit('socketReconnect', reconnectionCount)

          // if (store) { passToStore('SOCKET_RECONNECT', this.reconnectionCount) }
          // connect()
          // onEvent()
          WebSocket(path + tokenChecker)
        }, reconnectionDelay)
      } else {
        store.commit('socketReconnectError', true)
        // if (store) { passToStore('SOCKET_RECONNECT_ERROR', true) }
      }
    }

    console.log(reconnect)

    switch (socket.readyState) {
      case 0:
        console.log('The connection has not yet been established.')
        break
      case 1:
        console.log('The connection is established and communication is possible.')
        break
      case 2:
        console.log('The connection is going through the closing handshake.')
        break
      case 3:
        console.log('The connection has been closed or could not be opened.')
        break
    }

    socket.onclose = function (event) {
      if (event.wasClean) {
        console.log('Соединение закрыто чисто')
      } else {
        console.log('Обрыв соединения') // например, "убит" процесс сервера
      }
      console.log('Код: ' + event.code + ' причина: ' + event.reason)
    }

    socket.onmessage = function (event) {
      console.log('Получены данные ' + event.data)
    }

    socket.onerror = function (error) {
      console.log('Ошибка ' + error.message)
    }

    store.subscribe(mutation => {
      if (mutation.type === 'socketOnMessage') {
        if (typeof mutation.payload === 'string') {
          socket.send(mutation.payload)
        } else {
          socket.send(JSON.stringify(mutation.payload))
        }
      }
    })

    /*
    console.log(options.loginChecker(store.state))
    console.log(options.tokenChecker(store.state))
    var loginChecker = store.state.auth.loggedIn
    var tokenChecker = store.state.auth.token
    console.log(loginChecker)
    console.log(tokenChecker)
    */
  }
}
