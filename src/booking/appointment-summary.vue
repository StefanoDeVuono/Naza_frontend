<template>
  <Section
    title="Appointment Summary"
    name="appointment-summary"
    :initialVisible="true"
  >
    <template v-slot:header-icon>
      <CalendarCheckIcon />
    </template>

    <div class="appointment-summary">
      <AppointmentSummaryContent />

      <div class="row">
        <p class="modify-notice">
          If something isn't right, you can go back and modify your reservation.
        </p>
      </div>

      <hr />

      <div class="totals">
        <div class="total total-price">
          <h2>Total:</h2>
          <span>{{ formattedPrice(shared.price) }}</span>
        </div>

        <div class="total total-duration">
          <h2>Duration:</h2>
          <span>{{ formattedHours(shared.duration) }}</span>
        </div>
      </div>
    </div>

    <div class="cancellation-policy">
      <h2>Cancellation Policy</h2>
      <p>
        A 24-hour cancellation notice is required to avoid being fully charged
        for the appointment.
      </p>
    </div>
  </Section>
</template>

<script>
import {
  formattedHours,
  formattedPrice,
  mockProductIfDevelopment,
} from 'common/utils'
import Storage from 'common/storage'
import Section from './section.vue'
import CalendarCheckIcon from 'images/noun_Calendar_1074173.svg'
import AppointmentSummaryContent from './appointment-summary-content.vue'

export default {
  data: function() {
    return {
      shared: Storage.sharedState,
    }
  },

  methods: {
    formattedHours,
    formattedPrice,
  },

  created() {
    mockProductIfDevelopment()
  },

  components: {
    Section,
    CalendarCheckIcon,
    AppointmentSummaryContent,
  },
}
</script>

<style lang="less">
@import '../common/utils.less';

.appointment-summary {
  // .ignore-parent-padding();
  border: 2px solid @darkBlue;
  padding: 15px;
  background-color: white;

  .modify-notice {
    font-size: 14px;
    font-weight: bold;
    line-height: 1.5;
    letter-spacing: 0.5px;
    text-align: center;
  }

  hr {
    margin: 20px 0;
    height: 1px;
    border-top: solid 1px @darkBlue;
  }

  .totals {
    font-size: 12px;
    font-weight: bold;

    .total {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      margin: 10px 0;
    }

    h2 {
      font-size: 12px;
      font-weight: bold;
      text-transform: uppercase;
      margin: 0;
      line-height: 1;
      flex-grow: 1;
    }

    span {
      line-height: 1;
    }
  }
}

.cancellation-policy {
  margin: 20px 0;

  h2 {
    font-size: 14px;
    font-weight: bold;
    text-align: center;
    text-transform: none;
    margin: 0;
    line-height: 1.5;
  }

  p {
    font-size: 14px;
    line-height: 21px;
    text-align: center;
    margin: 0;
    line-height: 1.5;
  }
}
</style>
