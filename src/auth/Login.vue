<template>
  <div id="loginForm" class="uk-container">
    <div class="uk-section uk-section-primary uk-text-left uk-padding
                uk-margin-large-top">
      <h1>Login</h1>
    </div>

    <div class="uk-section uk-section-muted uk-section
                uk-text-left uk-padding-small">
      <form class="uk-form-horizontal uk-margin-large-left uk-margin-large-right">
        <div v-if="nonFieldError" class="uk-alert-danger uk-margin-remove-top" uk-alert>
          <h3>Error!</h3>
          <p v-for="err in nonFieldError">{{ err }}</p>
        </div>

        <div>
          <div class="uk-form-label" for="form-username">Username</div>
          <div class="uk-form-controls">
            <input type="text" class="uk-input" name="form-username"
                   v-model="credentials.username"
                   v-bind:class="{ 'uk-form-danger': error !== undefined && error.username !== undefined }"/>
          </div>
          <div v-if="error !== undefined && error.username !== undefined">
            <p v-if="error !== undefined" v-for="err in error.username" class="uk-form-danger">
              {{ err }}
            </p>
          </div>

        </div>
        <div class="uk-margin-top">
          <div class="uk-form-label" for="form-username">Password</div>
          <div class="uk-form-controls">
            <input type="password" class="uk-input" name="form-username"
                   v-model="credentials.password"
                   v-bind:class="{ 'uk-form-danger': error !== undefined && error.password !== undefined }"/>
          </div>
          <div v-if="error !== undefined && error.password !== undefined">
            <p v-if="error !== undefined" v-for="err in error.password" class="uk-form-danger">
              {{ err }}
            </p>
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
      'error': this.$root.error,
      'nonFieldError': this.$root.nonFieldError
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
    },
    '$root.nonFieldError': function () {
      this.nonFieldError = this.$root.nonFieldError
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
