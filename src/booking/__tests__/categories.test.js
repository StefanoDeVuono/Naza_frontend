import Vue from 'vue'
import VueRouter from 'vue-router'
import fetchResponseJson from './categories.fetchResponse.json'
import Categories from '../categories/component.vue'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import flushPromises from 'flush-promises'
import Storage from 'common/storage'

jest.mock('../../images/chevron.svg', () => {
  return {
  }
})

const mockFetchResponse = returnObj => {
  const fetchResponse = {
    json: jest.fn(() => Promise.resolve(fetchResponseJson)),
  }
  global.fetch = () => Promise.resolve(fetchResponse)
}

// TODO: update json files

describe('Categories', () => {
  let oldFetch
  let wrapper

  beforeEach(() => {
    Storage.reset()

    const localVue = createLocalVue()
    localVue.use(VueRouter)
    const router = new VueRouter()

    oldFetch = global.fetch
    mockFetchResponse()

    wrapper = shallowMount(Categories, {
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
    expect(wrapper.vm.categories).toHaveLength(5)
  })
})
