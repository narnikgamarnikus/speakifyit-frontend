<template>
  <v-layout row>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <!--v-toolbar color="teal" dark>
          <v-toolbar-side-icon></v-toolbar-side-icon>
          <v-toolbar-title class="text-xs-center">New Chat</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon>
            <v-icon>search</v-icon>
          </v-btn>
        </v-toolbar-->
        <v-list subheader>
          <v-subheader>Recent chat</v-subheader>
            <v-list-tile avatar v-for="item in items1" v-bind:key="item.title" @click="">
              <v-list-tile-avatar>
                <img v-bind:src="item.avatar"/>
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title v-html="item.title"></v-list-tile-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-icon v-bind:color="item.active ? 'teal' : 'grey'">chat_bubble</v-icon>
              </v-list-tile-action>
            </v-list-tile>
        </v-list>
        <v-divider></v-divider>
        <v-list subheader>
          <v-subheader>Previous chats</v-subheader>
          <v-list-tile avatar v-for="item in items2" v-bind:key="item.title" @click="">
            <v-list-tile-avatar>
              <img v-bind:src="item.avatar"/>
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title v-html="item.title"></v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>

      </v-card>
    </v-flex>
  </v-layout>
</template>
<script>
  export default {
    data () {
      return {
        selected: [2],
        items1: [
          { active: true, title: 'Jason Oner', avatar: 'https://randomuser.me/api/portraits/men/1.jpg' },
          { active: true, title: 'Ranee Carlson', avatar: 'https://randomuser.me/api/portraits/men/2.jpg' },
          { title: 'Cindy Baker', avatar: 'https://randomuser.me/api/portraits/men/3.jpg' },
          { title: 'Ali Connors', avatar: 'https://randomuser.me/api/portraits/men/4.jpg' }
        ],
        items2: [
          { title: 'Travis Howard', avatar: 'https://randomuser.me/api/portraits/men/5.jpg' }
        ],
        items3: [
          { action: '15 min', headline: 'Brunch this weekend?', title: 'Ali Connors', subtitle: 'I\'ll be in your neighborhood doing errands this weekend. Do you want to hang out?' },
          { action: '2 hr', headline: 'Summer BBQ', title: 'me, Scrott, Jennifer', subtitle: 'Wish I could come, but I\'m out of town this weekend.' },
          { action: '6 hr', headline: 'Oui oui', title: 'Sandra Adams', subtitle: 'Do you have Paris recommendations? Have you ever been?' },
          { action: '12 hr', headline: 'Birthday gift', title: 'Trevor Hansen', subtitle: 'Have any ideas about what we should get Heidi for her birthday?' },
          { action: '18hr', headline: 'Recipe to try', title: 'Britta Holt', subtitle: 'We should eat this: Grate, Squash, Corn, and tomatillo Tacos.' }
        ],
        methods: {
          toggle (index) {
            const i = this.selected.indexOf(index)

            if (i > -1) {
              this.selected.splice(i, 1)
            } else {
              this.selected.push(index)
            }
          }
        }
      }
    }
  }
</script>