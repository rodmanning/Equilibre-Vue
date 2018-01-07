<template>
  <div>
  <p v-if="error !== undefined"
     v-for="err in error[field]"
     class="uk-form-danger">
    {{ err }}
  </p>
</div>
</template>

<script>
export default {
  name: 'field-error',
  props: ['error', 'field']
}
</script>

<style>
</style>
