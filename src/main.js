// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'

Vue.use(VueResource)

Vue.http.options.root = 'http://localhost:8000/api/'
Vue.http.options.emulateJSON = true

Vue.config.productionTip = false

// Global state storage =)
Vue.prototype.$store = {
  debug: true,
  state: {
    'accounts': {},
    'categories': {},
    'message': ''
  },
  setMessage: function (newMsg) {
    if (this.debug) console.log('setMessage triggered with ' + newMsg)
    this.state.message = newMsg
  },
  clearMessage: function () {
    if (this.debug) console.log('clearMessage triggered')
    this.state.message = ''
  },
  setState: function (key, data) {
    var obj = this.state[key]
    for (key of data.keys()) {
      obj[key] = data[key]
    }
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
    store: this.$store
  },
  methods: {
    raiseError: function (error) {
      console.log(error)
    }
  },
  // Lifecycle hooks to initialise data from the API
  mounted: function () {
    // Get Category data from the API
    this.$http.get('category/').then(response => {
      this.$store.setState('categories', response.body)
    }, error => {
      this.raiseError(error)
    })

    // Get Account data from the API
    this.$http.get('accounts/').then(response => {
      this.$store.setState('accounts', response.body)
    }, error => {
      this.raiseError(error)
    })
  }
}).$mount('#app')
