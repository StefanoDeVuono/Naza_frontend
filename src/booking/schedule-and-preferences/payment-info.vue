<template>
  <Section title="Payment Information" name="payment-information">
    <Loading :active.sync="isLoading" :is-full-page="true" />

    <template v-slot:header-icon>
      <PaymentIcon />
    </template>

    <div class="payment-disclaimer">
      <p>
        We'll use the information only in case of no show or late cancellation.
        <br />
        <a href="/">Check out our cancellation policy</a>
      </p>
    </div>

    <form action="/charge" method="post" id="payment-form">
      <div class="form-row">
        <label>Billing info:</label>

        <div id="card-element" :data-secret="setupIntentSecret">
          <!-- A Stripe Element will be inserted here. -->
        </div>

        <!-- Used to display form errors. -->
        <div id="card-errors" role="alert"></div>
      </div>
    </form>
  </Section>
</template>

<script>
import 'whatwg-fetch'
import { getStripeKey, getAppServer } from 'common/constants'
import Storage from 'common/storage'
import Loading from 'vue-loading-overlay'
import { mockProductIfDevelopment } from 'common/utils'
import 'vue-loading-overlay/dist/vue-loading.css'
import Section from '../section.vue'
import PaymentIcon from 'images/noun_payment_511229.svg'

export default {
  data() {
    return {
      stripe: Stripe(getStripeKey()),

      setupIntentSecret: undefined,
      stripeCard: undefined,
      isLoading: false,

      shared: Storage.sharedState,
    }
  },

  methods: {
    handleCardSetup(e) {
      this.isLoading = true

      this.stripe
        .handleCardSetup(this.setupIntentSecret, this.stripeCard, {
          payment_method_data: {
            billing_details: {
              name:
                this.shared.customerFirstName +
                ' ' +
                this.shared.customerLastName,
              email: this.shared.customerEmail,
              phone: this.shared.customerPhone,
            },
          },
        })
        .then(result => {
          Storage.setStripePaymentMethod(result.setupIntent.payment_method)
          this.isLoading = false
          this.$root.$emit('your-information:hide')
          this.$root.$emit('payment-information:completed')
          this.$root.$emit('payment-information:hide')
        })
    },

    handleCardChange(e) {
      const displayError = document.getElementById('card-errors')
      if (e.error) {
        displayError.textContent = e.error.message
      } else {
        displayError.textContent = ''
      }

      if (e.complete) {
        this.handleCardSetup(e)
      }
    },
  },

  created() {
    mockProductIfDevelopment()
  },

  mounted() {
    fetch(getAppServer() + '/stripe/setup_intent.json', {
      method: 'POST',
    })
      .then(resp => {
        return resp.json()
      })
      .then(json => {
        this.setupIntentSecret = json.client_secret
        const elements = this.stripe.elements()
        const style = {
          base: {
            color: '#1c3042',
            fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
            fontSize: '16px',
          },
        }
        this.stripeCard = elements.create('card', { style })
        this.stripeCard.on('change', this.handleCardChange)
        this.stripeCard.mount('#card-element')
      })
  },

  components: {
    Loading,
    Section,
    PaymentIcon,
  },
}
</script>

<style lang="less">
.payment-info {
  margin-bottom: 40px;

  label {
    margin-bottom: 10px;
    line-height: 1;
  }
}

.payment-disclaimer p {
  text-align: center;
  font-size: 14px;
  margin-bottom: 20px;

  a {
    text-decoration: underline;
    font-weight: bold;
  }
}

.StripeElement {
  box-sizing: border-box;

  height: 50px;

  padding: 14px 12px;

  border: 2px solid #1c3042;
  background-color: white;

  box-shadow: 0 1px 3px 0 #e6ebf1;
  -webkit-transition: box-shadow 150ms ease;
  transition: box-shadow 150ms ease;
}

.StripeElement--focus {
  box-shadow: 0 1px 3px 0 #cfd7df;
}

.StripeElement--invalid {
  border-color: #fa755a;
}

.StripeElement--webkit-autofill {
  background-color: #fefde5 !important;
}
</style>