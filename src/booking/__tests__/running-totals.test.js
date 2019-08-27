import Vue from 'vue'
import VueRouter from 'vue-router'
import RunningTotals from '../running-totals.vue'
import { shallowMount, createLocalVue } from '@vue/test-utils'

describe('RunningTotals', () => {
  let wrapper

  const buildWrapper = (price, duration) => {
    const localVue = createLocalVue()
    return shallowMount(RunningTotals, {
      propsData: {
        price,
        duration
      },
      localVue
    })
  }

  it('transform 0 minutes', () => {
    wrapper = buildWrapper(30, 0) 
    expect(wrapper.html()).toMatch(/0 HRS/)    
  })

  it('transforms 30 minutes', () => {
    wrapper = buildWrapper(30, 30) 
    expect(wrapper.html()).toMatch(/1 HR/)
  })

  it('transforms 60 minutes', () => {
    wrapper = buildWrapper(30, 60)
    expect(wrapper.html()).toMatch(/1 HR/)
  })

  it('transforms 90 minutes', () => {
    wrapper = buildWrapper(30, 90)
    expect(wrapper.html()).toMatch(/2 HRS/)
  })

  it('transforms 150 minutes', () => {
    wrapper = buildWrapper(30, 150)
    expect(wrapper.html()).toMatch(/3 HRS/)
  })

  it('transforms price', () => {
    wrapper = buildWrapper(30, 0) 
    expect(wrapper.html()).toMatch(/\$30\.00/)   
  })
})