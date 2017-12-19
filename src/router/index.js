import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/Dashboard'
import TransactionList from '@/components/TransactionList'
import TransactionDetailForm from '@/components/TransactionDetailForm'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: Dashboard
    },
    {
      path: '/list',
      name: 'TransactionList',
      component: TransactionList
    },
    {
      path: '/create',
      name: 'create',
      component: TransactionDetailForm
    },
    {
      path: '/edit/:id',
      name: 'edit',
      component: TransactionDetailForm
    }
  ],
  linkActiveClass: 'uk-active', // active class for non-exact links.
  linkExactActiveClass: 'uk-active' // active class for *exact* links.
})
