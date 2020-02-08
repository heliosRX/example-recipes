<template>
  <div class="demo1">
    <ul>
      <li v-for="example in exampleList" :key="example.$key">
        {{example.name}}
        <a href="#" @click.prevent="onDeleteItem( example.$id )">del</a> |
        <a href="#" @click.prevent="onUpdateItem( example.$id )">upd</a>
      </li>
    </ul>
    <input v-model="input" />
    <button @click="onAddItem">Add Item</button>
    <pre>exampleListLength: {{exampleListLength}}</pre>
    <pre>exampleList: {{exampleList}}</pre>
    <!--
    <pre>fullState: {{fullState}}</pre>
    <pre>fullState.res.example: {{fullState.res.example}}</pre>
    -->
    {{onRender()}}
  </div>
</template>

<script>
import { getRegistry } from 'heliosrx'

export default {
  title: "Recipe ToDo List",
  description: "Recipe for a simple ToDo List",
  index: 4,
  data() {
    return {
      input: "",
    }
  },
  watch: {
    fullState: {
      handler() {
        // console.log("state updated!")
      },
      deep: true,
    },
    exampleListLength: {
      handler() {
        console.log("length updated!")
      },
    },
    exampleList: {
      handler() {
        console.log("exampleList updated!")
      },
      deep: true,
    }
  },
  computed: {
    exampleList() {
      return this.$models.example.subscribeList().items;
    },
    exampleListLength() {
      return Object.keys(this.exampleList).length;
    },
    fullState() {
      return getRegistry().state;
    }
  },
  methods: {
    onRender() {
      // Typing will re-render the template with every letter!
      // console.log("render")
    },
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
