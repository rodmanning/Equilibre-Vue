<template>
  <div>
    <page-title
      v-bind:title="'Transaction'" v-bind:icon="'plus-circle'"></page-title>
    <div class="uk-container-small uk-align-center uk-section uk-margin-remove-top uk-padding-small uk-section-muted uk-padding-large-left uk-padding-large-right">
      <form class="uk-form-stacked uk-text-left">
        <div class="uk-margin uk-margin-left">
          <div class="uk-form-label" for="form-accounts">Account</div>

          <div class="uk-form-controls
                      uk-flex uk-flex-wrap uk-flex-1"
               name="form-accounts">

            <div v-for="(acc, index) in accounts" class="accountRadio">
              <button class="uk-button uk-button-small uk-button-default"
                      v-model="transaction.account.id"
                      v-bind:value="acc.id"
                      v-bind:id="'acc-btn-' + index"
                      v-on:click="selectAccount">
                <img :src="acc.icon" />
              </button>
            </div>
          </div>
        </div>

        <div class="uk-margin uk-margin-left uk-margin-large-right">

          <label for="amountInput" class="uk-form-label">Amount</label>

          <div class="uk-grid uk-flex" uk-grid>

            <div class="uk-width-2-5">
              <button name="form-actions" id="option-credit" value="1"
                      class="uk-button uk-button uk-button-default uk-width-2-5@m"
                      v-model="transaction.action"
                      v-on:click="selectAction">
                Credit
              </button>
              <button name="form-actions" id="option-debit" value="-1"
                      class="uk-button uk-button uk-button-default uk-width-2-5@m"
                      v-model="transaction.action"
                      v-on:click="selectAction">
                Debit
              </button>
            </div>

            <div class="uk-width-3-5">
              <input class="uk-form-large uk-input"
                     id="amountInput" type="number" placeholder="$ ___ . __  "
                     step="0.01" min="0" max="100000"
                     v-model="transaction.amount">
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

var Transaction = {
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
  'description': null
}

export default {
  name: 'TransactionDetailForm',
  data: function () {
    return {
      'accounts': this.$store.state.accounts,
      'categories': this.$store.state.categories,
      'transaction': Transaction
    }
  },
  created () {
    this.getCurrentTransaction()
  },
  watch: {
    'getCurrentTransaction': this.getCurrentTransaction
  },
  methods: {
    // UI Functions
    selectAccount: function (event) {
      // Stop the button clikc submitting the form
      event.preventDefault()
      // Set the value of the selected account on the model
      this.transaction.account.id = event.target.value
      // Set all other buttons to inactive
      const accountButtons = document.querySelectorAll('button[id^="acc-btn-"]')
      for (var btn of accountButtons) {
        btn.classList.remove('active')
      }
      // Set this button to active
      event.target.classList.add('active')
    },
    selectAction: function (event) {
      // Stop the button clikc submitting the form
      event.preventDefault()
      // Set the value of the select action on the model
      this.transaction.action = event.target.value
      // Toggle the buttons
      const actionButtons = document.querySelectorAll('button[id^="option-"]')
      for (const btn of actionButtons) {
        btn.classList.remove('active')
      }
      event.target.classList.add('active')
    },
    submit: function (event) {
      // Suppress the normal 'submit' action
      event.preventDefault()
      // Send the data to the API
      this.transaction.user.id = 1
      const data = this.setAPIData(this.transaction)
      // this.transaction.account = this.transaction.account.id
      // this.transaction.category = this.transaction.category.id
      if (this.$route.name === 'create') {
        this.createTransaction(data)
      } else if (this.$route.name === 'edit') {
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
      console.log(this.Transaction)
      if (this.$route.name === 'edit') {
        const url = 'transactions/' + this.$route.params.id + '/'
        this.$http.get(url).then(response => {
          this.transaction = response.body

          // Set the details for the action buttons
          const actionButtons = document.querySelectorAll('button[id^="option-"]')
          for (const btn of actionButtons) {
            if (+btn.value === this.transaction.action) {
              btn.classList.add('active')
            } else {
              btn.classList.remove('active')
            }
          }

          // Set the details for the account buttons throught the obj PK
          const accountButtons = document.querySelectorAll('button[id^="acc-btn-"]')
          for (var btn of accountButtons) {
            if (+btn.value === this.transaction.account.id) {
              btn.classList.add('active')
            } else {
              btn.classList.remove('active')
            }
          }
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
img {
    height: auto;
    min-width: 2em;
    max-width: 4em;
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
button.uk-button-large,
input, select {
    min-width: 140px;
}
</style>
