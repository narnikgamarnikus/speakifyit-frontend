import axios from 'axios'

const state = {
  users: [],
  usersNext: null,
  usersPrevious: null,
  emailFail: false,
  tokenFail: false
}

const getters = {}

const mutations = {
  setUsers (state, users) {
    state.users.push(...users)
  },
  setUsersNext (state, link) {
    state.usersNext = link
  },
  setUsersPrevious (state, link) {
    state.usersPrevious = link
  },
  setFindedUsers (state, users) {
    state.users = users
  },
  setUser (state, user) {
    state.user = user
  },
  setEmailFail (state, bool) {
    state.emailFail = bool
  },
  setTokenFail (state, bool) {
    state.tokenFail = bool
  }
}

const actions = {
  getUsersList (context) {
    var url = 'http://127.0.0.1:8000/api/users/?token=' + this.state.auth.token
    if (this.state.users.usersNext !== null) {
      url = this.state.users.usersNext
    }
    return axios.get(url)
        .then(response => {
          context.commit('setUsersNext', response.data.next)
          context.commit('setUsers', response.data.results)
          context.commit('setUsersPrevious', response.data.previous)
        })
        .catch(e => { console.log(e) })
  },
  getUser (context, userId) {
    return axios.get('/api/users/' + userId)
        .then(response => { context.commit('setUser', response.data) })
        .catch(e => { console.log(e) })
  },
  searchUsers (context, query) {
    return axios.get('http://127.0.0.1:8000/api/users/search/?token=' + this.state.auth.token, { params: {'query': query} })
    .then(response => {
      context.commit('setUsersNext', response.data.next)
      context.commit('setFindedUsers', response.data.results)
      context.commit('setUsersPrevious', response.data.previous)
    })
    .catch(e => { console.log(e) })
  },
  createUser (context, payload) {
    var avatar = payload.avatar
    delete payload.avatar

    return axios.post('/api/users/', payload)
        .then(response => {
          // Image upload
          if (typeof avatar === 'object') {
            let data = new FormData()
            data.append('avatar', avatar)
            return axios.patch('/api/users/' + response.data.id, data)
          }
        })
        .catch(e => { console.log(e) })
  },
  editUser (context, payload) {
    var avatar = payload.avatar
    delete payload.avatar

    return axios.patch('/api/users/' + payload.id, payload)
      .then(response => {
        // Image upload
        if (typeof avatar === 'object') {
          let data = new FormData()
          data.append('avatar', avatar)
          return axios.patch('/api/users/' + payload.id, data)
        }
      })
      .catch(e => { console.log(e) })
  },
  deleteUser (context, userId) {
    return axios.delete('/api/users/' + userId)
        .then(response => {})
        .catch(e => { console.log(e) })
  },
  passwordReset (context, user) {
    return axios.post('/api/users/password_reset/', user)
        .then(response => { context.commit('setEmailFail', false) })
        .catch(e => { context.commit('setEmailFail', true) })
  },
  passwordChange (context, payload) {
    return axios.post('/api/users/password_change/', payload)
        .then(response => { context.commit('setTokenFail', false) })
        .catch(e => { context.commit('setTokenFail', true) })
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
