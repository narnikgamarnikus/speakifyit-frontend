import axios from 'axios'

const state = {
  messages: [],
  notifications: []
}

const getters = {}

const mutations = {
  setMessages (state, message) {
    state.messages.push(...message)
  },
  setNotifications (state, notifications) {
    if (typeof notifications === 'string') {
      state.notifications.push(JSON.parse(notifications))
    } else {
      state.notifications.push(...notifications)
    }
  }
}

const actions = {
  websocketNotificatin (content, data) {
    content.commit('setNotifications', data)
  },
  approveContactRequset (content, contactRequest) {
    contactRequest.accepted = true
    return axios.put('http://127.0.0.1:8000/api/contact_request/' + contactRequest.id + '/?token=' + this.state.auth.token, contactRequest)
        .then(response => {
          console.log(response)
          console.log(response.data)
        })
        .catch(e => { console.log(e) })
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
