import Vue from 'vue'
import VueRouter from 'vue-router'
import productFetchResponseJson from './customize.product.fetchResponse.json'
import addOnsFetchResponseJson from './customize.addOns.fetchResponse.json'
import Customize from '../customize.vue'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import flushPromises from 'flush-promises'

const mockFetchResponse = returnObj => {
  const productFetchResponse = {
    json: jest.fn(() => Promise.resolve(productFetchResponseJson)),
  }

  const addOnsFetchResponse = {
    json: jest.fn(() => Promise.resolve(addOnsFetchResponseJson)),
  }

  global.fetch = url => {
    if (url.match(/\/taxons\//)) {
      return Promise.resolve(addOnsFetchResponse)
    } else {
      return Promise.resolve(productFetchResponse)
    }
  }
}

describe('Customize', () => {
  let oldFetch
  let wrapper

  beforeEach(() => {
    const localVue = createLocalVue()
    // localVue.use(VueRouter)
    // const router = new VueRouter()

    oldFetch = global.fetch
    mockFetchResponse()

    const mockRoute = {
      query: { categoryId: 1 },
      params: { productId: 18 },
    }

    wrapper = shallowMount(Customize, {
      localVue,
      stubs: ['router-link'],
      mocks: {
        $router: {},
        $route: mockRoute,
      },
    })
  })

  afterEach(() => {
    global.fetch = oldFetch
  })

  it('initializes the product', async () => {
    await flushPromises()
    expect(wrapper.vm.product).toBeDefined()
  })

  it('initializes the addons', async () => {
    await flushPromises()
    expect(wrapper.vm.addOns).toHaveLength(5)
  })
})
