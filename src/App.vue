<template>
  <div id="app">
    <v-app id="inspire">
      <main-container/>
      <main-content>
        <router-view/>
      </main-content>
    </v-app>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}

/*
@media screen and (min-width: 900px) {
  .main-content{
    margin-left: 304px;
  }
}
*/
</style>
