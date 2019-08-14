import Vue from 'vue'
import VueRouter from 'vue-router'
import fetchResponseJson from './categories.fetchResponse.json'
import Categories from '../categories.vue'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import flushPromises from 'flush-promises'

const mockFetchResponse = returnObj => {
  const fetchResponse = {
    json: jest.fn(() => Promise.resolve(fetchResponseJson)),
  }
  global.fetch = () => Promise.resolve(fetchResponse)
}

describe('Categories', () => {
  let oldFetch
  let wrapper

  beforeEach(() => {
    const localVue = createLocalVue()
    localVue.use(VueRouter)
    const router = new VueRouter()

    oldFetch = global.fetch
    mockFetchResponse()

    wrapper = shallowMount(Categories, {
      data: () => ({
        categories: [],
        CURL_ASSET_ROOT: 'something',
      }),
      localVue,
      router,
    })
  })

  afterEach(() => {
    global.fetch = oldFetch
  })

  // this also tests that the taxon that correlates to the taxonomy is
  // stripped out
  it('initializes the categories', async () => {
    await flushPromises()
    expect(wrapper.vm.categories).toHaveLength(1)
  })
})