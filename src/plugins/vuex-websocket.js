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

export default function VuexWebsocket (options, path, loginChecker, tokenChecker) {
  return store => {
    console.log(options)
    path = options.path || 'ws://127.0.0.1:8080'
    loginChecker = options.loginChecker(store.state) || !!options.loginChecker
    tokenChecker = options.tokenChecker(store.state) || !!options.tokenChecker
    console.log(loginChecker)
    console.log(tokenChecker)

    if (loginChecker && tokenChecker) {
      var socket = new WebSocket(path + tokenChecker)
    }

    store.subscribe(mutation => {
      if (mutation.type === 'socketOnMessage') {
        socket.send(JSON.stringify(mutation.payload))
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
