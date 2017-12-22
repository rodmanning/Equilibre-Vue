<template>
  <div id="navbar-container"
       uk-sticky="sel-target: .uk-navbar-container; cls-active: uk-navbar-sticky">
  <nav class="uk-navbar-container" uk-navbar>
    <div class="uk-navbar-left">
      <ul class="uk-navbar-nav">
        <li>
          <router-link class="navbar-brand" to="/">
            <span uk-icon="icon: credit-card"></span>&nbsp;
            Equilibre
          </router-link>
        </li>
      </ul>
    </div>
    <div v-if="isAuthenticated" class="uk-navbar-right">
      <ul class="uk-navbar-nav">
        <li>
          <router-link class="nav-link" to="/"
                       v-bind:class="{active: active.Dashboard}">
            <span uk-icon="icon: home"></span>&ensp;
            <span class="uk-visible@m">Home</span>
          </router-link>
        </li>
        <li>
          <router-link class="nav-link" to="/list"
                       v-bind:class="{active: active.List}">
            <span uk-icon="icon: list"></span>&ensp;
            <span class="uk-visible@m">List</span>
          </router-link>
        </li>
        <li>
          <router-link class="nav-link" to="/create"
                       v-bind:class="{active: active.Create}">
            <span uk-icon="icon: plus-circle"></span>&ensp;
            <span class="uk-visible@m">Add</span>
          </router-link>
        </li>
      </ul>
    </div>
  </nav>
  </div>
</template>

<script>
export default {
  name: 'Navbar',
  data: function () {
    return {
      'isAuthenticated': false,
      'active': {
        'Dashboard': false,
        'Create': false,
        'List': false
      }
    }
  },
  watch: {
    // Call to update data if route changes
    $route: function () {
      const val = this.$root.$store.state.user.isAuthenticated
      this.isAuthenticated = val
      // Update active links on route change
      for (const path in this.active) {
        if (path === this.$route.name) {
          this.active[path] = true
        } else {
          this.active[path] = false
        }
      }
    }
  }
}
</script>

<style scoped>
.uk-navbar-nav > li:hover > a, .uk-navbar-nav > li > a.uk-open, .uk-navbar-nav > li > a:focus,
a.active {
    color: #fff;
    outline: 0;
}
a.active {
    font-weight: bold;
}
nav {
    background-color: #222 !important;
}
#navbar-container {
    width: 100% !important;
}
</style>
