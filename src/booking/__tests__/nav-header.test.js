import Vue from 'vue'
import VueRouter from 'vue-router'
import NavHeader from '../nav-header.vue'
import { shallowMount, createLocalVue } from '@vue/test-utils'

describe('Styles', () => {
  let wrapper

  beforeEach(() => {
    const localVue = createLocalVue()

    wrapper = shallowMount(NavHeader, {
      propsData: {
        totalCost: 100,
        totalDuration: 200,
        showBackArrow: true
      },
      localVue
    })
  })

  describe('.formattedCost', () => {
    it('renders correctly', () => {
      expect(wrapper.vm.formattedCost).toBe('$100.00')
    })
  })

  describe('.formattedHours', () => {
    it ('renders correctly', () => {
      expect(wrapper.vm.formattedHours).toBe('3 HRS')
    })
  })
})
