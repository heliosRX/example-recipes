<template>
  <div class="recipe-dates">
    <div>
      <button class="btn ml-0" @click="onCreate()">Create</button>
      <button class="btn ml-0" @click="onSetTime()">Set time</button>
      <button class="btn ml-0" @click="onUpdateTime()">Add 7 days</button>
    </div>
    <div style="margin-left: 1em">
      <h2>YYYY-MM-DD forma:</h2>
      <p>{{datetime.time.format('YYYY-MM-DD')}}</p>
      <h2>Calendar forma:</h2>
      <p>{{datetime.time.calendar()}}</p>
      <h2>isDST:</h2>
      <p>{{datetime.time.isDST()}}</p>
      <h2>futureEventAt:</h2>
      <p>{{datetime.futureEventAt}}</p>
    </div>
    <div style="margin-left: 1em">
      <pre>{{datetime}}</pre>
    </div>
  </div>
</template>

<script>
import { moment } from 'heliosrx'

export default {
  title: "Recipe Timestamps",
  description: "Example how to work with Timestamps",
  index: 2,
  components: {
  },
  data() {
    return {
      itemId: '1',
    }
  },
  computed: {
    datetime() {
      return this.$models.datetime.subscribeNode( this.itemId )
    }
  },
  methods: {
    onCreate() {
      this.$models.datetime.add({}, this.itemId);
    },
    onSetTime() {
      this.$models.datetime.update( this.itemId, {
        futureEventAt: moment().add(1, 'day').valueOf(),
        time: moment()
      })
    },
    onUpdateTime() {
      let obj = this.datetime.clone();
      obj.time = obj.time.add(7, 'days')

      // Manually mark time as dirty
      // obj.$dirty[ 'time' ] = true;

      obj.write();
    }
  },
};
</script>

<style>
.recipe-dates {
  display: flex;
}
.recipe-dates .btn {
  display: block;
  width: 200px;
}
</style>
