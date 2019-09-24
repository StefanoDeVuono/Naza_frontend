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
      <img :src="imageUrl" />

      <AppointmentSummaryContent />

      <div class="modify-notice">
        <hr />

        If something isn't right, you can go back and modify your reservation.

        <hr />
      </div>

      <div class="totals">
        <div class="total total-price">
          <strong>Total:</strong>
          <span>{{ formattedPrice(shared.price) }}</span>
        </div>

        <div class="total total-duration">
          <strong>Duration:</strong>
          <span>{{ formattedHours(shared.duration) }}</span>
        </div>
      </div>
    </div>

    <div class="star-divider">
      <StarDivider />
    </div>

    <AppointmentPicker />
  </Section>
</template>

<script>
import { path } from 'ramda'
import {
  formattedHours,
  formattedPrice,
  mockProductIfDevelopment,
} from 'common/utils'
import { getCurlAssetRoot } from 'common/constants'
import Storage from 'common/storage'
import Section from '../components/section.vue'
import CalendarCheckIcon from 'images/noun_Calendar_1074173.svg'
import AppointmentSummaryContent from './appointment-summary-content.vue'
import StarDivider from '../../images/group-5.svg'
import AppointmentPicker from './appointment-picker.vue'

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

  computed: {
    imageUrl() {
      return getCurlAssetRoot() + path(['images', 0, 'styles', 3, 'url'], this.shared.product)
    }
  },

  created() {
    mockProductIfDevelopment()
  },

  components: {
    Section,
    CalendarCheckIcon,
    AppointmentSummaryContent,
    StarDivider,
    AppointmentPicker,
  },
}
</script>

<style lang="less" scoped>
@import '../../common/utils.less';

.appointment-summary {
  img {
    width: 100%;
  }
  
  .modify-notice {
    color: @orange;
    font-size: 14px;
    font-weight: bold;
    line-height: 1.5;
    letter-spacing: 0.5px;
    text-align: center;
  }

  hr {
    margin: 20px 0;
    height: 1px;
    border-top: solid 1px @orange;
  }

  .totals {
    margin: 40px 0;
    font-family: 'TTCommons', sans-serif;
    font-size: 16px;

    .total {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      margin: 10px 0;
    }

    strong {
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

.star-divider {
  display: flex;
  align-items: center;
  justify-content: center;
}

</style>
