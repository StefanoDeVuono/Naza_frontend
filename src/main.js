import Categories from './booking/categories/component.vue'
import Customize from './booking/customize/component.vue'
import Subcategories from './booking/subcategories/component.vue'
import AddOns from './booking/add-ons/component.vue'
import ScheduleAndPreferences from './booking/schedule-and-preferences/component.vue'
import Confirmation from './booking/confirmation/component.vue'
import SignIn from './user/sign-in.vue'
import Vue from 'vue'
import VueRouter from 'vue-router'
import VueSessionStorage from 'vue-sessionstorage'
import { loadUserFromToken } from 'common/utils'

Vue.use(VueSessionStorage)
Vue.use(VueRouter)

var routes = [
  {
    path: '/categories',
    component: Categories,
    name: 'categories',
  },
  {
    path: '/categories/:categoryId',
    component: Subcategories,
    name: 'subcategories',
  },
  {
    path: '/styles/:productId',
    component: Customize,
    name: 'customize',
    props: true,
  },
  {
    path: '/add-ons',
    component: AddOns,
    name: 'add-ons',
  },
  {
    path: '/schedule-and-preferences',
    component: ScheduleAndPreferences,
    name: 'schedule-and-preferences',
  },
  {
    path: '/confirmation',
    component: Confirmation,
    name: "confirmation"
  },
  {
    path: '/sign-in',
    component: SignIn,
    name: 'sign-in'
  }
]

var router = new VueRouter({
  routes: routes,
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 }
  },
})

export default new Vue({
  router,

  mounted() {
    const userToken = this.$session.get('userToken')

    if (userToken) {
      loadUserFromToken(this.$session.get('email'), userToken)
      this.$root.$emit('payment-information:show')
    }
  }
}).$mount('#app')
