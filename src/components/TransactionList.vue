<template>
  <div>
    <page-title v-bind:title="'Transactions'" v-bind:icon="'list'"></page-title>
    <div class="uk-container uk-align-center
                uk-section uk-margin-remove-top uk-padding-large
                uk-padding-remove-top">
      <div class="uk-placeholder" v-if="loading">
        <div uk-spinner></div>&emsp;
        Loading data ...
      </div>
      <router-link to="/create">
        <!-- Action button on desktops -->
        <button class="uk-button uk-button-secondary uk-align-right uk-margin-top
                       uk-visible@s">
          <span uk-icon="icon: plus-circle"></span>
          <span>&emsp; Add</span>
        </button>
      </router-link>
      <transaction-table v-if="transactions" v-bind:transactions="transactions"/>
    </div>
  </div>
</template>

<script>
import TransactionTable from '@/components/TransactionTable.vue'

export default {
  name: 'TransactionList',
  components: { TransactionTable },
  data: function () {
    return {
      transactions: null,
      loading: true,
      error: null,
      pages: null
    }
  },
  created () {
    this.getTransactionList()
  },
  watch: {
    // Call to update data if route changes
    '$route': this.getTransactionList
  },
  methods: {
    getTransactionList: function () {
      this.$http.get('transactions/').then(response => {
        this.loading = false
        this.transactions = response.body.results
        this.pages = {
          'next': response.body.next,
          'previous': response.body.previous
        }
      }, error => {
        console.log(error)
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
