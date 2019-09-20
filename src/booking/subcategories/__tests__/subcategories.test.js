import Vue from 'vue'
import VueRouter from 'vue-router'
import fetchResponseJson from './subcategories.fetchResponse.json'
import Subcategories from '../component.vue'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import flushPromises from 'flush-promises'
import Storage from 'common/storage'
import { mockFetch, restoreFetch } from 'common/testHelper'

jest.mock('../../images/chevron.svg', () => {
  return {
  }
})

describe('Subcategories', () => {
  let oldFetch
  let wrapper

  beforeEach(() => {
    Storage.reset()

    const localVue = createLocalVue()

    mockFetch(fetchResponseJson)

    const mockRoute = {
      params: { categoryId: 1 },
    }

    wrapper = shallowMount(Subcategories, {
      data: () => ({
        stylesBySubcategory: {},
        CURL_ASSET_ROOT: 'something',
      }),
      localVue,
      stubs: ['router-link'],
      mocks: {
        $router: {},
        $route: mockRoute,
      },
    })
  })

  afterEach(() => {
    restoreFetch()
  })

  it('initializes the subcategories', async () => {
    await flushPromises()
    expect(wrapper.vm.stylesBySubcategory).toHaveProperty(
      'Curly Crochet Braids'
    )
    expect(wrapper.vm.stylesBySubcategory['Curly Crochet Braids']).toHaveLength(
      3
    )
  })
})
