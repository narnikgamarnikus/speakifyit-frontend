<template>
<div class="">
  <md-list class="md-dense">
    <md-list-item class="md-list-item md-button user" @click="openDialog('UserDialog', 'user')">
      <md-avatar>
        <img src="https://placeimg.com/128/128/people/1" alt="People">
      </md-avatar>

      <span class="md-title">Abbey Christansen</span>

      <md-button class="md-icon-button md-list-action">
        <md-icon class="md-primary">chat_bubble</md-icon>
      </md-button>
    </md-list-item>

    <md-list-item class="md-list-item md-button user" @click="openDialog('UserDialog', 'user')">
      <md-avatar>
        <img src="https://placeimg.com/128/128/people/2" alt="People">
      </md-avatar>

      <span class="md-title">Alex Nelson</span>

      <md-button class="md-icon-button md-list-action">
        <md-icon class="md-primary">chat_bubble</md-icon>
      </md-button>
    </md-list-item>

    <md-list-item class="md-list-item md-button user" @click="openDialog('UserDialog', 'user')">
      <md-avatar>
        <img src="https://placeimg.com/128/128/people/3" alt="People">
      </md-avatar>

      <span class="md-title">Mary Johnson</span>

      <md-button class="md-icon-button md-list-action">
        <md-icon>chat_bubble</md-icon>
      </md-button>
    </md-list-item>
  </md-list>

  <md-dialog md-open-from="#custom" md-close-to="#custom" ref="UserDialog">
    <md-card>
      <md-card-header>
        <md-card-header-text>
          <div class="md-title">Title goes here</div>
          <div class="md-subhead">Subtitle here</div>
        </md-card-header-text>

        <md-card-media>
          <img src="https://placeimg.com/128/128/people/1" alt="People">
        </md-card-media>
      </md-card-header>

      <md-card-actions>
        <md-button @click="closeDialog('UserDialog')">Action</md-button>
        <md-button @click="closeDialog('UserDialog')">Action</md-button>
      </md-card-actions>
    </md-card>
  </md-dialog>

</div>
</template>
<script>
// import { EventBus } from '../event-bus.js'
// import {store} from '../store'
export default {
  name: 'Users',
  methods: {
    // choiceUser (user) {
    //  EventBus.$emit('user-choised', this, user)
    // }
    openDialog (ref, user) {
      console.log(user)
      this.$refs[ref].open()
    },
    closeDialog (ref, user) {
      console.log(user)
      this.$refs[ref].close()
    }
  }
}
</script>
<style>
.md-list.md-dense .md-avatar {
    width: 128px;
    min-width: 128px;
    height: 128px;
    min-height: 128px;
}
.md-avatar {
	width: 40px;
	min-width: 40px;
	height: 40px;
	min-height: 40px;
	margin: auto;
	display: inline-block;
	overflow: hidden;
	-webkit-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
	user-select: none;
	position: relative;
	border-radius: 66px;
	vertical-align: middle;	
}
/*
.user {
	margin: 0.25rem 2rem;
	box-shadow: 0 1px 5px rgba(0,0,0,.2),0 2px 2px rgba(0,0,0,.14),0 3px 1px -2px rgba(0,0,0,.12);
}
*/
</style>