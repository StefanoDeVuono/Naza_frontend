import Vue from 'vue'
import VueRouter from 'vue-router'
import fetchResponseJson from './fetchResponse.json'
import AddOns from '../component.vue'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import flushPromises from 'flush-promises'
import Storage from 'common/storage'
import { mockFetch, restoreFetch } from 'common/testHelper'

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

    mockFetch(fetchResponseJson)

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
    restoreFetch()
  })

  it('should render the products', async () => {
    await flushPromises()
    const addOns = wrapper.findAll('.add-ons .product')
    expect(addOns).toHaveLength(4)
  })

  it('should select the drink variant id when clicked', async () => {
    await flushPromises()
    const addOn = wrapper.find('.product img')
    addOn.trigger('click')
    expect(wrapper.vm.selectedDrinkId).toBe("37")
  })
})
