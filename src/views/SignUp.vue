<template>
  <div class="page-sign-up">
    <div class="columns">
      <div class="column is-4 is-offset-4">
        <h1 class="title">Sign up</h1>
        <form @submit.prevent="submitForm">
          <div class="field">
            <label for="username">Username</label>
            <div class="control">
              <input type="text" class="input" id="username" v-model="username">
            </div>
          </div>
          <div class="field">
            <label for="password">Password</label>
            <div class="control">
              <input type="password" class="input" id="password" v-model="password">
            </div>
          </div>
          <div class="field">
            <label for="passwordConf">Confirm the password</label>
            <div class="control">
              <input type="password" class="input" id="passwordConf" v-model="passwordConf">
            </div>
          </div>
          <div class="notification is-danger" v-if="errors.length">
            <p v-for="error in errors" v-bind:key="error">{{ error }}</p>
          </div>
          <div class="field">
            <div class="control">
              <button class="button is-dark">Sign up</button>
            </div>
          </div>
          <hr>
          Or <router-link to="/log-in">click here</router-link> to log in!
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { toast } from 'bulma-toast'

export default {
  name: 'SignUp',
  data() {
    return {
      username: '',
      password: '',
      passwordConf: '',
      errors: []
    }
  },
  mounted() {
    document.title = 'Sign up | Djackets'
  },
  methods: {
    submitForm() {
      this.errors = []
      if (this.username === '') {
        this.errors.push("The username is missing")
      }
      if (this.password === '') {
        this.errors.push("The password is missing")
      }
      if (this.password !== this.passwordConf) {
        this.errors.push("The passwords don't match")
      }
      if (!this.errors.length) {
        const formData = {
          username: this.username,
          password: this.password,
        }
        axios
          .post('/api/v1/users/', formData)
          .then(response => {
            toast({
              message: 'Account created',
              type: 'is-success',
              dismissible: true,
              pauseOnHover: true,
              duration: 2000,
              position: 'bottom-right'
            })
            this.$router.push('/log-in')
          })
          .catch(error => {
            if (error.response) {
              for (const property in error.response.data) {
                this.errors.push(`${property}: ${error.response.data[property]}`)
              }
              console.log(JSON.stringify(error.response.data))
            } else if (error.message) {
              this.errors.push('Something went wrong. Please try again.')
              console.log(JSON.stringify(error))
            }
          })
      }
    }
  }
}
</script>