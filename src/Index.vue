<template>
  <ul class="index-list">
    <li v-for="recipe in recipes" :key="recipe.name">
      <router-link
        :to="recipe.name.toLowerCase()"
        :title="$recipes[ recipe.name ].description">
        {{$recipes[ recipe.name ].title || recipe.name}}
      </router-link>
    </li>
  </ul>
</template>

<script>
export default {
  computed: {
    recipes() {
      let list = Object.keys( this.$recipes ).map( name => {
        return {
          name: name,
          index: this.$recipes[ name ].index || 0
        }
      })
      return list.sort(( a, b ) => {
        if ( a.index < b.index ) return -1;
        if ( a.index > b.index ) return 1;
        return 0;
      })
    }
  }
}
</script>

<style>
.index-list {
  display: flex;
  list-style: none;
  padding: 0.5em;
  margin: 0;
  border-bottom: 1px solid rgba(0,0,0,0.2);
  box-shadow: 0 0 16px rgba(0,0,0,0.2);
  background: white;
}

ul.index-list li a {
  display: block;
  min-width: 100px;
  border: 1px solid #aaa;
  text-align: center;
  padding: 0.5em;
  background: #eee;
  margin-right: 0.25em;
  color: #666;
  text-decoration: none;
}

ul.index-list li a:hover {
  border-color: #666;
  background: #ccc;
}
</style>
