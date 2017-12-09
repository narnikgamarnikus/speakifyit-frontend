<template>
  <div>
  <v-layout row>
    <v-flex xs12 sm12 md12 lg10 offset-lg1 lx10 offset-lx1 >
      <v-card class="grid">
        <v-toolbar color="white" flating>
          <v-btn icon light>
            <v-icon color="grey darken-2">search</v-icon>
          </v-btn>
          <v-text-field hide-details single-line color="light-blue" v-model="query"></v-text-field>
          <v-btn icon light>
            <v-icon color="grey darken-2">more_vert</v-icon>
          </v-btn>
        </v-toolbar>
        <v-subheader>May</v-subheader>
          <v-container fluid grid-list-lg>
            <v-layout row wrap>
              <v-flex xs12 sm12 md6 lg6 lx6 v-for="(user, i) in $store.state.users.users" :key="i">
                <v-card style="padding: 1rem" @click.native="dialog = true" ripple class="card--custom">
                <div class="card--custom--body"  @click="checkUser(user)">
                  <img class="card--custom--avatar image" v-bind:src="user.avatar" alt="user.full_name" width="100%" height="100%">
                  <div class="card--custom--body--left">
                    <div class="card--custom--body--left--text">
                      <p class="card--custom--body--left--text--title"><strong>{{ user.username }}</strong></p>
                      <p class="card--custom--body--left--text--description">{{ user.about | truncate(60) }}</p>
                    </div>
                    <div class="card--custom--body--left--flag" v-for="language in user.learn">
                      <div style="display: flex; flex-direction: column;align-items: center;">
                        <flag :iso="language.language" class="flag" />
                        <v-progress-circular
                        v-bind:size="45"
                        v-bind:width="5"
                        v-bind:value="language.skill * 10"
                        color="teal"
                        >
                        {{ language.skill * 10 }}
                        </v-progress-circular>
                      </div>
                    </div>
                  </div>
                </div>
                </v-card>
              </v-flex>
            </v-layout>
          </v-container>
        <mugen-scroll :handler="loadMore" :should-handle="!loading" style="display: flex;align-items: center;justify-content: center;">
          <v-progress-circular indeterminate v-bind:size="50" color="light-blue" v-show="canLoaded"></v-progress-circular>
        </mugen-scroll>
        <v-footer class="mt-5"></v-footer>
      </v-card>
    </v-flex>
  </v-layout>

  <v-layout row justify-center>
    <v-dialog v-model="dialog" max-width="290px">
      <v-card class="card--dialog">
        <img class="card--custom--avatar mt1 image" v-bind:src="user.avatar" alt="user.full_name" width="100%" height="100%">
        <div class="card--custom--body--left--flag" v-for="language in user.learn">
          <div style="display: flex; flex-direction: column;align-items: center;">
            <flag :iso="language.language" class="flag" />
            <v-progress-circular
            v-bind:size="45"
            v-bind:width="5"
            v-bind:value="language.skill * 10"
            color="teal"
            >
            {{ language.skill * 10 }}
            </v-progress-circular>
          </div>
        </div>
        <v-card-title class="headline ">{{ user.username }}</v-card-title>
        <v-card-text>{{ user.about }}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" flat="flat" @click.native="addContact(user)">Add to contact</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
  </div>
</template>
<script>
import MugenScroll from 'vue-mugen-scroll'

export default {
  name: 'Users',
  data () {
    return {
      dialog: false,
      loading: false,
      user: {},
      query: ''
    }
  },
  computed: {
    canLoaded: function () {
      return !!this.$store.state.users.usersNext
    }
  },
  watch: {
    query: function () {
      if (this.query.length > 0) {
        this.$store.dispatch('searchUsers', this.query)
      }
    }
  },
  methods: {
    loadMore: function () {
      this.loading = true
      if (this.canLoaded) {
        setTimeout(() => {
          this.$store.dispatch('getUsersList')
          this.loading = false
        }, 500)
      }
    },
    checkUser: function (user) {
      this.user = user
    },
    addContact: function (user) {
      this.$store.dispatch('sendMessage', {
        'command': 'contact',
        'user': user.id,
        'token': this.$store.state.auth.token
      })
      this.dialog = false
    }
  },
  components: {MugenScroll}
}
</script>
<style scoped>
.mt1 {
  margin-top: 1rem
}
.text-center {
  text-align: center
}
.card--custom {
  transition: all .2s ease-in-out;
}
.card--custom:hover {
  transform: scale(1.05);
}
.card--custom--body {
  display: flex;
  justify-content: center; 
  align-items: center; 
  cursor: pointer;
}
.card--custom--avatar {
  border-radius: 99rem;
  width: 10rem;
  height: 10rem;
}
.card--custom--body--left {
  margin-left: 1rem; 
  display: flex; 
  flex-direction: column; 
  justify-content: space-between; 
  height: 100%;
}
.card--custom--body--left--text {
  display: flex; 
  flex-direction: column; 
  text-align: left
}
.card--custom--body--left--flag {
  display: flex; 
  /* justify-content: space-between; */ 
  margin-top: 2rem; 
  margin-right: 0.5rem
}
.card--custom--body--left--text--title {
  font-size: 1.5rem;
}
.card--custom--body--left--text--description {
  font-size: 1.25rem;
}

.flag {
  width: 4rem; 
  height: 3rem;
  margin: 1.5rem 0 1.5rem 0;
}

.card--dialog {
  display: flex; 
  flex-direction: column;
  align-items: center;
}

@media screen and (max-width: 500px) {
  .card--custom--body {
    flex-direction: column; 
  }
  .card--custom--body--left--text { 
    text-align: center
  }
  .card--custom--body--left--flag {
    justify-content: space-around; 
  }
}
</style>