<template>
  <div class="schedule-and-preferences">
    <Loading :active.sync="isLoading" :is-full-page="true" />

    <Header title="Schedule &amp; Preferences" :showBackArrow="true" />

    <RunningTotals />

    <Content :progress-step="5">
      <div class="cta">
        <h2>Let's Pick a Time &amp; Date</h2>
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

        <NextStepButton
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
import Header from '../header.vue'
import RunningTotals from '../running-totals.vue'
import Content from '../content.vue'
import CalendarBlankOutlineIcon from 'vue-material-design-icons/CalendarBlankOutline.vue'
import NextStepButton from 'common/next-step-button.vue'
import AppointmentSummary from './appointment-summary.vue'
import Storage from 'common/storage'
import PaymentInfo from './payment-info.vue'
import YourInformation from './your-information.vue'
import { getAppServer, getSpreeServer } from 'common/constants'
import Loading from 'vue-loading-overlay'
import Errors from './errors.vue'
import { join } from 'ramda'

export default {
  data: function() {
    return {
      isPaymentSaved: false,
      isLoading: false,

      shared: Storage.sharedState,
    }
  },

  computed: {
    isDisabled: function() {
      return !this.isPaymentSaved
    },
  },

  mounted() {
    this.$root.$on('payment-information:completed', () => {
      this.isPaymentSaved = true
    })
  },

  methods: {
    createUser() {
      const data = {
        order: {
          number: Storage.sharedState.orderNumber,
        },
        stripe: {
          paymentMethod: Storage.sharedState.stripePaymentMethod,
        },
        appointment: {
          startTime: Storage.sharedState.selectedTime,
          duration: Storage.sharedState.duration,
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

      fetch(getAppServer() + '/naza/users.json', {
        method: 'POST',
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
        .then(() => {
          return this.cartCheckout()
        })
        .then(json => {
          this.$router.push({
            name: 'confirmation',
          })
        })
        .catch(errors => {
          this.$root.$emit('error', errors)
        })
    },

    cartCheckout() {
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
        .then(() => {
          return fetch(getSpreeServer() + '/checkout/complete', {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
              'X-Spree-Order-Token': this.shared.orderToken,
            },
          })
        })
        .then(result => result.json())
    },

    bookAppointment() {
      this.isLoading = true

      this.createUser()
    },
  },

  components: {
    AppointmentPicker,
    Header,
    RunningTotals,
    Content,
    CalendarBlankOutlineIcon,
    NextStepButton,
    AppointmentSummary,
    PaymentInfo,
    YourInformation,
    Loading,
    Errors,
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
