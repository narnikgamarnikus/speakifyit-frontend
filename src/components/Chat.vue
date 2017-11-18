<template>
  <v-layout row>
    <v-flex lg10 offset-lg1>
      <v-card class="chat--card">
        <!--v-toolbar color="teal" dark>
          <v-toolbar-side-icon></v-toolbar-side-icon>
          <v-toolbar-title class="text-xs-center">New Chat</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon>
            <v-icon>search</v-icon>
          </v-btn>
        </v-toolbar-->
        <div class="flex lg3">
          <v-list subheader>
            <v-subheader>Recent chat</v-subheader>
              <v-list-tile avatar v-for="item in items1" v-bind:key="item.title" @click="" style="word-break:break-all; width: 100%">
                <v-list-tile-avatar>
                  <img v-bind:src="item.avatar"/>
                </v-list-tile-avatar>
                <v-list-tile-content>
                  <v-list-tile-title v-html="item.title"></v-list-tile-title>
                </v-list-tile-content>
                <v-list-tile-action>
                  <v-badge overlap color="indigo" v-model="item.active">
                    <span slot="badge">{{ item.count }}</span>
                    <v-icon v-bind:color="item.active ? 'teal' : 'grey'">chat_bubble</v-icon>
                  </v-badge>
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
        </div>

        <div class="flex lg9 chat--container">
          <div>
            <v-list subheader >
              <v-subheader>Recent chat</v-subheader>
                <v-list-tile avatar class="chat--container--message" v-for="item in messages" v-bind:key="item.title" @click="">
                  <v-list-tile-avatar>
                    <img v-bind:src="item.user"/>
                  </v-list-tile-avatar>
                  <v-list-tile-content>
                    <v-list-tile-title v-html="item.text" class="break--text"></v-list-tile-title>
                  </v-list-tile-content>
                  <v-list-tile-action @click="messageEdit(item)" ripple>
                    <v-btn icon>
                      <v-icon v-bind:color="item.active ? 'teal' : 'grey'">edit</v-icon>
                    </v-btn>
                  </v-list-tile-action>
                </v-list-tile>
            </v-list>
          </div>
          <div>
            <v-divider></v-divider>
            <v-list subheader class="chat--input--message">
              <v-text-field
                v-model="message.text"
                full-width
                multi-line
                single-line
                style="padding-right: 2rem; padding-right: 2rem;"
                rows="3"
                @keyup.enter="sendMessage"
              ></v-text-field>
              <v-btn icon @click="sendMessage">
                <v-icon color="light-blue">send</v-icon>
              </v-btn>
              <!--v-subheader>Previous chats</v-subheader>
              <v-list-tile avatar v-for="item in items2" v-bind:key="item.title" @click="">
                <v-list-tile-avatar>
                  <img v-bind:src="item.avatar"/>
                </v-list-tile-avatar>
                <v-list-tile-content>
                  <v-list-tile-title v-html="item.title"></v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile-->
            </v-list>
          </div>
        </div>
      </v-card>
    </v-flex>
  </v-layout>
</template>
<script>
  export default {
    data () {
      return {
        selected: [2],
        oldmessage: '',
        founder: '',
        message: {
          id: '',
          user: 'https://randomuser.me/api/portraits/men/3.jpg',
          text: '',
          is_modified: false,
          user_modifier: ''
        },
        messages: [],
        items1: [
          { active: true, title: 'Jason Oner', avatar: 'https://randomuser.me/api/portraits/men/1.jpg', count: 1 },
          { active: true, title: 'Ranee Carlson', avatar: 'https://randomuser.me/api/portraits/men/2.jpg', count: 13 },
          { active: false, title: 'Cindy Baker', avatar: 'https://randomuser.me/api/portraits/men/3.jpg', count: 0 },
          { active: false, title: 'Ali Connors', avatar: 'https://randomuser.me/api/portraits/men/4.jpg', count: 0 }
        ],
        items2: [
          { title: 'Travis Howard', avatar: 'https://randomuser.me/api/portraits/men/5.jpg' }
        ],
        items3: [
          { action: '15 min', headline: 'Brunch this weekend?', title: 'Ali Connors', subtitle: 'I\'ll be in your neighborhood doing errands this weekend. Do you want to hang out?', avatar: 'https://randomuser.me/api/portraits/men/1.jpg' },
          { action: '2 hr', headline: 'Summer BBQ', title: 'me, Scrott, Jennifer', subtitle: 'Wish I could come, but I\'m out of town this weekend.', avatar: 'https://randomuser.me/api/portraits/men/2.jpg' },
          { action: '6 hr', headline: 'Oui oui', title: 'Sandra Adams', subtitle: 'Do you have Paris recommendations? Have you ever been?', avatar: 'https://randomuser.me/api/portraits/men/3.jpg' },
          { action: '12 hr', headline: 'Birthday gift', title: 'Trevor Hansen', subtitle: 'Have any ideas about what we should get Heidi for her birthday?', avatar: 'https://randomuser.me/api/portraits/men/4.jpg' },
          { action: '18hr', headline: 'Recipe to try', title: 'Britta Holt', subtitle: 'We should eat this: Grate, Squash, Corn, and tomatillo Tacos. We should eat this: Grate, Squash, Corn, and tomatillo Tacos. We should eat this: Grate, Squash, Corn, and tomatillo Tacos. We should eat this: Grate, Squash, Corn, and tomatillo Tacos. We should eat this: Grate, Squash, Corn, and tomatillo Tacos. We should eat this: Grate, Squash, Corn, and tomatillo Tacos.', avatar: 'https://randomuser.me/api/portraits/men/5.jpg' }
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
    },
    methods: {
      messageEdit: function (item) {
        console.log(JSON.stringify(item))
        this.message.text = (item.text).trim()
        this.message.id = item.id
      },
      sendMessage: function () {
        if ((this.message.text).trim().length > 0) {
          if (this.message.id !== '') {
            this.founder = this.message.id
            var item = this.messages.find(this.findMessage)
            item.text = this.message.text
            this.founder = ''
          } else {
            this.message.id = Math.random()
            this.messages.push(this.message)
          }
          this.message = { id: '', user: 'https://randomuser.me/api/portraits/men/3.jpg', text: '', is_modified: false, user_modifier: '' }
        }
      },
      findMessage: function (id) {
        return this.message.id === this.founder
      }
    }
  }
</script>
<style>
  .chat--card {
    height: 100% !important;
    display: flex; 
    justify-content: space-between;
  }
  .chat--container {
    height: 100% !important;
    display: flex; 
    flex-direction: column;
    justify-content: space-between;
  }
  .chat--input--message {
    display: flex;
    justify-content: space-between;
    width: 95%;
    align-items: center;
  }
  .input-group__input > textarea {
    resize: none;
  }
  .input-group__details {
    color: inherit;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    padding-top: 4px;
    -webkit-box-flex: 1;
    -ms-flex: 1 0 100%;
    flex: 1 0 100%;
    font-size: 12px;
    min-height: 0px;
    overflow: hidden;
    position: relative;
    width: 100%;
  }
  .break--text {
    white-space: normal; 
    word-wrap: break-word; 
    height: 100% !important;
  }
  /*
  .list__tile__content, .list__tile__action, .list__tile__avatar {
    height: auto;
    padding-top: 10rem;
  }
  */
  .list__tile--avatar {
    height: auto;
  }
  .chat--container--message {
    padding-top: 0.25rem;
    padding-bottom: 0.25rem;
  }
</style>