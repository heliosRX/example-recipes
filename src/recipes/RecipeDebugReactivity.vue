<template>
  <div class="demo3">
    <pre>{{example}}</pre>
    <a href="#" @click.prevent="onUpdateItem( example.$id )">onUpdateItem</a> |
    <a href="#" @click.prevent="onUpdateLocalState()">onUpdateLocalState</a> |
    <a href="#" @click.prevent="onInitRegistry()">onInitRegistry</a> |
    <a href="#" @click.prevent="onResetRegistry()">onResetRegistry</a>
    <!-- <pre>debug.initialized: {{debug.initialized}}</pre> -->
    <!-- <pre>debug: {{debug}}</pre> -->
    <!-- <pre>example: {{example}}</pre> -->
    {{onRender()}}
  </div>
</template>

<script>
import { getRegistry } from 'heliosrx'

const node_id = '-LwHe6PmSTVyCWQdb-Pl';

export default {
  title: "Debugging: Reactivity / Registry",
  index: 105,
  hide: true,
  data() {
    return {
      input: "",
    }
  },
  watch: {
    /* debugFullState: {
      handler() {
        console.log("WATCH ---- debugFullState")
      },
      deep: true,
    }, */
    example: {
      handler() {
        console.log("WATCH ----")
      },
      deep: true,
    }
  },
  mounted() {
  },
  computed: {
    example() {
      return this.$models.example.subscribeNode( node_id );
    },
    debugFullState() {
      return getRegistry().state;
    }
  },
  methods: {
    onRender() {
      console.log("render")
    },
    onUpdateItem( id ) {
      let name = prompt("Enter new title:");
      if ( name ) {
        this.$models.example.update( id, { name: name } );
      }
    },
    onUpdateLocalState() {
      let registry = getRegistry();
      console.log("registry", registry);
      registry.commit('SET_ENTRY_STATUS', {
        name: '/example/-LwHe6PmSTVyCWQdb-Pl',
        value: Math.random()
      });
    },
    onInitRegistry() {
      let registry = getRegistry();
      console.log("registry", registry);
      // registry.commit('SET_GLOBAL_READY_STATE', {
      //   name: 'test',
      //   value: true,
      // });
      registry.commit('INIT_REGISTRY');
    },
    onResetRegistry() {
      let registry = getRegistry();
      console.log("registry", registry);
      registry.commit('RESET_REGISTRY');
    },
    // onUpdateItem2() {
    //   this.example.foo = "bar";
    //   this.example.save()
    // }
  }
}
</script>
