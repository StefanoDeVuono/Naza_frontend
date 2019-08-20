import Vue from 'vue'
import VueRouter from 'vue-router'
import DurationAndCost from '../duration-and-cost.vue'
import { shallowMount, createLocalVue } from '@vue/test-utils'

describe('DurationAndCost', () => {
  let wrapper

  beforeEach(() => {
    const localVue = createLocalVue()

    wrapper = shallowMount(DurationAndCost, {
      propsData: {
        cost: 100,
        duration: 200,
      },
      localVue
    })
  })

  it('renders the cost', () => {
    expect(wrapper.html()).toMatch(/\$100\.00/)
  })

  it ('renders correctly', () => {
    expect(wrapper.html()).toMatch(/3 HRS/)
  })
})
