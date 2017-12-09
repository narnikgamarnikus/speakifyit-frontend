<template>
  <div>
    <v-navigation-drawer
      fixed
      clipped
      app
      floating
      v-model="drawer"
      color="light-blue"
    >
      <v-list dense>
        <template v-for="(item, i) in items">
          <v-layout
            row
            v-if="item.heading"
            align-center
            :key="i"
          >
            <v-flex xs6>
              <v-subheader v-if="item.heading">
                {{ item.heading }}
              </v-subheader>
            </v-flex>
            <v-flex xs6 class="text-xs-center">
              <a href="#!" class="body-2 black--text">EDIT</a>
            </v-flex>
          </v-layout>
          <v-list-group v-else-if="item.children" v-model="item.model" no-action>
            <v-list-tile slot="item" @click="">
              <v-list-tile-action>
                <v-icon>{{ item.model ? item.icon : item['icon-alt'] }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>
                  {{ item.title }}
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile
              v-for="(child, i) in item.children"
              :key="i"
              @click=""
            >
              <v-list-tile-action v-if="child.icon">
                <v-icon>{{ child.icon }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>
                  {{ child.title }}
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list-group>
          <v-list-tile v-else @click="routerPush(item.to)" v-show="item.show">
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>
                {{ item.title }}
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar
      color="light-blue"
      dark
      app
      clipped-left
      fixed
    >
      <v-toolbar-title style="width: 300px" class="ml-0 pl-3">
        <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        Speakify.it
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>apps</v-icon>
      </v-btn>
      <v-menu 
        offset-x
        :close-on-content-click="false"
        :nudge-width="200"
        v-model="menu"
      >
        <v-btn icon slot="activator" @click="readNotifications">
          <v-badge color="red" v-model="$store.getters.unreadNotifications.length" right overlap small>
            <span slot="badge">{{ $store.getters.unreadNotifications.length }}</span>
            <v-icon>notifications</v-icon>
          </v-badge>
        </v-btn>
        <v-list v-for="(notification, i) in $store.getters.unreadNotifications" :key="i">
          <v-list-tile avatar>
            <v-list-tile-avatar v-for="(user, k) in [notification.from_user]" :key="k">
              <img :src="user.avatar" :alt="user.username">
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title>{{ notification.id }}</v-list-tile-title>
              <v-list-tile-sub-title>{{ notification.content }}</v-list-tile-sub-title>
            </v-list-tile-content>
            <v-list-tile-action v-for="(request, z) in [notification.contact_request]" :key="z">
              <v-btn
                icon
                :class="request.accepted ? 'green--text' : ''"
                @click="approveContact(request)"
              >
                <v-icon>done</v-icon>
              </v-btn>
            </v-list-tile-action>
          </v-list-tile>
        </v-list>
      </v-menu>
      <v-menu bottom left>
        <v-btn icon slot="activator">
          <v-icon>more_vert</v-icon>
        </v-btn>
        <v-list>
          <!--v-list-tile v-for="item in authItems" :key="item.title" @click="routerPush(item.to)" v-show="item.show">
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-->
            <v-list-tile v-show="!$store.state.auth.loggedIn" @click="routerPush('/login')">
              <v-list-tile-title>Login</v-list-tile-title>
            </v-list-tile>
            <v-list-tile v-show="!$store.state.auth.loggedIn" @click="routerPush('/login')">
              <v-list-tile-title>Register</v-list-tile-title>
            </v-list-tile>            
            <v-list-tile v-show="$store.state.auth.loggedIn" @click="routerPush('/logout')">
              <v-list-tile-title>Logout</v-list-tile-title>
            </v-list-tile>
        </v-list>
      </v-menu>     
    </v-toolbar>
  </div>
</template>

<script>
  export default {
    data: () => ({
      drawer: true,
      fav: true,
      menu: false,
      items: [
        { icon: 'contacts', title: 'Home', to: '/', show: true },
        { icon: 'history', title: 'Users', to: '/users', show: true },
        { icon: 'content_copy', title: 'Chat', to: '/chat', show: true }
      ]
    }),
    props: {
      source: String
    },
    methods: {
      routerPush: function (path) {
        this.$router.push(path)
      },
      approveContact: function (contactRequest) {
        this.$store.dispatch('approveContactRequset', contactRequest)
      },
      readNotifications: function () {
        this.$store.dispatch('readNotifications', this.$store.getters.unreadNotifications)
      }
    },
    mounted: function () {
      this.$store.subscribe((mutation, state) => {
        if (mutation.type === 'socketOnMessage') {
          this.$store.dispatch('websocketNotifications', mutation.payload)
        }
      })
    }
  }
</script>