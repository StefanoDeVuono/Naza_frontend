import Vue from 'vue'
import VueRouter from 'vue-router'
import TimeSlots from '../time-slots.vue'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import fetchResponseJson from './appointment-picker.fetchResponse.json'
import flushPromises from 'flush-promises'

describe('TimeSlots', () => {
  let wrapper
  let handleTimeSelected

  beforeEach(() => {
    const localVue = createLocalVue()
    handleTimeSelected = jest.fn()

    wrapper = shallowMount(TimeSlots, {
      propsData: {
        onTimeSelected: handleTimeSelected,
        slotsByDate: fetchResponseJson
      },
      localVue
    })
  })

  describe('when a slot is clicked', () => {
    it('calls the callback', async () => {
      wrapper.find('.time-slot').trigger('click')
      await flushPromises()
      expect(handleTimeSelected).toHaveBeenCalledWith('2019-08-28T09:00:00-0700')
    })

    it('sets state', async () => {
      wrapper.find('.time-slot').trigger('click')
      await flushPromises()
      expect(wrapper.vm.activeDate).toEqual('2019-08-28')
      expect(wrapper.vm.activePosition).toEqual(1)
    })
  })
})
