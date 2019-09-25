<template>
  <div class="schedule-and-preferences">
    <Errors v-bind:errors="errors" />

    <LightHeader
      :showBackArrow="true"
      :totalPrice="parseInt(shared.price)"
      :totalDuration="parseInt(shared.duration)"
    />

    <Loading :active.sync="isLoading" :is-full-page="true" />

    <Content :progress-step="5">
      <StepHeader
        stepTitle="Step Five"
        imageUrl="https://s3.amazonaws.com/projectcurl-assets/HowItWorks/step5.png"
        ctaText="Select a day &amp; time below and insert your personal details to confirm your reservation."
      />

      <div class="sections">
        <AppointmentSummary  @availableTimesError="handleAvailableTimesError"/>

        <YourInformation @stripeSetupIntentError="handleStripeServerError"/>

        <PersonalPreferences />

        <div class="cancellation-policy">
          <h3>Cancellation Policy</h3>
          <p>
            A 24-hour cancellation notice is required to avoid being fully
            charged for the appointment.
          </p>
        </div>

        <SqButton
          label="Book Appointment"
          :onClick="bookAppointment"
          :disabled="!isPaymentSaved"
        />
      </div>
    </Content>
  </div>
</template>

<script>
import AppointmentSummary from './appointment-summary.vue'
import YourInformation from './your-information.vue'
import PersonalPreferences from './personal-preferences.vue'
import Content from '../components/content.vue'
import Errors from './errors.vue'
import SqButton from 'common/sq-button.vue'
import Storage from 'common/storage'
import { getAppServer, getSpreeServer } from 'common/constants'
import Loading from 'vue-loading-overlay'
import { join, filter, reduce, concat } from 'ramda'
import StepHeader from '../components/step-header.vue'
import LightHeader from '../components/light-header.vue'
import { mockProductIfDevelopment } from 'common/utils'

const CALL_TO_MAKE_APPOINTMENT = "Please call to make an appointment."
export const GENERIC_SERVER_ERROR = `Your request could be not be completed. ${CALL_TO_MAKE_APPOINTMENT}`

