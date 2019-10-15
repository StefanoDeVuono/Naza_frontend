import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    serviceOpenId: -1,
  },
  mutations: {
    changeServiceOpenId(state, serviceOpenId) {
      state.serviceOpenId = serviceOpenId
    },
  },
  getters: {
    serviceOpenId: state => state.serviceOpenId,
  },
})
