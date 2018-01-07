<template>
  <div>
    <page-title
      v-bind:title="'Transaction'" v-bind:icon="'plus-circle'"></page-title>
    <div class="uk-container-small uk-align-center
                uk-section-muted uk-section
                uk-margin-remove-top uk-padding-small
                uk-padding-large-left uk-padding-large-right
                uk-padding-large-top">
      <form class="uk-form-stacked uk-text-left">
        <!-- Display non-field errors -->
        <non-field-errors
          v-if="nonFieldError !== undefined"
          v-bind:nonFieldError="nonFieldError">
        </non-field-errors>

        <div class="uk-margin uk-margin-left">
          <label class="uk-form-label" for="form-accounts">Account</label>

          <div class="uk-form-controls uk-grid uk-flex uk-margin-large-right"
               name="form-accounts" uk-grid>
            <div class="uk-width-3-5">
              <select class="uk-select" name="selectAccount" placeholder="Select ..."
                      v-model="transaction.account.id"
                      v-bind:class="{ 'uk-form-danger': error !== undefined &&
                                    error.account_id !== undefined }">
                <option v-for="acc of accounts" v-bind:value="acc.id">
                  {{ acc.name }}</option>
              </select>
            </div>
            <div id="accountIcon" class="uk-width-2-5">
              <img class="uk-align-center" v-if="accountIcon" v-bind:src="accountIcon" />
            </div>
          </div>
          <field-error
            v-if="error !== undefined"
            v-bind:error="error" field="account_id">
          </field-error>
        </div>

        <div class="uk-margin uk-margin-left uk-margin-large-right">
          <label for="amountInput" class="uk-form-label">Amount</label>
          <div class="uk-grid-small" uk-grid>
            <div class="uk-width-1-4@s">
              <select class="uk-input uk-select"
                      name="selectAction"
                      placeholder="Select ..."
                      v-model="transaction.action"
                      v-bind:class="{ 'uk-form-danger': error !== undefined &&
                                    error.action !== undefined }">
                <option value="1">Credit (+)</option>
                <option value="-1">Debit (-)</option>
              </select>
              <field-error
                v-if="error !== undefined"
                v-bind:error="error" field="action">
              </field-error>
            </div>
            <div class="uk-width-3-4@s">
              <div class="uk-inline cstm-fullwidth">
                <span class="uk-form-icon">$</span>
                <input class="uk-input uk-form-large" id="amountInput" type="number" placeholder="___ . __  "
                       step="0.01" min="0" max="100000"
                       v-model="transaction.amount"
                       v-bind:class="{ 'uk-form-danger': error !== undefined &&
                                    error.amount !== undefined }">
              </div>
              <field-error
                v-if="error !== undefined"
                v-bind:error="error" field="amount">
              </field-error>
            </div>
          </div>
        </div>

        <div class="uk-margin uk-margin-left uk-margin-large-right">
          <label for="selectDate"
                 class="uk-form-label">Date</label>
          <input type="date" class="uk-input uk-date" id="selectDate" name="selectDate"
                 data-uk-datepicker="{format:'DD.MM.YYYY'}"
                 required pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}"
                 v-model="transaction.date"
                 v-bind:class="{ 'uk-form-danger': error !== undefined &&
                                    error.date !== undefined }"/>
          <field-error
            v-if="error !== undefined"
            v-bind:error="error" field="date">
          </field-error>
        </div>
        <div class="uk-margin uk-margin-left uk-margin-large-right">
          <label for="selectCategory"
                 class="uk-form-label">Category</label>
          <select class="uk-select" name="selectCategory"
                  v-model="transaction.category.id"
                  v-bind:class="{ 'uk-form-danger': error !== undefined &&
                                    error.category_id !== undefined }">
            <option>---</option>
            <option v-for="tag of categories" v-bind:value="tag.id">{{ tag.name }}</option>
          </select>
          <field-error
                v-if="error !== undefined"
                v-bind:error="error" field="category_id">
          </field-error>
        </div>

        <div class="uk-margin uk-margin-left uk-margin-large-right">
          <label for="textDescription"
                 class="uk-form-label">Description</label>
          <input class="uk-input" name="textDescription"
                 v-model="transaction.description"
                 v-bind:class="{ 'uk-form-danger': error !== undefined &&
                               error.description !== undefined }" />
          <field-error
            v-if="error !== undefined"
            v-bind:error="error" field="description">
          </field-error>
        </div>

        <div class="uk-margin uk-margin-left uk-margin-large-right">
          <label>
            <input name="taxDeduction" type="checkbox"
                   class="uk-checkbox"
                   v-model="transaction.tax_deduction"
                   v-bind:class="{ 'uk-form-danger': error !== undefined &&
                                 error.tax_deduction !== undefined }"/>
            Tax deduction?
          </label>
          <field-error
            v-if="error !== undefined"
            v-bind:error="error" field="tax_deduction">
          </field-error>
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
import NonFieldErrors from '@/components/NonFieldErrors.vue'
import FieldError from '@/components/FieldError.vue'

export default {
  name: 'TransactionDetailForm',
  components: { FieldError, NonFieldErrors },
  data: function () {
    return {
      'accounts': this.$store.state.accounts,
      'categories': this.$store.state.categories,
      'accountIcon': '',
      'error': this.$root.error,
      'nonFieldError': this.$root.nonFieldError,
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
    this.$root.resetErrors()
  },
  watch: {
    'this.$route': this.getCurrentTransaction,
    '$root.error': function () {
      this.error = this.$root.error
    },
    '$root.nonFieldError': function () {
      this.nonFieldError = this.$root.nonFieldError
    },
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
        this.$root.raiseError(error)
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
        this.$root.raiseError(error)
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
