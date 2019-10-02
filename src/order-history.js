import OrderHistory from './order-history/component.vue'
import Vue from 'vue'
import VueRouter from 'vue-router'
import VueSessionStorage from 'vue-sessionstorage'
import { loadUserFromToken } from 'common/utils'

Vue.use(VueSessionStorage)
Vue.use(VueRouter)

var routes = [
  {
    path: '/',
    redirect: '/order-history'
  },
  {
    path: '/order-history',
    component: OrderHistory,
    name: 'order-history',
  },
]

var router = new VueRouter({
  routes: routes,
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 }
  },
})

export default new Vue({
  router,

  created() {
    const userToken = this.$session.get('userToken')
    
    if (userToken) {
      loadUserFromToken(this.$session.get('email'), userToken)
    }
  },
}).$mount('#app')
