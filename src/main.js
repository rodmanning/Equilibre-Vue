// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
import auth from './auth'

Vue.use(VueResource)

Vue.http.options.root = 'http://localhost:8000/api/'
// Vue.http.options.root = 'http://localhost:8000/api/'
Vue.http.options.emulateJSON = true

Vue.config.productionTip = false

// Setup interceptor for headers for access tokens etc.
Vue.http.interceptors.push(function (request, next) {
  // Add the Authorization token to the header (if it exists)
  const token = localStorage.getItem('accessToken')
  if (token != null) {
    const authHeader = auth.getAuthHeader()
    for (const key in authHeader) {
      request.headers.set(key, authHeader[key])
    }
  }
  next()
})

// Global state storage =)
Vue.prototype.$store = {
  debug: true,
  state: {
    'accounts': {},
    'categories': {},
    'user': {
      'isAuthenticated': false
    }
  },
  setState: function (key, data) {
    this.state[key] = data
  },
  getState: function (key) {
    return this.state[key]
  }
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {
    App
  },
  data: {
    transactions: {},
    accounts: {},
    categories: {},
    store: this.$store,
    error: undefined,
    nonFieldError: undefined,
    submitted: false
  },
  methods: {
    resetErrors: function () {
      this.nonFieldError = undefined
      this.error = undefined
    },
    raiseError: function (errors) {
      // Handle errors by distinguishing between field and non-field errors.
      //
      // Non-field errors are stored in the `nonFieldError` variable, whilst
      // field errors are stored in the normal `error` variable.
      // Handle server timeout errors
      if (errors.status === 0) {
        this.nonFieldError = {
          'non_field_errors': 'Sorry, the server isn\'t available. Try again later'
        }
      } else {
        this.nonFieldError = undefined
      }
      for (let err of Object.keys(errors.body)) {
        if (err === 'non_field_errors') {
          this.nonFieldError = errors.body[err]
          delete errors.body[err]
          this.error = errors
        }
      }
      this.error = errors.body
      console.log(this.error)
      this.submitted = false
    },
    getInitialData: function () {
      this.getCategoryData()
      this.getAccountData()
    },
    getCategoryData: function () {
      // Get Category data from the API to populate the UI
      this.$http.get('category/').then(response => {
        this.$store.setState('categories', response.body)
      }, error => {
        this.raiseError(error)
      })
    },
    getAccountData: function () {
      // Get Account data from the API to populate the UI
      this.$http.get('accounts/').then(response => {
        this.$store.setState('accounts', response.body)
      }, error => {
        this.raiseError(error)
      })
    }

  }
}).$mount('#app')
