const LOGIN_URL = 'token/'
const REFRESH_URL = LOGIN_URL + 'refresh/'

export default {

  parseJwt: function (token) {
    var base64Url = token.split('.')[1]
    var base64 = base64Url.replace('-', '+').replace('_', '/')
    return JSON.parse(window.atob(base64))
  },

  login: function (context, credentials, redirect) {
    context.$http.post(LOGIN_URL, credentials).then(response => {
      // Save the tokens
      localStorage.setItem('accessToken', response.body.access)
      localStorage.setItem('refreshToken', response.body.refresh)
      // Mark the user as authenticated
      const tokenData = this.parseJwt(response.body.access)
      const _user = {
        'id': tokenData.user_id,
        'expires': tokenData.exp,
        'isAuthenticated': true
      }
      context.$root.$store.setState('user', _user)
      // Initialise the data for the UI
      context.$root.getInitialData()
      // Redirect (if supplied), else to dashboard
      if (redirect) {
        context.$router.push({path: redirect})
      } else {
        window.history.length > 1
          ? context.$router.go(-1)
          : context.$router.push('/')
      }
    }, error => {
      context.$root.$store.setState('user', {})
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
      context.$root.error = error
    })
  },

  logout: function () {
    this.$root.$store.user = {}
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    this.user.isAuthenticated = false
  },

  checkAuth: function (user) {
    if (user) {
      var token = localStorage.getItem('accessToken')
      if (user.isAuthenticated && token) {
        return true
      }
    }
    return false
  },

  refreshAuth: function (context) {
    const refreshToken = localStorage.getItem('refreshToken')
    context.$http.post(REFRESH_URL, {'refresh': refreshToken})
      .then(response => {
        localStorage.setItem('accessToken', response.body.access)
        this.user.isAuthenticated = true
      })
  },

  getAuthHeader: function () {
    return {
      'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
    }
  }
}
