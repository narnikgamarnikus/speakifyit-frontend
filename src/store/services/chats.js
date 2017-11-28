import axios from 'axios'

const state = {
  messages: [],
  notifications: []
}

const getters = {
  unreadNotifications: function (state) {
    return state.notifications.filter(notification => notification.is_read === false).slice(0, 3)
  }
}

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
  websocketNotifications (content, data) {
    content.commit('setNotifications', data)
  },
  approveContactRequset (content, contactRequest) {
    contactRequest.accepted = true
    return axios.put('http://127.0.0.1:8000/api/contact_requests/' + contactRequest.id + '/?token=' + this.state.auth.token, contactRequest)
        .then(response => { console.log(response) })
        .catch(e => {
          console.log(e)
          contactRequest.accepted = false
        })
  },
  readNotifications (content, notifications) {
    setTimeout(function () {
      for (var item in notifications) {
        var notification = notifications[item]
        notification.is_read = true
      }
    }, 5000)
    for (var item in notifications) {
      var notification = notifications[item]
      axios.post('http://127.0.0.1:8000/api/notifications/is_read/?token=' + this.state.auth.token, { 'id': notification.id })
          .then(response => { console.log(response) })
          .catch(e => {
            console.log(e)
            notification.is_read = false
          })
    }
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
