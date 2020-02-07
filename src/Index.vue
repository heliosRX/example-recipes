<template>
  <ul class="index-list">
    <li v-for="recipe in Object.keys($recipes)" :key="recipe">
      <router-link
        :to="recipe.toLowerCase()"
        :title="$recipes[ recipe ].description">
        {{$recipes[ recipe ].title || recipe}}
      </router-link>
    </li>
  </ul>
</template>

<script>
export default {
  components: {
  }
}
</script>

<style>
.index-list {
  display: flex;
  list-style: none;
  padding: 0.25em;
  margin: 0;
  border-bottom: 20px solid #eee;
}

ul.index-list li a {
  display: block;
  width: 100px;
  border: 2px solid #aaa;
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
