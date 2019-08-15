import Vue from 'vue'
import VueRouter from 'vue-router'
import productFetchResponseJson from './details.product.fetchResponse.json'
import addOnsFetchResponseJson from './details.addOns.fetchResponse.json'
import Details from '../Details.vue'
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
    if (url.match(/taxons/)) {
      return Promise.resolve(addOnsFetchResponse)
    } else {
      return Promise.resolve(productFetchResponse)
    }
  }
}

describe('Details', () => {
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
      params: { productId: 2 },
    }

    wrapper = shallowMount(Details, {
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

  describe('.getDuration', () => {
    const buildProduct = minutes => {
      return {
        product_properties: [
          {
            name: 'Duration',
            value: minutes,
          },
        ],
      }
    }

    it('transforms 30 minutes to 30 minutes', () => {
      expect(wrapper.vm.getDuration(buildProduct(30))).toBe('30 minutes')
    })

    it('transforms 60 minutes to 1 hour', () => {
      expect(wrapper.vm.getDuration(buildProduct(60))).toBe('1 hour')
    })

    it('transforms 90 minutes to 1 hour 30 minutes', () => {
      expect(wrapper.vm.getDuration(buildProduct(90))).toBe('1 hour 30 minutes')
    })

    it('transforms 150 minutes to 2 hours 30 minutes', () => {
      expect(wrapper.vm.getDuration(buildProduct(150))).toBe(
        '2 hours 30 minutes'
      )
    })
  })
})
