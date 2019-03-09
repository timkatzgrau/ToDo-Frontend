<template>
  <div>
  <div class="register text-xs-center">
    <h1>Login or Register</h1>
    <form autocomplete="off">
    <v-flex xs12 sm6 md3 class="text-xs-center">
    <v-text-field type="text" name="username" placeholder="username" v-model="username"></v-text-field>
    </v-flex>
    <v-flex xs12 sm6 md3 class="text-xs-center">
    <v-text-field type="password" name="password" placeholder="password" v-model="password"></v-text-field>
    </v-flex>
    </form>
    <div class="error" v-html="error"></div>
    <div class="success" v-html="success"></div>

    <v-btn @click="login">Sign In</v-btn>
    <v-btn @click="register">Register</v-btn>
  </div>
</div>
</template>
<script>
import Register from '@/services/Authentication'
export default {
  data () {
    return {
      username: '',
      password: '',
      error: '',
      success: ''
    }
  },
  methods: {
    async register () {
      if (this.username.length === 0 || this.password.length === 0) {
        this.error = 'One or more fields are empty'
      } else {
        try {
          await Register.register({
            username: this.username,
            password: this.password
          })
          this.error = null
          this.success = 'You have registered successfully. Proceed to sign in.'
        } catch (err) {
          this.error = err.response.data.error
        }
      }
    },

    async login () {
      try {
        const response = await Register.login({
          username: this.username,
          password: this.password
        })
        this.$store.dispatch('setUser', response.data)
        this.$store.dispatch('loggedIn', true)
        this.$router.push({name: 'todos'})
      } catch (err) {
        this.error = err.response.data.error
      }
    }
  }
}
</script>

<style scoped>

.error{
  color:red;
}

.success{
  color:green;
}

.text-xs-center{
  margin: 0 auto;
}

</style>
