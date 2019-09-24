import Vue from 'vue'
import VueRouter from 'vue-router'
import AppointmentPicker from '../appointment-picker.vue'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import { mockFetch, restoreFetch } from 'common/testHelper'
import fetchResponseJson from './appointment-picker.fetchResponse.json'
import nextFetchResponseJson from './appointment-picker.next.fetchResponse.json'
import fetchErronResponseJson from './appointment-picker.fetchErrorResponse'
import flushPromises from 'flush-promises'
import { map, nth } from 'ramda'
import Storage from 'common/storage'

jest.mock('images/noun_Calendar_2804231.svg', () => {
  return {
    CalendarIcon: () => null,
  }
})

describe('AppointmentPicker', () => {
  let wrapper
  let localVue

  beforeEach(() => {
    Storage.reset()
    jest.spyOn(Date, 'now').mockImplementation(() => 1566933102428)
    localVue = createLocalVue()
    mockFetch(fetchResponseJson)

    wrapper = shallowMount(AppointmentPicker, {
      localVue,
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
    expect(map(nth(0), wrapper.vm.slotsByDate)).toEqual([
      '2019-08-28',
      '2019-08-29',
      '2019-08-30',
    ])
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
      expect(map(nth(0), wrapper.vm.slotsByDate)).toEqual([
        '2019-08-31',
        '2019-09-01',
        '2019-09-02',
      ])
    })
  })

  describe('When there is an API error', () => {
    beforeEach(() => {
      mockFetch(fetchErronResponseJson)
      wrapper = shallowMount(AppointmentPicker, {
        localVue,
      })
    })

    it('emits availableTimesError event', async () => {
      await flushPromises()
      const emitted = wrapper.emitted().availableTimesError

      expect(emitted).toBeTruthy()
      expect(emitted[0][0][0]).toEqual('Mocked Server Error')
    });
  })
})
