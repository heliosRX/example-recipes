<template>
  <div id="app">
    <index />
    <div class="container-outer">
      <h1>{{getActiveRecipe.title || $route.name}}</h1>
      <p v-if="getActiveRecipe.description" class="description">
        {{getActiveRecipe.description}}
      </p>
      <!-- <pre>{{getActiveRecipe}}</pre> -->
      <div class="container">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import Index from './Index.vue'

export default {
  name: 'app',
  computed: {
    getActiveRecipe() {
      let def = (this.$router.options.routes || []).find(route => route.name === this.$route.name)
      return ( def || {} ).component || {}
    }
  },
  components: {
    Index,
  }
}
</script>

<style>
.container {
  display: flex;
  justify-content: space-between;
}
.container-outer {
  padding: 1em;
}
.demo {
  border: 2px solid black;
  margin: 0.5em;
  padding: 2em;
}
.description {
  border: 1px solid #aaa;
  padding: 1rem;
}
</style>
