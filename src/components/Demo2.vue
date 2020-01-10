<template>
  <div class="demo2">
    <ul>
      <li v-for="task in exampleList" :key="task.$key">
        {{task.name}}
        <a href="#" @click.prevent="onDeleteItem( task.$id )">del</a> |
        <a href="#" @click.prevent="onUpdateItem( task.$id )">upd</a>
      </li>
    </ul>
    <input v-model="input" />
    <button @click="onAddItem">Add Item</button>
    <pre>{{debug}}</pre>
    <pre>{{exampleList}}</pre>
  </div>
</template>




<script>
export default {
  data() {
    return {
      input: "",
    }
  },
  watch: {
    debug: {
      handler() {
        console.log("WATCH ---- debug")
      },
      deep: true,
    },
    exampleList: {
      handler() {
        console.log("WATCH ----")
      },
      deep: true,
    }
  },
  mounted() {
    this.ready = true;
    // setTimeout(() => {
    //   this.ready = true;
    // }, 2000)
  },
  computed: {
    exampleList() {
      let x = this.$models.example.subscribeList();
      return x.items;
    },
    debug() {
      return this.$api.get_registry().state;
    }
  },
  methods: {
    onAddItem() {
      this.$models.example.add({ name: this.input || "Foobar" });
    },
    onDeleteItem( id ) {
      this.$models.example.remove( id );
    },
    onUpdateItem( id ) {
      let name = prompt("Enter new title:");
      this.$models.example.update( id, { name: name } );
    },
  }
}
</script>
