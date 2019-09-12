import Vue from 'vue'
import VueRouter from 'vue-router'
import TimeSlots from '../time-slots.vue'
import { shallowMount, createLocalVue, createWrapper } from '@vue/test-utils'
import fetchResponseJson from './appointment-picker.fetchResponse.json'
import flushPromises from 'flush-promises'
import Storage from 'common/storage'

describe('TimeSlots', () => {
  let wrapper
  let handleTimeSelected
  let localVue

  beforeEach(() => {
    Storage.reset()

    localVue = createLocalVue()
    handleTimeSelected = jest.fn()

    wrapper = shallowMount(TimeSlots, {
      propsData: {
        onTimeSelected: handleTimeSelected,
        slotsByDate: fetchResponseJson,
      },
      localVue,
    })
  })

  describe('when a slot is clicked', () => {
    it('calls the callback', async () => {
      wrapper.find('.time-slot').trigger('click')
      await flushPromises()
      const rootWrapper = createWrapper(wrapper.vm.$root)
      expect(rootWrapper.emitted('appointment-picker:selected')).toBeTruthy()
    })

    it('sets state', async () => {
      wrapper.find('.time-slot').trigger('click')
      await flushPromises()
      expect(wrapper.vm.activeDate).toEqual('2019-08-28')
      expect(wrapper.vm.activePosition).toEqual(1)
    })
  })
})
