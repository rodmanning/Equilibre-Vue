import Vue from 'vue'

Vue.component('page-title', {
  props: ['title', 'icon'],
  computed: {
    getIcon: function (props) {
      return '<span uk-icon="icon: ' + props.icon + '" ratio="1.8"></span>'
    }
  },
  template: `
<div class="uk-section uk-section-xsmall uk-section-primary">
  <h1 class="uk-margin-left uk-text-left">
    <span v-if="icon" v-html="getIcon"></span>&nbsp;
    {{ title }}
  </h1>
</div>
`
})
