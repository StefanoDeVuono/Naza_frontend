import Vue from 'vue'
import VueRouter from 'vue-router'
import DurationAndPrice from '../duration-and-price.vue'
import { shallowMount, createLocalVue } from '@vue/test-utils'

describe('DurationAndPrice', () => {
  let wrapper

  beforeEach(() => {
    const localVue = createLocalVue()

    wrapper = shallowMount(DurationAndPrice, {
      localVue,
      propsData: {
        duration: 200,
        price: 100,
      },
    })
  })

  it('renders the price', () => {
    expect(wrapper.html()).toMatch(/\$100\.00/)
  })

  it('renders correctly', () => {
    expect(wrapper.html()).toMatch(/3 HRS/)
  })
})
