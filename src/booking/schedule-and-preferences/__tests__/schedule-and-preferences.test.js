import ScheduleAndPreferences from '../component.vue'
import { GENERIC_SERVER_ERROR } from '../component.vue'

import Storage from "common/storage";
import {createLocalVue, shallowMount} from "@vue/test-utils";
import {mockFetch, restoreFetch} from "common/testHelper";
import flushPromises from "flush-promises";

// Mock import of assets in Children
jest.mock('images/noun_Calendar_2804231.svg', () => {})
jest.mock('images/noun_Calendar_1074173.svg', () => {})
jest.mock('images/noun_hairstyle_1105146.svg', () => {})
jest.mock('images/noun_shampoo_2677530.svg', () => {})
jest.mock('vue-loading-overlay/dist/vue-loading.css', () => {})
jest.mock('images/noun_payment_511229.svg', () => {})
jest.mock('../../images/group-5.svg', () => {})

describe('ScheduleAndPreferences', () => {
  let wrapper

  beforeEach(() => {
    Storage.reset()
  })

  afterEach(() => {
    restoreFetch()
  })

  describe('#createOrUpdateUser', () => {
    beforeEach(() => {
      Storage.sharedState.product = {
        name: 'A fake product'
      }
    })

    it('Sets spreeUserId when successful', async () => {
      const spreeUserIdStub = 'fake-id'
      mockFetch({data: { id: spreeUserIdStub} })

      wrapper = shallowMount(ScheduleAndPreferences)

      expect(wrapper.vm.shared.spreeUserId).toBeFalsy()

      await wrapper.vm.createOrUpdateUser()
      await flushPromises()
      expect(wrapper.vm.shared.spreeUserId).toEqual(spreeUserIdStub)
    });

    it('Sets generic error when API response is 500', (done) => {
      mockFetch({}, 500)
      wrapper = shallowMount(ScheduleAndPreferences)
      expect(wrapper.vm.errors.length).toEqual(0)

      flushPromises()
      .then(() => wrapper.vm.createOrUpdateUser())
      .catch(() => {
        expect(wrapper.vm.errors[0]).toEqual(GENERIC_SERVER_ERROR)
        done()
      })
    })

    it('Sets response errors when API response is 400', (done) => {
      const responseErrorStub = 'Stubbed client error'

      mockFetch({errors: [responseErrorStub]}, 400)
      wrapper = shallowMount(ScheduleAndPreferences)
      expect(wrapper.vm.errors.length).toEqual(0)

      flushPromises()
      .then(() => wrapper.vm.createOrUpdateUser())
      .catch(() => {
        expect(wrapper.vm.errors[0]).toEqual(responseErrorStub)
        done()
      })
    })

    it('Sets generic error when there is a json parsing issue', (done) => {
      mockFetch('Not JSON', 403)
      wrapper = shallowMount(ScheduleAndPreferences)
      expect(wrapper.vm.errors.length).toEqual(0)

      flushPromises()
      .then(() => wrapper.vm.createOrUpdateUser())
      .catch(() => {
        expect(wrapper.vm.errors[0]).toEqual(GENERIC_SERVER_ERROR)
        done()
      })
    })
  })

  describe('#bookAppointment', () => {
    let vm
    let $router

    beforeEach(() => {
      $router = {
        push: jest.fn()
      }

      Storage.sharedState.product = {
        name: 'A fake product'
      }

      vm = shallowMount(ScheduleAndPreferences, {
        mocks: { $router }
      }).vm
    })

    it('shows page in a loading state', async () => {
      mockFetch({})
      expect(vm.isLoading).toEqual(false)
      vm.bookAppointment()
      expect(vm.isLoading).toEqual(true)
      await flushPromises()
    })

    it('page stops loading when all requests are successful', async () => {
      expect(vm.isLoading).toEqual(false)

      vm.createOrder = jest.fn().mockResolvedValue({})
      vm.addStyleToCart = jest.fn().mockResolvedValue({})
      vm.addAddOnsToCart = jest.fn().mockResolvedValue({})
      vm.createOrUpdateUser = jest.fn().mockResolvedValue({})
      vm.completeCheckout = jest.fn().mockResolvedValue({})

      await vm.bookAppointment()
      expect(vm.isLoading).toEqual(false);
    })

    it('routes to confirmation page when all requests are successful', async () => {
      vm.createOrder = jest.fn().mockResolvedValue({})
      vm.addStyleToCart = jest.fn().mockResolvedValue({})
      vm.addAddOnsToCart = jest.fn().mockResolvedValue({})
      vm.createOrUpdateUser = jest.fn().mockResolvedValue({})
      vm.completeCheckout = jest.fn().mockResolvedValue({})

      await vm.bookAppointment()
      expect($router.push).toHaveBeenCalledWith({name: 'confirmation'})
    })

    it('when any of the requests errors, page stops loading', async () => {
      vm.createOrder = jest.fn().mockResolvedValue({})
      vm.addStyleToCart = jest.fn().mockRejectedValue({})

      await vm.bookAppointment()
      expect(vm.isLoading).toEqual(false);
    })

    it('when any of the requests errors, submitting again will only call the failed request again', async () => {
      vm.createOrder = jest.fn().mockResolvedValue({})
      vm.addStyleToCart = jest.fn()
        .mockRejectedValueOnce({})
        .mockResolvedValueOnce({})
      vm.addAddOnsToCart = jest.fn().mockResolvedValue({})
      vm.createOrUpdateUser = jest.fn().mockResolvedValue({})
      vm.completeCheckout = jest.fn().mockResolvedValue({})

      await vm.bookAppointment()
      await vm.bookAppointment()

      expect(vm.createOrder).toHaveBeenCalledTimes(1)
      expect(vm.addStyleToCart).toHaveBeenCalledTimes(2)
      expect(vm.addAddOnsToCart).toHaveBeenCalledTimes(1)
      expect(vm.createOrUpdateUser).toHaveBeenCalledTimes(1)
      expect(vm.completeCheckout).toHaveBeenCalledTimes(1)
    })
  })

  describe('#createOrder', () => {
    it('sets orderNumber and orderToken when successful', async () => {
      const attributes = {
        number: 'fake order number',
        token: 'fake order token'
      }

      const $session = {
        set: jest.fn()
      }

      mockFetch({data: { attributes }})

      wrapper = shallowMount(ScheduleAndPreferences, {
        mocks: { $session }
      })

      expect(wrapper.vm.shared.orderNumber).toBeFalsy()
      expect(wrapper.vm.shared.orderToken).toBeFalsy()

      await wrapper.vm.createOrder()
      await flushPromises()
      expect($session.set).toHaveBeenCalledWith('orderNumber', attributes.number)
      expect(wrapper.vm.shared.orderNumber).toEqual(attributes.number)
      expect(wrapper.vm.shared.orderToken).toEqual(attributes.token)
    })

    it('Sets a Generic error when there are any API errors', (done) => {
      mockFetch({}, 422)
      wrapper = shallowMount(ScheduleAndPreferences)
      expect(wrapper.vm.errors.length).toEqual(0)

      flushPromises()
      .then(() => wrapper.vm.createOrder())
      .catch(() => {
        expect(wrapper.vm.errors[0]).toEqual(GENERIC_SERVER_ERROR)
        done()
      })
    })

    it('Sets a Generic error when there are JSON parsing errors', (done) => {
      mockFetch('Not JSON Parsible', 200)
      wrapper = shallowMount(ScheduleAndPreferences)
      expect(wrapper.vm.errors.length).toEqual(0)

      flushPromises()
      .then(() => wrapper.vm.createOrder())
      .catch(() => {
        expect(wrapper.vm.errors[0]).toEqual(GENERIC_SERVER_ERROR)
        done()
      })
    })
  })

  describe('#addStyleToCart', () => {
    beforeEach(() => {
      wrapper = shallowMount(ScheduleAndPreferences)
      wrapper.vm.shared.variant = { id: 'fake ID'}
    })

    it('Returns a resolved promise when successful', async () => {
      mockFetch({})

      const result = await wrapper.vm.addStyleToCart()
      await flushPromises()
      expect(result).toBeTruthy()
    })

    it('Sets a Generic error when there are any API errors', (done) => {
      mockFetch({}, 422)
      expect(wrapper.vm.errors.length).toEqual(0)

      flushPromises()
      .then(() => wrapper.vm.addStyleToCart())
      .catch(() => {
        expect(wrapper.vm.errors[0]).toEqual(GENERIC_SERVER_ERROR)
        done()
      })
    })

    it('Sets a Generic error when there are JSON parsing errors', (done) => {
      mockFetch('Not Json')
      expect(wrapper.vm.errors.length).toEqual(0)

      flushPromises()
      .then(() => wrapper.vm.addStyleToCart())
      .catch(() => {
        expect(wrapper.vm.errors[0]).toEqual(GENERIC_SERVER_ERROR)
        done()
      })
    })
  })

  describe('#addAddOnToCart', () => {
    beforeEach(() => {
      wrapper = shallowMount(ScheduleAndPreferences)
    })

    it('Returns a resolved promise when successful', async () => {
      mockFetch({})

      const result = await wrapper.vm.addAddOnToCart()
      await flushPromises()
      expect(result).toBeTruthy()
    })

    it('Sets a Generic error when there are any API errors', (done) => {
      mockFetch({}, 422)
      expect(wrapper.vm.errors.length).toEqual(0)

      flushPromises()
      .then(() => wrapper.vm.addAddOnToCart())
      .catch(() => {
        expect(wrapper.vm.errors[0]).toEqual(GENERIC_SERVER_ERROR)
        done()
      })
    })

    it('Sets a Generic error when there are JSON parsing errors', (done) => {
      mockFetch('Not JSON Parsible', 200)
      expect(wrapper.vm.errors.length).toEqual(0)

      flushPromises()
      .then(() => wrapper.vm.addAddOnToCart())
      .catch(() => {
        expect(wrapper.vm.errors[0]).toEqual(GENERIC_SERVER_ERROR)
        done()
      })
    })
  })

  describe('#completeCheckout', () => {
    beforeEach(() => {
      wrapper = shallowMount(ScheduleAndPreferences)
    })

    it('Returns a resolved promise when successful', async () => {
      mockFetch({})

      await flushPromises()
      const result = await wrapper.vm.completeCheckout()
      expect(result).toBeTruthy()
    })

    it('Sets a Generic error when there are any API errors', (done) => {
      mockFetch({}, 422)
      expect(wrapper.vm.errors.length).toEqual(0)

      flushPromises()
      .then(() => wrapper.vm.completeCheckout())
      .catch(() => {
        expect(wrapper.vm.errors[0]).toEqual(GENERIC_SERVER_ERROR)
        done()
      })
    })

    it('Sets a Generic error when there are JSON parsing errors', (done) => {
      mockFetch('Not JSON Parsible', 200)
      expect(wrapper.vm.errors.length).toEqual(0)

      flushPromises()
      .then(() => wrapper.vm.completeCheckout())
      .catch(() => {
        expect(wrapper.vm.errors[0]).toEqual(GENERIC_SERVER_ERROR)
        done()
      })
    })
  })
})