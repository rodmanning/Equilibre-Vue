<template>
<table class="uk-table uk-table-small uk-table-justify uk-table-divider">
  <caption>Available Transactions</caption>
  <thead class="thead-light">
    <tr>
      <th>Date</th>
      <th class="uk-visible@s">Account</th>
      <th class="uk-visible@s">Amount</th>
      <th colspan="2">Details</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="transaction in transactions">
      <td>
        <router-link v-bind:to="editUrl(transaction)">
          {{ localeDate(transaction.date) }}
        </router-link>
      </td>
      <td>
        <!-- Tablets and desktops -->
        <span class="uk-visible@m">
          <img v-bind:src="transaction.account.icon"/> <br />
          {{ transaction.account.name }}
        </span>
        <!-- Mobile devices -->
        <span class="uk-hidden@m">
          <img v-bind:src="transaction.account.icon"/>
        </span>
      </td>
      <td class="uk-text-nowrap">
        <span v-bind:class="{'negative': transaction.action === -1}">
          $ {{(transaction.amount * transaction.action).toFixed(2)}}
        </span>
      </td>
      <td>
        <span uk-icon="icon: tag"></span>
        &nbsp;<strong>{{transaction.category.name}}</strong>
      </td>
      <td class="uk-visible@s">
        {{transaction.description}}
      </td>
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
    min-height: 2em !important;
    min-width: 2em !important;
    max-height: 3em !important;
    max-width: 4em !important;
}
</style>
