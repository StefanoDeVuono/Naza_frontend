import Vue from 'vue'
import VueRouter from 'vue-router'
import Content from '../content.vue'
import { shallowMount, createLocalVue } from '@vue/test-utils'

describe('Styles', () => {
  let wrapper

  beforeEach(() => {
    const localVue = createLocalVue()

    wrapper = shallowMount(Content, {
      slots: {
        default: ['hello world']
      },
      localVue
    })
  })

  it('renders the slotted component', () => {
    expect(wrapper.html()).toMatch(/hello world/)
  })
})
