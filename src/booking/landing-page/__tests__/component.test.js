import Vue from 'vue'
import VueRouter from 'vue-router'
import { shallowMount, createLocalVue } from '@vue/test-utils'

import LandingPageComponent from '../component.vue'
import BookButton from '../book-button.vue'

jest.mock('../../images/chevron.svg', () => {
  return {}
})

describe('LandingPageComponent', () => {
  let wrapper
  let localVue

  beforeEach(() => {
    localVue = createLocalVue()
    localVue.use(VueRouter)
    const router = new VueRouter()
    wrapper = shallowMount(LandingPageComponent, {
      localVue,
      router,
    })
  })

  it('renders', () => {
    expect(wrapper.contains('.hero')).toBe(true)
  })
})
