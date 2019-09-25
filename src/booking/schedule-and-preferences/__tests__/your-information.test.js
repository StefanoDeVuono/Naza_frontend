import Vue from 'vue'
import VueRouter from 'vue-router'
import YourInformation from '../your-information.vue'
import { shallowMount, createLocalVue, createWrapper } from '@vue/test-utils'
import flushPromises from 'flush-promises'
import Storage from 'common/storage'

jest.mock('images/noun_hairstyle_1105146.svg', () => {
  return {
    CalendarIcon: () => null
  }
})
jest.mock('vue-loading-overlay/dist/vue-loading.css', () => {
  return {}
})
jest.mock('images/noun_payment_511229.svg', () => {
  return {}
})

describe('YourInformation', () => {
  let wrapper
  let handleTimeSelected
  let localVue

  beforeEach(() => {
    Storage.reset()

    localVue = createLocalVue()
    handleTimeSelected = jest.fn()

    wrapper = shallowMount(YourInformation, {
      localVue,
    })
  })

  describe('when all the fields are filled', () => {
    it('emits an event', async () => {
      Storage.sharedState.customerFirstName = 'alien'
      Storage.sharedState.customerLastName = 'predator'
      Storage.sharedState.customerZipCode = '12345'
      Storage.sharedState.customerEmail = 'a@b.c'
      Storage.sharedState.customerPhone = '555-555-5555'
      Storage.sharedState.customerPassword = 'alien555'
      const rootWrapper = createWrapper(wrapper.vm.$root)
      await flushPromises()
      expect(rootWrapper.emitted('payment-information:show')).toBeTruthy()
    })

  })
})
