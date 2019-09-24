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
  })

  afterEach(() => {
    restoreFetch()
  })

  describe('Upon mount, when there is an error on stripe/setup_intent', () => {
    beforeEach(() => {
      mockFetch({ message: 'Stripe Server Error' }, 500)

      wrapper = shallowMount(PaymentInfo, {
        localVue,
      })
    })

    it('emits stripeSetupIntentError', async () => {
      await flushPromises()
      expect(wrapper.emitted().stripeSetupIntentError).toBeTruthy()
    })
  })

  describe('#handleCardSetup when there is a Stripe error', () => {
    let clientSecretStub
    let vm
    let stripeHandleCardSetupErrorResult

    beforeEach(async () => {
      clientSecretStub = 'Stubbed Client Secret'
      stripeHandleCardSetupErrorResult = {
          error: 'Card has been declined'
      }

      mockFetch({
        client_secret: clientSecretStub
      }, 200)

      wrapper = shallowMount(PaymentInfo, {
        localVue,
      })

      vm = wrapper.vm

      await flushPromises()
    })

    it('handleEventError is called', async () => {
      expect(vm.setupIntentSecret).toEqual(clientSecretStub)

      Stripe().handleCardSetup.mockResolvedValue(stripeHandleCardSetupErrorResult)
      vm.handleEventError = jest.fn()

      await vm.handleCardSetup({})

      expect(vm.handleEventError).toHaveBeenCalledWith(stripeHandleCardSetupErrorResult)
    })
  })
})

