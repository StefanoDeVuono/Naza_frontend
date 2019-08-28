import Vue from 'vue'
import VueRouter from 'vue-router'
import DurationAndPrice from '../duration-and-price.vue'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import Storage from 'common/storage'

describe('DurationAndPrice', () => {
  let wrapper

  beforeEach(() => {
    Storage.reset()
    Storage.setPrice(100)
    Storage.setDuration(200)
    const localVue = createLocalVue()

    wrapper = shallowMount(DurationAndPrice, {
      localVue
    })
  })

  it('renders the price', () => {
    expect(wrapper.html()).toMatch(/\$100\.00/)
  })

  it ('renders correctly', () => {
    expect(wrapper.html()).toMatch(/3 HRS/)
  })
})
