<template>
<table class="uk-table uk-table-divider uk-table-responsive">
  <caption>Available Transactions</caption>
  <thead class="thead-light">
    <tr>
      <th></th>
      <th>Date</th>
      <th>Account</th>
      <th>Amount</th>
      <th colspan="2">Details</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="transaction in transactions">
      <td>
        <router-link v-bind:to="editUrl(transaction)">Edit</router-link>
      </td>
      <td>{{ localeDate(transaction.date) }}</td>
      <td>
        <img v-bind:src="transaction.account.icon" height="20px"/> &emsp;
        {{ transaction.account.name }}
      </td>
      <td>$ {{(transaction.amount * transaction.action).toFixed(2)}}</td>
      <td><span uk-icon="icon: tag"></span> <strong>{{transaction.category.name}}</strong></td>
      <td><span> {{transaction.description}}</span></td>
    </tr>
  </tbody>
</table>
</template>

<script>
export default {
  name: 'transaction-table',
  props: {
    'transactions': {
      type: Array,
      required: true
    }
  },
  methods: {
    localeDate: function (dateString) {
      var date = new Date(dateString)
      var options = { year: 'numeric', month: 'short', day: 'numeric' }
      return date.toLocaleDateString('en-AU', options)
    },
    editUrl: function (transaction) {
      return 'edit/' + transaction.id
    }
  }
}
</script>

<style scoped>
img {
    height: 3em !important;
}
</style>
