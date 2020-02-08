import Vue from 'vue' // Must be imported before models
import App from './App.vue'

import heliosRX from 'heliosrx'
import { rtdb } from './firebase'
import models from "@/models" // TODO
import makeRouterFromRecipes from './router'

import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'

import './styles/core.scss'

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

const requireComponent = require.context( './recipes', false, /\w+\.vue$/ )
const recipeList = {}

requireComponent.keys().forEach(fileName => {
  // Get component config
  let componentConfig = requireComponent(fileName)
  componentConfig = componentConfig.default || componentConfig;

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

  if ( componentConfig.hide !== true ) {
    recipeList[ componentName ] = componentConfig;

    // Register component globally
    Vue.component( componentName, recipeList[ componentName ] )
  }
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
