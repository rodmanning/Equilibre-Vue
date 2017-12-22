// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
import auth from './auth'

Vue.use(VueResource)

Vue.http.options.root = 'http://localhost:8000/api/'
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
  // continue to next interceptor
  next()
})

// Add Access-Control-Allow-Origin header
Vue.http.interceptors.push(function (request, next) {
  request.headers.set('Access-Control-Allow-Origin', '*')
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
    error: {'code': 499}
  },
  methods: {
    raiseError: function (error) {
      console.log(error)
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
