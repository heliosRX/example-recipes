import Vue from 'vue'
import App from './App.vue'

import heliosRX from 'heliosrx'
import { rtdb } from './firebase'
import models from "@/models" // TODO

// console.log("heliosRX", heliosRX)

// TODO: Integrate in generic store?
export const ALLOWED_GLOBAL_READY_FLAGS = [
  'auth',
  'user',
  'tasklists',
  'tasklists:*',
  'tasks',
];

Vue.use(heliosRX, {
  models: models,
  db: rtdb,
  userApi: {},
  readyFlags: ALLOWED_GLOBAL_READY_FLAGS,
})

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
