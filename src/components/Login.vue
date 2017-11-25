<template>
<div>
  <v-alert
    color="error"
    icon="error"
    :value="authError"
    transition="scale-transition"
  >
    Please, try again
  </v-alert>
  <v-form v-model="valid" ref="form" lazy-validation @keyup:enter="submit" style="width: 30rem; margin-top: 5rem">
    <v-text-field
      label="Username"
      v-model="username"
      :rules="usernameRules"
      :counter="30"
      color="light-blue"
      required
    ></v-text-field>
    <v-text-field
      label="Password"
      v-model="password"
      :rules="passwordRules"
      type="password"
      color="light-blue"
      required
    ></v-text-field>
    <v-btn
      @click="submit"
      :disabled="!valid"
    >
      submit
    </v-btn>
  </v-form>
</div>  
</template>
<script>
  export default {
    name: 'Login',
    data: () => ({
      valid: false,
      username: '',
      usernameRules: [
        (v) => !!v || 'Username is required',
        (v) => (v && v.length) >= 3 || 'Username must be more than 3 characters'
      ],
      password: '',
      passwordRules: [
        (v) => !!v || 'Password is required',
        (v) => (v && v.length) >= 3 || 'Password must be more than 3 characters'

      ]
    }),
    watch: {
      loggedIn: function () {
        if (this.loggedIn === true) {
          this.$router.push('/users')
          this.$store.dispatch('getProfile')
          this.$store.dispatch('getUsersList')
        }
      },
      authError: function () {
        if (this.authError === true) {
          this.$refs.form.reset()
        }
      }
    },
    computed: {
      loggedIn: function () {
        return this.$store.state.auth.loggedIn
      },
      authError: function () {
        return this.$store.state.auth.authError
      }
    },
    methods: {
      submit () {
        if (this.$refs.form.validate()) {
          this.$store.dispatch('postLogin', {
            email: this.username,
            password: this.password
          })
        }
      },
      clear () {
        this.$refs.form.reset()
      }
    }
  }
</script>