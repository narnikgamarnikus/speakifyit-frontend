<template>
<div>
  <v-layout row>
    <v-flex xs12 sm12 md12 lg10 offset-lg1 lx10 offset-lx1 >
      <v-card class="grid">
        <v-toolbar color="white" flat>
          <v-btn icon light>
            <v-icon color="grey darken-2">arrow_back</v-icon>
          </v-btn>
          <v-toolbar-title class="grey--text text--darken-4">Albums</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon light>
            <v-icon color="grey darken-2">search</v-icon>
          </v-btn>
        </v-toolbar>
        <v-subheader>May</v-subheader>
        <v-container fluid grid-list-lg>
          <v-layout row wrap>
            <v-flex xs12 sm12 md6 lg6 lx6 v-for="i in 64" :key="i">
              <v-card style="padding: 1rem" @click.native="dialog = true" ripple class="card--custom">
              <div class="card--custom--body">
                <img class="card--custom--avatar image" v-bind:src="`https://randomuser.me/api/portraits/men/${i + 20}.jpg`" alt="lorem" width="100%" height="100%">
                <div class="card--custom--body--left">
                  <div class="card--custom--body--left--text">
                    <p class="card--custom--body--left--text--title"><strong>John Lenon</strong></p>
                    <p class="card--custom--body--left--text--description">loren ipsmut loren ipsmut loren ipsmut loren ipsmut</p>
                  </div>
                  <div class="card--custom--body--left--flag">
                    <img src="http://www.netherlands-tourism.com/wp-content/uploads/2013/07/Flag-of-The-Netherlands3.png" class="flag">
                    <img src="http://www.netherlands-tourism.com/wp-content/uploads/2013/07/Flag-of-The-Netherlands3.png" class="flag">
                  </div>                  
                </div>
              </div>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
        <v-footer class="mt-5"></v-footer>
      </v-card>
    </v-flex>
  </v-layout>

  <v-layout row justify-center>
    <v-dialog v-model="dialog" max-width="290">
      <v-card>
        <v-card-title class="headline">Use Google's location service?</v-card-title>
        <v-card-text>Let Google help apps determine location. This means sending anonymous location data to Google, even when no apps are running.</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" flat="flat" @click.native="dialog = false">Disagree</v-btn>
          <v-btn color="green darken-1" flat="flat" @click.native="dialog = false">Agree</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</div>
</template>
<script>
export default {
  name: 'Users',
  data () {
    return {
      dialog: false
    }
  }
}
</script>
<style scoped>
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
  justify-content: 
  space-between; 
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
  margin: 0 1.5rem 0 1.5rem;
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