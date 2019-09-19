<template>
  <div class="schedule-and-preferences">
    <Loading :active.sync="isLoading" :is-full-page="true" />

    <Header title="Schedule &amp; Preferences" :showBackArrow="true" />

    <RunningTotals />

    <Content :progress-step="5">
      <div class="cta">
        <h2>Let&rsquo;s Pick a Time &amp; Date</h2>
        <p>
          For oft, when on my couch I lie In vacant or in pensive mood They
          flash upon that inward eye Which is the bliss of solitude
        </p>
      </div>

      <div class="sections">
        <AppointmentSummary />

        <AppointmentPicker />

        <YourInformation />

        <PaymentInfo />

        <Errors />

        <PersonalPreferences />

        <SqButton
          label="Book Appointment"
          :onClick="bookAppointment"
          :disabled="isDisabled"
        />
      </div>
    </Content>
  </div>
</template>

<script>
import AppointmentPicker from './appointment-picker.vue'
import AppointmentSummary from '../components/appointment-summary.vue'
import YourInformation from './your-information.vue'
import PersonalPreferences from './personal-preferences.vue'
import Header from '../components/header.vue'
import RunningTotals from '../components/running-totals.vue'
import Content from '../components/content.vue'
import Errors from './errors.vue'
import SqButton from 'common/sq-button.vue'
import Storage from 'common/storage'
import PaymentInfo from './payment-info.vue'
import { getAppServer, getSpreeServer } from 'common/constants'
import CalendarBlankOutlineIcon from 'vue-material-design-icons/CalendarBlankOutline.vue'
import Loading from 'vue-loading-overlay'
import { join, filter, reduce, concat } from 'ramda'

export default {
  data: function() {
    return {
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

  methods: {
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
        this.isLoading = false
      }
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
        .then(resp => resp.json())
        .then(json => {
          this.isLoading = false
          if (json.errors) {
            throw join(', ', json.errors)
          }
          this.shared.spreeUserId = json.data.id
        })
    },
  },

  components: {
    AppointmentPicker,
    Header,
    RunningTotals,
    Content,
    CalendarBlankOutlineIcon,
    SqButton,
    AppointmentSummary,
    PaymentInfo,
    YourInformation,
    Loading,
    Errors,
    PersonalPreferences,
  },
}
</script>

<style lang="less">
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
    .ignore-parent-padding();
    .ignore-parent-padding--add-padding(2);
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
}
</style>
