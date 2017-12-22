import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/Dashboard'
import TransactionList from '@/components/TransactionList'
import TransactionDetailForm from '@/components/TransactionDetailForm'
import Login from '@/auth/Login'

// Authentication using JWT
import auth from '@/auth'

Vue.use(Router)
// Check the user's auth status when the app starts
auth.checkAuth()

var router = new Router({
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: Dashboard
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/list',
      name: 'List',
      component: TransactionList
    },
    {
      path: '/create',
      name: 'Create',
      component: TransactionDetailForm
    },
    {
      path: '/edit/:id',
      name: 'Edit',
      component: TransactionDetailForm
    }
  ],
  linkActiveClass: 'uk-active', // active class for non-exact links.
  linkExactActiveClass: 'uk-active' // active class for *exact* links.
})

router.beforeEach((to, from, next) => {
  if (to.name === 'Login') {
    return next()
  } else if (auth.checkAuth(router.app.$store.state.user) === true) {
    // Check that the token is still valid
    const accessToken = localStorage.getItem('accessToken')
    const tokenData = auth.parseJwt(accessToken)
    const _now = new Date().getTime() / 1000
    const isValid = tokenData.exp > (_now + 60)  // Renew if expiring in next 1 minute
    if (isValid === true) {
      return next()
    } else {
      // Refresh the token and then return next()
      const refreshToken = localStorage.getItem('refreshToken')
      Vue.http.post('token/refresh/', {'refresh': refreshToken})
        .then(response => {
          localStorage.setItem('accessToken', response.body.access)
          return next()
        }, error => {
          console.log(error)
          return next({path: '/login'})
        })
    }
  } else {
    return next({path: '/login'})
  }
})

export default router
