import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from './Index.vue'

Vue.use(VueRouter)

export default function makeRouterFromRecipes( component_list ) {
  const routes = [{
    path: '/',
    name: 'index',
    component: Index,
  }]

  Object.keys(component_list).forEach(key => {
    // console.log("XXX", component_list[ key ].name, key)
    routes.push({
      path: '/' + key,
      // name: component_list[ key ].name || key,
      name: key,
      component: component_list[ key ],
    })
  })

  console.log("routes", routes)

  return new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
  });
}
