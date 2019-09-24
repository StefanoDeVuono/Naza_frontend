import PaymentInfo from '../payment-info'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import { mockFetch, restoreFetch } from 'common/testHelper'
import flushPromises from 'flush-promises'
import Storage from 'common/storage'

jest.mock('vue-loading-overlay/dist/vue-loading.css', () => {})
jest.mock('images/noun_payment_511229.svg', () => {})

describe('PaymentInfo', () => {
  let wrapper
  let localVue

  beforeEach(() => {
    Storage.reset()
    localVue = createLocalVue()
    mockFetch({ message: 'Stripe Server Error' }, 500)

    wrapper = shallowMount(PaymentInfo, {
      localVue,
    })
  })

  afterEach(() => {
    restoreFetch()
  })

  describe('When there is an error on stripe/setup_intent', () => {
    it('emits stripeSetupIntentError', async () => {
      await flushPromises()
      expect(wrapper.emitted().stripeSetupIntentError).toBeTruthy()
    })
  })
})