export default {
  data: function() {
    return {
      errors: [],
      isPaymentSaved: false,
      isLoading: false,

      progress: 0,
      shared: Storage.sharedState,
    }
  },

  computed: {
    isDisabled: function() {
      return (
        !this.isLoading &&
        (!this.isPaymentSaved || !this.shared.canReceiveSmsReminders)
      )
    },
  },

  mounted() {
    this.$root.$on('payment-information:completed', () => {
      this.isPaymentSaved = true
    })
  },

  created() {
    mockProductIfDevelopment()
  },

  methods: {
    handleAvailableTimesError() {
      this.errors.push(`Could not find available times. ${CALL_TO_MAKE_APPOINTMENT}`)
    },

    handleStripeServerError() {
      this.errors.push(GENERIC_SERVER_ERROR)
    },

    async bookAppointment() {
      this.isLoading = true

      try {
        // the ordering of these is important
        if (this.progress < 1) {
          await this.createOrder()
          this.progress = 1
        }

        if (this.progress < 2) {
          await this.addStyleToCart()
          this.progress = 2
        }

        if (this.progress < 3) {
          await this.addAddOnsToCart()
          this.progress = 3
        }

        if (this.progress < 4) {
          await this.createOrUpdateUser()
          this.progress = 4
        }

        if (this.progress < 5) {
          await this.completeCheckout()
          this.progress = 0
        }

        this.$router.push({
          name: 'confirmation',
        })
      } catch (error) {
        console.error('ERROR:', error)
      }

      this.isLoading = false
    },

    createOrder() {
      return fetch(getSpreeServer() + '/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: this.shared.customerEmail,
        }),
      })
        .then(resp => resp.json())
        .then(json => {
          this.$session.set('orderNumber', json.data.attributes.number)
          this.shared.orderNumber = json.data.attributes.number
          this.shared.orderToken = json.data.attributes.token
        })
    },

    addStyleToCart() {
      const data = {
        variant_id: this.shared.variant.id,
        quantity: 1,
      }

      return fetch(getSpreeServer() + '/cart/add_item', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Spree-Order-Token': this.shared.orderToken,
        },
        body: JSON.stringify(data),
      })
    },

    addAddOnToCart(variantId) {
      return fetch(getSpreeServer() + '/cart/add_item', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Spree-Order-Token': this.shared.orderToken,
        },
        body: JSON.stringify({
          variant_id: variantId,
          quantity: 1,
        }),
      })
    },

    addAddOnsToCart() {
      const variantIds = filter(
        Boolean,
        reduce(concat, [])([
          [this.shared.selectedDrinkAddOnId],
          Object.keys(this.shared.selectedFreeAddOns),
          Object.keys(this.shared.selectedPremiumAddOns),
        ])
      )

      return reduce((promise, variantId) => {
        return promise.then(() => this.addAddOnToCart(variantId))
      }, Promise.resolve())(variantIds)
    },

    completeCheckout() {
      const data = {
        email: this.shared.customerEmail,
      }

      return fetch(getSpreeServer() + '/checkout/complete', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'X-Spree-Order-Token': this.shared.orderToken,
        },
        body: JSON.stringify(data),
      })
    },

    createOrUpdateUser() {
      const loggedIn = Storage.loggedIn()

      const updateData = {
        'spree/user_email': Storage.sharedState.customerEmail,
        'spree/user_token': Storage.sharedState.userToken,
      }

      const data = {
        ...(loggedIn && updateData),

        order: {
          number: Storage.sharedState.orderNumber,
        },
        stripe: {
          paymentMethod: Storage.sharedState.stripePaymentMethod,
        },
        appointment: {
          startTime: Storage.sharedState.selectedTime,
          duration: Storage.sharedState.duration,
          note: Storage.sharedState.note,
          prefScalpTenderness: Storage.sharedState.prefScalpTenderness,
          taxonName: Storage.sharedState.taxonName,
          styleName: Storage.sharedState.product.name,
          customizations: Storage.sharedState.customizations,
          drink: Storage.sharedState.drinkAddOn,
        },
        user: {
          email: Storage.sharedState.customerEmail,
          password: Storage.sharedState.customerPassword,
          password_confirmation: Storage.sharedState.customerPassword,
        },
        naza_user: {
          firstName: Storage.sharedState.customerFirstName,
          lastName: Storage.sharedState.customerLastName,
          phone: Storage.sharedState.customerPhone,
          zipCode: Storage.sharedState.customerZipCode,
          canReceiveEmailReminders:
            Storage.sharedState.canReceiveEmailReminders,
          canReceiveSmsReminders: Storage.sharedState.canReceiveSmsReminders,
        },
      }

      const path = loggedIn ? '/naza/users/me.json' : '/naza/users.json'
      const fetchMethod = loggedIn ? 'PATCH' : 'POST'

      return fetch(getAppServer() + path, {
        method: fetchMethod,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      .then(resp => {
        if (resp.status >= 200 && resp.status < 500) {
          return resp.json()
        }
        return Promise.reject({status: resp.status})
      })
      .then(json => {
        if (json.errors) {
          this.errors = this.errors.concat(json.errors)
          return Promise.reject({ status: 400 })
        }
        this.shared.spreeUserId = json.data.id
      })
      .catch(({status}) => {
        if (!status || status >= 500) {
          this.errors.push(GENERIC_SERVER_ERROR)
        }
        return Promise.reject()
      })
    },
  },

  components: {
    Content,
    SqButton,
    AppointmentSummary,
    YourInformation,
    Loading,
    Errors,
    PersonalPreferences,
    StepHeader,
    LightHeader,
  },
}
</script>

<style lang="less" scoped>
@import '../../common/utils.less';

.schedule-and-preferences {
  .cta {
    h2 {
      font-size: 18px;
      font-weight: bold;
      letter-spacing: 0.75px;
      text-align: center;
    }

    p {
      font-size: 16px;
      text-align: center;
      font-weight: 500;
    }
  }

  .sections {
    background-color: @lightGray;

    div.section-header {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      margin-bottom: 10px;

      h2 {
        font-size: 22px;
        font-weight: bold;
        text-align: center;
        margin: 0 0 10px 10px;
        text-transform: none;
      }
    }
  }

  .cancellation-policy {
    margin: 20px 0;

    h3 {
      .sans-serif();
      font-size: 16px;
      font-weight: bold;
      text-align: center;
      text-transform: none;
      margin: 0;
      line-height: 1.5;
      color: @orange;
    }

    p {
      font-size: 16px;
      line-height: 21px;
      text-align: center;
      margin: 0;
      line-height: 1.5;
      color: @orange;
    }
  }
}
</style>
