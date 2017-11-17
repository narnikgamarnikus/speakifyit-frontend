<template>
  <md-dialog md-open-from="#custom" md-close-to="#custom" ref="UserDialog">
    <md-card>
      <md-card-header>
        <md-card-header-text>
          <div class="md-title">Title goes here</div>
          <div class="md-subhead">Subtitle here</div>
          <md-button class="md-primary md-raised" id="custom" @click="closeDialog('UserDialog')">Custom</md-button>
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


</template>

<script>

export default {
  name: 'UserDialog',
  methods: {
    openDialog (ref) {
      this.$refs[ref].open()
    },
    closeDialog (ref) {
      this.$refs[ref].close()
    }
  }
}
</script>

<style>
.md-dialog {
    min-width: 480px;
    max-width: 80%;
    max-height: 80%;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-flow: column;
    flex-flow: column;
    overflow: hidden;
    position: relative;
    z-index: 110;
    outline: none;
    border-radius: 2px;
    opacity: 0;
    box-shadow: 0 7px 9px -4px rgba(0, 0, 0, 0.2), 0 14px 21px 2px rgba(0, 0, 0, 0.14), 0 5px 26px 4px rgba(0, 0, 0, 0.12);
    transform: scale(0.9, 0.85);
    transform-origin: center center;
    transition: opacity 0.4s cubic-bezier(0.25, 0.8, 0.25, 1), transform 0.4s 0.05s cubic-bezier(0.25, 0.8, 0.25, 1);
    will-change: opacity, transform;
}
.md-card .md-card-header .md-card-media {
    width: 160px;
    -ms-flex: 0 0 160px;
    flex: 0 0 160px;
    height: 160px;
    margin-left: 16px;
}
</style>