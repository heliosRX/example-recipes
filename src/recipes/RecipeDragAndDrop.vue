<template>
  <div class="drag-and-drop">
    <div>
      <button class="btn" @click="addItem()">Add item to end</button>
      <SortableList
        v-model="draglist"
        :transitionDuration="60"
        :distance="5">
        <SortableItem
          v-for="(item, index) in draglist"
          :index="index"
          :key="item.$id"
          :item="item"/>
      </SortableList>
    </div>
    <div style="margin-left: 2rem">
      <pre>next_sortidx = {{itemlist.getters.next_sortidx}}</pre>
      <pre style="columns: 2">draglist = {{draglist.map(item => item.$state)}}</pre>
    </div>
  </div>
</template>

<script>
import SortableList from './DragAndDrop/SortableList.vue'
import SortableItem from './DragAndDrop/SortableItem.vue'

const fruits = [ '🍎','🍏','🍊','🍋','🍒','🍇','🍉','🍓','🍑','🍈','🍌','🍐','🍍' ];

export default {
  title: "Recipe Drag&Drop",
  description: "Example how to use heliosRX with Drag & Drop",
  index: 1,
  components: {
    SortableItem,
    SortableList,
  },
  computed: {
    itemlist() {
      return this.$models.draglist.subscribeList();
    },
    draglist: {
      get() {
        return this.itemlist.asArraySorted().items;
      },
      set( draglist ) {
        this.$models.draglist.reorder( draglist );
        // - or -
        // this.$models.draglist.reorder( draglist.map(i => i.$id) );
      }
    }
  },
  methods: {
    addItem() {
      let color = "#" + ( (1 << 24) * Math.random() | 0 ).toString(16);
      let title = fruits[Math.floor(Math.random() * fruits.length)];

      this.$models.draglist.add({
        title:   title,
        color:   color,
        sortidx: this.itemlist.getters.next_sortidx,
      });

      // let sortidx = this.itemlist.getters.last.sortidx + 200;
    }
  },
};
</script>

<style>
.drag-and-drop {
  display: flex;
}
</style>
