<template>
  <div id="loginForm" class="uk-container">
    <div class="uk-section uk-section-primary uk-text-left uk-padding
                uk-margin-large-top">
      <h2>Login</h2>
    </div>
    Error: {{ error }}
    <div class="uk-section uk-section-muted uk-section
                uk-text-left">
      <form class="uk-form-horizontal uk-margin-large-left uk-margin-large-right">

        <div>
          <div class="uk-form-label" for="form-username">Username</div>
          <div class="uk-form-controls">
            <input type="text" class="uk-input" name="form-usernam"
                   v-model="credentials.username"/>
          </div>
        </div>

        <div class="uk-margin-top">
          <div class="uk-form-label" for="form-username">Password</div>
          <div class="uk-form-controls">
            <input type="password" class="uk-input" name="form-username"
                   v-model="credentials.password"/>
          </div>
        </div>

        <div class="uk-margin-large-top">
          <button class="uk-button uk-button-primary" v-on:click="submit">
            Login
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import auth from '@/auth'

export default {
  name: 'Login',
  data: function () {
    return {
      'credentials': {},
      'error': this.$root.error
    }
  },
  methods: {
    submit: function (event) {
      // Stop the button click submitting the form
      event.preventDefault()
      // Call the login function defined in the `auth` module
      auth.login(this, this.credentials, '/')
    }
  },
  watch: {
    '$root.error': function () {
      this.error = this.$root.error
    }
  }
}
</script>

<style scoped>
#loginForm {
    width: 500px;
    max-width: 85%;
    left: auto;
    right: auto;
}
</style>
