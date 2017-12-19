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
    <div class="uk-navbar-right">
      <ul class="uk-navbar-nav">
        <li>
          <router-link class="nav-link" to="/">
            <span uk-icon="icon: home"></span>&nbsp;
            <span class="uk-visible@m">Home</span>
          </router-link>
        </li>
        <li>
          <router-link class="nav-link" to="/list">
            <span uk-icon="icon: list"></span>&nbsp;
            <span class="uk-visible@m">List</span>
          </router-link>
        </li>
        <li>
          <router-link class="nav-link" to="/create">
            <span uk-icon="icon: plus-circle"></span>&nbsp;
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
  name: 'Navbar'
}
</script>

<style scoped>
.uk-navbar-nav > li:hover > a, .uk-navbar-nav > li > a.uk-open, .uk-navbar-nav > li > a:focus {
    color: #1000a7;
    outline: 0;
}
nav {
    background-color: #222 !important;
}
#navbar-container {
    width: 100% !important;
}
</style>
