<template>
  <div>
    <page-title
      v-bind:title="'Transaction'" v-bind:icon="'plus-circle'"></page-title>
    <div class="uk-container-small uk-align-center uk-section uk-margin-remove-top uk-padding-small uk-section-muted uk-padding-large-left uk-padding-large-right">
      <form class="uk-form-stacked uk-text-left">
        <div class="uk-margin uk-margin-left">
          <label class="uk-form-label" for="form-accounts">Account</label>

          <div class="uk-form-controls uk-grid uk-flex uk-margin-large-right"
               name="form-accounts" uk-grid>
            <div class="uk-width-3-5">
              <select class="uk-select" name="selectAccount" placeholder="Select ..."
                      v-model="transaction.account.id">
                <option v-for="acc of accounts" v-bind:value="acc.id">
                  {{ acc.name }}</option>
              </select>
            </div>
            <div id="accountIcon" class="uk-width-2-5">
              <img class="uk-align-center" v-if="accountIcon" v-bind:src="accountIcon" />
            </div>

          </div>
        </div>

        <div class="uk-margin uk-margin-left uk-margin-large-right">

          <label for="amountInput" class="uk-form-label">Amount</label>

          <div class="uk-grid-small" uk-grid>

            <div class="uk-width-1-4@s">
              <select class="uk-input uk-select" name="selectAction" placeholder="Select ..."
                      v-model="transaction.action">
                <option value="1">Credit (+)</option>
                <option value="-1">Debit (-)</option>
              </select>
            </div>
            <div class="uk-width-3-4@s">
              <div class="uk-inline cstm-fullwidth">
                <span class="uk-form-icon">$</span>
                <input class="uk-input uk-form-large" id="amountInput" type="number" placeholder="___ . __  "
                       step="0.01" min="0" max="100000"
                       v-model="transaction.amount">
              </div>
            </div>

          </div>
        </div>

        <div class="uk-margin uk-margin-left uk-margin-large-right">
          <label for="selectDate"
                 class="uk-form-label">Date</label>
          <input type="date" class="uk-input uk-date" id="selectDate" name="selectDate"
                 data-uk-datepicker="{format:'DD.MM.YYYY'}"
                 required pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}"
                 v-model="transaction.date"/>
        </div>
        <div class="uk-margin uk-margin-left uk-margin-large-right">
          <label for="selectCategory"
                 class="uk-form-label">Category</label>
          <select class="uk-select" name="selectCategory"
                  v-model="transaction.category.id">
            <option>---</option>
            <option v-for="tag of categories" v-bind:value="tag.id">{{ tag.name }}</option>
          </select>
        </div>

        <div class="uk-margin uk-margin-left uk-margin-large-right">
          <label for="textDescription"
                 class="uk-form-label">Description</label>
          <input class="uk-input" name="textDescription" v-model="transaction.description"/>
        </div>

        <div class="uk-margin uk-margin-left uk-margin-large-right">
          <label>
            <input name="taxDeduction" type="checkbox"
                   class="uk-checkbox"
                   v-model="transaction.tax_deduction" />
            Tax deduction?
          </label>
        </div>

        <button v-on:click="submit"
                class="uk-button uk-button-primary uk-button-large
                       uk-margin-top uk-margin-left">
          <span uk-icon="icon: circle-add"></span>
            Submit
        </button>
        <!-- Cancel button -->
        <router-link to="/list">
          <button class="uk-button uk-button-secondary uk-button-large
                         uk-margin-top uk-margin-left">
            Cancel
          </button>
        </router-link>
    </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TransactionDetailForm',
  data: function () {
    return {
      'accounts': this.$store.state.accounts,
      'categories': this.$store.state.categories,
      'accountIcon': '',
      'transaction': {
        'user': {
          'id': 1
        },
        'account': {
          'id': null
        },
        'category': {
          'id': null
        },
        'action': null,
        'amount': null,
        'date': null,
        'description': null,
        'tax_deduction': null
      }
    }
  },
  created () {
    this.getCurrentTransaction()
  },
  watch: {
    'this.$route': this.getCurrentTransaction,
    'transaction.account.id': function () {
      const account = this.accounts.find(
        obj => obj.id === this.transaction.account.id)
      this.accountIcon = account.icon
    }

  },
  methods: {
    // UI Functions
    submit: function (event) {
      // Suppress the normal 'submit' action
      event.preventDefault()
      // Send the data to the API
      this.transaction.user.id = 1
      const data = this.setAPIData(this.transaction)
      if (this.$route.name === 'Create') {
        this.createTransaction(data)
      } else if (this.$route.name === 'Edit') {
        this.updateTransaction(data)
      }
    },

    // API functions
    createTransaction: function (data) {
      // Create a new transaction
      this.$http.post('transactions/', data).then(response => {
        this.transaction = response.body
        this.$router.push({ path: '/list' })
      }, error => {
        console.log(error)
      })
    },

    updateTransaction: function (data) {
      // Update an existing transaction
      const url = 'transactions/' + this.$route.params.id + '/'
      this.$http.patch(url, data, []).then(response => {
        this.transaction = response.body
        this.$router.push({ path: '/list' })
      }, error => {
        console.log(error)
      })
    },

    // Data functions
    setAPIData: function (transaction) {
      // Function to set pk's (etc.) for certain API fields
      transaction.user_id = transaction.user.id
      transaction.category_id = transaction.category.id
      transaction.account_id = transaction.account.id
      return transaction
    },

    getCurrentTransaction: function () {
      if (this.$route.name === 'Edit') {
        const url = 'transactions/' + this.$route.params.id + '/'
        this.$http.get(url).then(response => {
          this.transaction = response.body
          // Set the account icon
          const account = this.accounts.find(
            obj => obj.id === this.transaction.account.id)
          this.accountIcon = account.icon
        }, error => {
          console.log(error)
        })
      }
    }
  }
}
</script>

<style scoped>

.form-check-input {
    position: relative;
    margin-left: auto;
}
label {
    margin-left: 0.3em;
    margin-right: 2.5em;
}
#accountIcon {
    height: 2em;
}
img {
    margin-top: -1em;
    margin-left: 35%;
    max-height: 6em;
}
.row {
    padding-top: 2em;
}
.accountRadio {
    display: inline-block;
    margin-left: 1em;
    margin-right: 1em;
}
button.active {
    background-color: #1e87f099;
}
.uk-form-large {
    padding-left: 32px !important;
}
cstm-fullwidth {
     width: 100% !important;
}
</style>
