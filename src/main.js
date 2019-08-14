import Categories from './booking-categories.vue'
import Details from './booking-details.vue'
import Styles from './booking-styles.vue'
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

var routes = [
  {
    path: '/categories',
    component: Categories,
    name: 'categories',
  },
  {
    path: '/categories/:categoryId',
    component: Styles,
    name: 'styles',
  },
  {
    path: '/styles/:productId',
    component: Details,
    name: 'details',
    props: true,
  },
]

var router = new VueRouter({
  routes: routes,
})

export default new Vue({
  router: router,
}).$mount('#app')
