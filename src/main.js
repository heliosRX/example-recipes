import Vue from 'vue' // Must be imported before models
import App from './App.vue'

import heliosRX from 'heliosrx'
import { rtdb } from './firebase'
import models from "@/models" // TODO
import makeRouterFromRecipes from './router'

import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'

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

const requireComponent = require.context( './recipes', true, /\w+\.vue$/ )
const recipeList = {}

requireComponent.keys().forEach(fileName => {
  // Get component config
  const componentConfig = requireComponent(fileName)

  // Get PascalCase name of component
  const componentName = upperFirst(
    camelCase(
      // Gets the file name regardless of folder depth
      fileName
        .split('/')
        .pop()
        .replace(/\.\w+$/, '')
    )
  )

  recipeList[ componentName ] = componentConfig.default || componentConfig;

  // Register component globally
  Vue.component( componentName, recipeList[ componentName ] )
})

Vue.mixin({
  computed: {
    $recipes: () => recipeList
  }
});

Vue.config.productionTip = false

new Vue({
  router: makeRouterFromRecipes( recipeList ),
  render: h => h(App),
}).$mount('#app')
