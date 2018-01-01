<template>
  <div id="app">
    <Navbar/>
    <router-view/>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue'
import './components/PageTitle'

export default {
  name: 'app',
  components: {
    'Navbar': Navbar
  }
}
</script>

<style>
#app {
  font-family: 'Raleway', Times, Times New Roman, serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
h1, h2, h3, h4 {
  font-familt: 'Roboto', Helvetiva, Arial, sans-serif
}
h1, h2 {
  font-weight: normal;
}
.negative {
    color: red;
}
</style>
