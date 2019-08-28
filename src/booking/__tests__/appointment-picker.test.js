import Vue from 'vue'
import VueRouter from 'vue-router'
import AppointmentPicker from '../appointment-picker.vue'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import { mockFetch, restoreFetch } from 'common/testHelper'
import fetchResponseJson from './appointment-picker.fetchResponse.json'
import nextFetchResponseJson from './appointment-picker.next.fetchResponse.json'
import flushPromises from 'flush-promises'
import { map, nth } from 'ramda'
import Storage from 'common/storage'

describe('AppointmentPicker', () => {
  let wrapper
  let handleTimeSelected

  beforeEach(() => {
    Storage.reset()
    jest.spyOn(Date, 'now').mockImplementation(() => 1566933102428)
    const localVue = createLocalVue()
    handleTimeSelected = jest.fn()
    mockFetch(fetchResponseJson)

    wrapper = shallowMount(AppointmentPicker, {
      propsData: {
        onTimeSelected: handleTimeSelected
      },
      localVue
    })
  })

  afterEach(() => {
    restoreFetch()
    jest.restoreAllMocks()
  })

  it('fetches the data', async () => {
    await flushPromises()
    expect(wrapper.vm.slotsByDate).toBeDefined()
    expect(wrapper.vm.slotsByDate).toHaveLength(3)
    expect(map(nth(0), wrapper.vm.slotsByDate)).toEqual(["2019-08-28", "2019-08-29", "2019-08-30"])
  })

  it('shows tomorrow', async () => {
    await flushPromises()
    expect(wrapper.text()).toMatch(/Tomorrow/)
  })

  describe('after click More times', () => {
    it('fetches the next 3 days', async () => {
      await flushPromises()

      restoreFetch()
      mockFetch(nextFetchResponseJson)

      wrapper.find('.more span').trigger('click')
      await flushPromises()
      expect(map(nth(0), wrapper.vm.slotsByDate)).toEqual(["2019-08-31", "2019-09-01", "2019-09-02"])
    })
  })
})
