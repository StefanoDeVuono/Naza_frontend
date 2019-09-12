import Vue from 'vue'
import VueRouter from 'vue-router'
import drinkFetchResponseJson from './drink.fetchResponse.json'
import freeFetchResponseJson from './free.fetchResponse.json'
import premiumFetchResponseJson from './premium.fetchResponse.json'
import AddOns from '../component.vue'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import flushPromises from 'flush-promises'
import Storage from 'common/storage'
import Group from '../group.vue'
import SqButton from 'common/sq-button.vue'

jest.mock('images/noun_drinks_2776386.svg', () => {
  return {
  }
})

describe('Add-ons', () => {
  let oldFetch
  let wrapper

  beforeEach(() => {
    Storage.reset()

    const localVue = createLocalVue()
    oldFetch = global.fetch

    global.fetch = jest.fn(url => {
      if (url.match(/drink/)) {
        return Promise.resolve(
          {
            json: () => Promise.resolve(drinkFetchResponseJson)
          }
        )
      } else if (url.match(/free/)) {
        return Promise.resolve(
          {
            json: () => Promise.resolve(freeFetchResponseJson)
          }
        )
      } else {
        return Promise.resolve(
          {
            json: () => Promise.resolve(premiumFetchResponseJson)
          }
        )
      }
    })

    const mockRoute = {
      params: { categoryId: 1 },
    }

    wrapper = shallowMount(AddOns, {
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

  it('should render 3 groups', async () => {
    await flushPromises()
    const addOns = wrapper.findAll(Group)
    expect(addOns).toHaveLength(3)
  })
})
