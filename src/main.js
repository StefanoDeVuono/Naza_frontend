import Categories from './booking/categories.vue'
import Customize from './booking/customize.vue'
import Styles from './booking/styles.vue'
import AddOns from './booking/add-ons.vue'
import ScheduleAndPreferences from './booking/schedule-and-preferences.vue'
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
    component: Customize,
    name: 'customize',
    props: true,
  },
  {
    path: '/add-ons/:productId',
    component: AddOns,
    name: 'add-ons',
    props: true
  },
  {
    path: '/schedule-and-preferences/:productId',
    component: ScheduleAndPreferences,
    name: 'schedule-and-preferences',
    props: true
  }
]

var router = new VueRouter({
  routes: routes,
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})

export default new Vue({
  router,
}).$mount('#app')
