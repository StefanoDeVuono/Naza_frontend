import Vue from 'vue'
import VueRouter from 'vue-router'
import fetchResponseJson from './styles.fetchResponse.json'
import Styles from '../styles.vue'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import flushPromises from 'flush-promises'

const mockFetchResponse = returnObj => {
  const fetchResponse = {
    json: jest.fn(() => Promise.resolve(fetchResponseJson)),
  }
  global.fetch = () => Promise.resolve(fetchResponse)
}

describe('Styles', () => {
  let oldFetch
  let wrapper

  beforeEach(() => {
    const localVue = createLocalVue()
    // localVue.use(VueRouter)
    // const router = new VueRouter()

    oldFetch = global.fetch
    mockFetchResponse()

    const mockRoute = {
      params: { categoryId: 1 }
    }

    wrapper = shallowMount(Styles, {
      data: () => ({
        stylesBySubcategory: {},
        CURL_ASSET_ROOT: 'something',
      }),
      localVue,
      stubs: ['router-link'],
      mocks: {
        $router: {},
        $route: mockRoute
      }
    })
  })

  afterEach(() => {
    global.fetch = oldFetch
  })

  // this also tests that the taxon that correlates to the taxonomy is
  // stripped out
  it('initializes the subcategories', async () => {
    await flushPromises()
    expect(wrapper.vm.stylesBySubcategory).toHaveProperty('Cornrows')
  })
})
