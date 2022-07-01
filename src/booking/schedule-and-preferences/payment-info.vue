<template>
  <div class="payment-info">
    <Loading :active.sync="isLoading" :is-full-page="true" />

    <h2>Payment Information</h2>

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

        <!--Stripe Element or Boulevard -->
        <span v-if="boulevardEnabled">
          <Card @complete="handleBoulevadCardSetup" />
        </span>
        <span v-else>
          <div id="card-element" :data-secret="setupIntentSecret">
            <!-- A Stripe Element will be inserted here. -->
          </div>
        </span>

        <!-- Used to display form errors. -->
        <div><span id=" card-errors" role="alert"></span>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import 'whatwg-fetch'
import { getStripeKey, getAppServer, getBoulevardTokenizationUrl, getBoulevardEnabled } from 'common/constants'
import Storage from 'common/storage'
import Loading from 'vue-loading-overlay'
import { mockProductIfDevelopment } from 'common/utils'
import 'vue-loading-overlay/dist/vue-loading.css'
import Section from '../components/section.vue'
import PaymentIcon from 'images/noun_payment_511229.svg'
import VueScrollTo from 'vue-scrollto'
import Card from './card.vue'

export default {
  data() {
    return {
      boulevardEnabled: getBoulevardEnabled(),
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
          if (!!result.error) {
            this.handleEventError(result)
          } else {
            Storage.setStripePaymentMethod(result.setupIntent.payment_method)
            this.$root.$emit('payment-information:completed')
            this.$root.$emit('payment-information:hide')
            this.$root.$emit('your-information:hide')
            this.$root.$emit('personal-preferences:show')
            this.$nextTick(() => {
              VueScrollTo.scrollTo('#personal-preferences-section')
            })
          }
          this.isLoading = false
        })
    },

    handleCardChange(e) {
      this.handleEventError(e)

      if (e.complete) {
        this.handleCardSetup(e)
      }
    },
    handleEventError(stripeEvent) {
      const displayError = document.getElementById('card-errors')

      if (stripeEvent.error) {
        displayError.textContent = stripeEvent.error.message
      } else {
        displayError.textContent = ''
      }
    },

    handleBoulevadCardSetup(e) {
      if (this.isLoading) return
      debugger
      this.isLoading = true
      const boulevardPayload = {
        card: {
          name: `${this.shared.customerFirstName} ${this.shared.customerLastName}`,
          number: e.card.number,
          cvv: e.card.cvc,
          exp_month: e.card.expMonth,
          exp_year: e.card.expYear,
          address_postal_code: e.card.postalCode
        }
      }
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(boulevardPayload)
      }

      fetch(getBoulevardTokenizationUrl(), options).then(result => {
        if (!!result.error) {
          this.handleBoulevadEventError(result.error)
        } else {
          return result.json()
        }
      }).then(data => {
        return fetch(getAppServer() + '/cart/update', {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            token: data.token,
            cart_id: this.shared.boulevardCartId,
            email: this.shared.customerEmail,
            first_name: this.shared.customerFirstName,
            last_name: this.shared.customerLastName,
            phone_number: this.shared.customerPhone
          })
        })
      }).then(response => {
        if (response.status === 200) {
          return response.json()
        }
        return Promise.reject()
      })
        .then(data => {

          Storage.setBoulevardCartId(data.cart_id)
          Storage.setBoulevardClientId(data.client_id)

          this.$root.$emit('payment-information:completed')
          this.$root.$emit('payment-information:hide')
          this.$root.$emit('your-information:hide')
          this.$root.$emit('personal-preferences:show')
          this.$nextTick(() => {
            VueScrollTo.scrollTo('#personal-preferences-section')
          })
          this.isLoading = false
        })
    },

    handleBoulevadCardChange(e) {
      this.handleBoulevadEventError(e)

      if (e.complete) {
        this.handleBoulevadCardSetup(e)
      }
    },

    handleBoulevadEventError(boulevardEvent) {
      console.error(boulevardEvent)
    }
  },

  created() {
    mockProductIfDevelopment()
  },

  mounted() {
    // set up boulevard cart if we're using boulevard
    if (getBoulevardEnabled())
      return fetch(getAppServer() + '/cart/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => {
          if (response.status === 200) {
            return response.json()
          }
          return Promise.reject()
        })
        .then(data => {
          Storage.setBoulevardCartId(data.cart_id)
        })


    fetch(getAppServer() + '/stripe/setup_intent.json', {
      method: 'POST',
    })
      .then(resp => {
        if (resp.status === 200) {
          return resp.json()
        }
        return Promise.reject()
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
      .catch(() => {
        this.$emit('stripe-setup-intent-error')
      })
  },

  components: {
    Loading,
    Section,
    PaymentIcon,
    Card
  },
}
</script>

<style lang="less" scoped>
@import '../../common/utils.less';

.payment-info {
  h2 {
    .sans-serif();
    font-size: 16px;
    font-weight: bold;
    text-transform: uppercase;
    color: @darkBlue;
  }
}

.payment-disclaimer p {
  font-size: 14px;
  margin-bottom: 20px;

  a {
    text-decoration: underline;
    font-weight: bold;
  }
}

#payment-form label {
  .sans-serif();
}

.StripeElement {
  box-sizing: border-box;

  height: 50px;

  padding: 14px 12px;
  margin: 6px 0;

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

#card-errors {
  color: @deepRed;
  font-size: 14px;
  font-weight: bold;
  line-height: 1.43;
  letter-spacing: 0.5px;
  padding-top: 10px;
}
</style>
