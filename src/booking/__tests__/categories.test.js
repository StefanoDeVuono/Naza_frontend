import Vue from 'vue'
import VueRouter from 'vue-router'
import fetchResponseJson from './categories.fetchResponse.json'
import Categories from '../categories.vue'
import { shallowMount } from '@vue/test-utils'
import flushPromises from 'flush-promises'

const mockFetchResponse = returnObj => {
  const fetchResponse = {
    json: jest.fn(() => Promise.resolve(fetchResponseJson)),
  }
  global.fetch = () => Promise.resolve(fetchResponse)
}

describe('Categories', () => {
  let oldFetch

  beforeEach(() => {
    Vue.use(VueRouter)
    oldFetch = global.fetch
    mockFetchResponse()
  })

  afterEach(() => {
    global.fetch = oldFetch
  })

  it('initializes the categories', async () => {
    const wrapper = shallowMount(Categories, {
      data: () => ({
        categories: [],
        CURL_ASSET_ROOT: 'something',
      }),
    })

    await flushPromises()
    expect(wrapper.vm.categories).toHaveLength(1)
  })
})
