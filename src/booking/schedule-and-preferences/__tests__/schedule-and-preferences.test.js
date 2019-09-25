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

    it('Sets spreeUserId upon successful request', async () => {
      const spreeUserIdStub = 'fake-id'
      mockFetch({data: { id: spreeUserIdStub} })

      wrapper = shallowMount(ScheduleAndPreferences)

      expect(wrapper.vm.shared.spreeUserId).toBeFalsy()

      wrapper.vm.createOrUpdateUser()
      await flushPromises()
      expect(wrapper.vm.shared.spreeUserId).toEqual(spreeUserIdStub)
    });

    it('Sets generic error when API response is 500', (done) => {
      mockFetch({}, 500)
      wrapper = shallowMount(ScheduleAndPreferences)
      expect(wrapper.vm.errors).toEqual([])

      flushPromises().then(() => {
        return wrapper.vm.createOrUpdateUser()
      }).catch(() => {
        expect(wrapper.vm.errors[0]).toEqual(GENERIC_SERVER_ERROR)
        done()
      })
    });

    it('Sets response errors when API response is 400', (done) => {
      const responseErrorStub = 'Stubbed client error'

      mockFetch({errors: responseErrorStub}, 400)
      wrapper = shallowMount(ScheduleAndPreferences)
      expect(wrapper.vm.errors).toEqual([])

      flushPromises().then(() => {
        return wrapper.vm.createOrUpdateUser()
      }).catch(() => {
        expect(wrapper.vm.errors[0]).toEqual(responseErrorStub)
        done()
      })
    })

    it('Sets generic error when there is a json parsing issue', (done) => {
      mockFetch('<html>Forbidden!</html>', 403)
      wrapper = shallowMount(ScheduleAndPreferences)
      expect(wrapper.vm.errors).toEqual([])

      flushPromises().then(() => {
        return wrapper.vm.createOrUpdateUser()
      }).catch(() => {
        expect(wrapper.vm.errors[0]).toEqual(GENERIC_SERVER_ERROR)
        done()
      })
    })
  })

  describe('#bookAppointment', () => {
    it('shows page is loading while awaiting for async requests', () => {})
    it('when there are errors, page is done loading', () => {})
    it('when there are errors, shows an error message', () => {})
  })
})