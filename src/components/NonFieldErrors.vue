<template>
  <div v-if="nonFieldError" class="uk-alert-danger uk-margin-remove-top" uk-alert>
    <h3>Error!</h3>
    <p v-for="err in nonFieldError">{{ err }}</p>
  </div>
</template>

<script>
export default {
  name: 'non-field-errors',
  props: {
    'nonFieldError': {
      required: true
    }
  }
}
</script>

<style scoped>
</style>
