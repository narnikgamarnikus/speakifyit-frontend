import axios from 'axios'

const state = {
  loggedIn: false, // !!localStorage.getItem('speakifyittoken'),
  profile: {},
  validation: {email: true},
  authError: false,
  token: '' // localStorage.getItem('speakifyittoken') || ''
}

const getters = {}

const mutations = {
  login (state) {
    state.loggedIn = true
  },
  logout (state) {
    state.loggedIn = false
  },
  setProfile (state, payload) {
    state.profile = payload
  },
  setValidationEmail (state, bool) {
    state.validation.email = bool
  },
  setAuthError (state, bool) {
    state.authError = bool
  },
  setToken (state, token) {
    state.token = token
  },
  removeToken (state) {
    state.token = ''
  }
}

const actions = {
  postLogin (context, payload) {
    return axios.post('http://127.0.0.1:8000/api/users/login/', payload)
        .then(response => {
          if (response.status === 200) {
            context.commit('setToken', response.data)
            context.commit('login')
          }
        })
        .catch(e => {
          context.commit('setAuthError', true)
          console.log(e)
          setTimeout(function () {
            context.commit('setAuthError', false)
          }, 2000)
        })
  },
  postLogout (context) {
    return axios.post('http://127.0.0.1:8000/api/users/logout/?token=' + this.state.auth.token)
        .then(response => {
          if (response.status === 200) {
            context.commit('logout')
            console.log(response.status)
            console.log(this.state.auth.loggedIn)
            console.log(this.state.auth.token)
            context.commit('removeToken')
          }
        })
        .catch(e => { console.log(e) })
  },
  postRegister (context, payload) {
    return axios.post('http://127.0.0.1:8000/api/users/register/', payload)
        .then(response => {
          if (response.data.status === 210) {
            context.commit('setValidationEmail', false)
          } else {
            context.commit('setValidationEmail', true)
            context.commit('login')
            context.commit('setProfile', response.data)
          }
        })
        .catch(e => { console.log(e) })
  },
  getProfile (context) {
    return axios.get('http://127.0.0.1:8000/api/users/profile/?token=' + this.state.auth.token)
        .then(response => {
          context.commit('login')
          context.commit('setProfile', response.data)
        })
        .catch(e => {
          context.commit('logout')
          console.log(e)
        })
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
