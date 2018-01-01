<template>
  <div class="dashboard">
    <page-title
      v-bind:title="'Equilibre'" v-bind:icon="'credit-card'"></page-title>
    <div class="uk-section uk-padding-large uk-padding-top-remove">
      <h2>Expense Tracking</h2>

      <div class="uk-grid uk-grid-divided uk-align-center" uk-grid>
        <router-link to="/create" class="uk-margin-left uk-margin-right">
          <button class="uk-button uk-button-secondary uk-button-large">
            <span uk-icon="icon: plus-circle"></span>&emsp; Add&nbsp;&nbsp;
          </button>
        </router-link>
        <router-link to="/list" class="uk-margin-left uk-margin-right">
          <button class="uk-button uk-button-primary uk-button-large">
            <span uk-icon="icon: list"></span>&emsp; View
          </button>
        </router-link>
        </div>
      </div>
      <h2>Account Balances</h2>
      <div class="uk-placeholder uk-margin-small-left uk-margin-small-right">
        <table class="uk-table uk-table-divider">
          <thead>
            <tr>
              <th>Account</th>
              <th>Balance</th>
              <th>Last Updated</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="b of balances">
              <td>
                <img v-bind:src="b.account.icon"/> <br />
                {{ b.account.name }}
              </td>
              <td>
                <span v-bind:class="{'negative': b.value < 0}">
                  ${{ b.value }}
                </span>
              </td>
              <td>{{ formatDate(b.updated) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Dashboard',
  data () {
    return {
      'balances': []
    }
  },
  created () {
    this.getBalances()
  },
  watch: {
    // Update data if route changes
    '$route': this.getBalances
  },
  methods: {
    getBalances: function () {
      this.$http.get('balances/').then(response => {
        this.balances = response.body
      }, error => {
        console.log(error)
      })
    },
    formatDate: function (dateString) {
      const _date = new Date(dateString)
      const _dateString = _date.toString().slice(0, 15)
      return _dateString
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
    padding-left: 0;
}
img {
    height: 3em !important;
}
</style>
