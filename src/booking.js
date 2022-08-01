import Categories from './booking/categories/component.vue'
import Customize from './booking/customize/component.vue'
import Subcategories from './booking/subcategories/component.vue'
import ScheduleAndPreferences from './booking/schedule-and-preferences/component.vue'
import Confirmation from './booking/confirmation/component.vue'
import SignIn from './user/sign-in.vue'
import Sync from './admin/sync.vue'
import LandingPage from './booking/landing-page/component.vue'
import PageNotFound from './common/page-not-found.vue'
import Vue from 'vue'
Vue.config.devtools = true
import VueRouter from 'vue-router'
import VueSessionStorage from 'vue-sessionstorage'
import { loadUserFromToken } from 'common/utils'
import VueModal from 'vue-js-modal'
import { store } from './booking/store'
Vue.use(VueSessionStorage)
Vue.use(VueRouter)
Vue.use(VueModal)

var routes = [
  {
    path: '/',
    component: LandingPage,
    name: 'landing-page',
  },
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
  },
  {
    path: '/sync',
    component: Sync,
    name: 'sync'
  },
  {
    path: '*',
    component: PageNotFound
  }
]

var router = new VueRouter({
  routes,
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 }
  },
})

export default new Vue({
  router,
  store,
  created() {
    const userToken = this.$session.get('userToken')

    if (userToken) {
      loadUserFromToken(this.$session.get('email'), userToken)
    }
  },

  mounted() {
    const userToken = this.$session.get('userToken')

    if (userToken) {
      this.$root.$emit('payment-information:show')
    }
  }
}).$mount('#app')
