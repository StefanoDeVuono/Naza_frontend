import Vue from 'vue'
import VueRouter from 'vue-router'
import fetchResponseJson from './appointmentHistory.fetchResponse.json'
import AppointmentHistory from '../component.vue'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import flushPromises from 'flush-promises'
import Storage from 'common/storage'

const mockFetchResponse = returnObj => {
  const fetchResponse = {
    json: jest.fn(() => Promise.resolve(fetchResponseJson)),
  }
  global.fetch = () => Promise.resolve(fetchResponse)
}

// TODO: update json files

describe('Order History', () => {
  let oldFetch
  let wrapper

  beforeEach(() => {
    Storage.reset()

    const localVue = createLocalVue()
    localVue.use(VueRouter)
    const router = new VueRouter()

    oldFetch = global.fetch
    mockFetchResponse()

    wrapper = shallowMount(AppointmentHistory, {
      localVue,
      router,
    })

    Storage.sharedState.userToken = 'abcd'
  })

  afterEach(() => {
    global.fetch = oldFetch
  })

  // this also tests that the taxon that correlates to the taxonomy is
  // stripped out
  it('initializes the appointments', async () => {
    await flushPromises()
    expect(wrapper.vm.appointments).toHaveLength(1)
  })
})
