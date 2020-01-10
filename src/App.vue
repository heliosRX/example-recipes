<template>
  <div id="app">
    <Demo1 class="demo" />
    <Demo2 class="demo" />
    <Demo3 class="demo" />
  </div>
</template>

<script>
import Demo1 from './components/Demo1.vue'
import Demo2 from './components/Demo2.vue'
import Demo3 from './components/Demo3.vue'

export default {
  name: 'app',
  components: {
    Demo1,
    Demo2,
    Demo3,
  }
}
</script>

<style>
body {
  border: 1em solid grey;
  padding: 1em;
  margin: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
  display: flex;
  justify-content: space-between;
}
.demo {
  border: 2px solid black;
  margin: 0.5em;
  padding: 2em;
}
</style>
