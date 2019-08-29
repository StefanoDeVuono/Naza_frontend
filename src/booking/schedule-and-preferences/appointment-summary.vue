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
      <div class="row">
        <h2 class="style-header">Style</h2>
        <h2 class="style-name">{{ shared.taxonName }}</h2>
      </div>

      <div class="row">
        <h2 class="style-header">Pattern</h2>
        <h2 class="pattern-name">{{ patternName }}</h2>
      </div>

      <div class="row">
        <p class="description" v-if="showMoreLink">
          {{ truncatedDescription }}
          <span class="more-action" @click="expandDescription">more</span>
        </p>
        <p class="description" v-else>{{ description }}</p>
      </div>

      <div class="row">
        <ul class="customizations">
          <li v-for="(value, customization) in shared.customizations">
            <strong>{{ customization }}:</strong> {{ value }}
          </li>
        </ul>
      </div>

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
import { slice } from 'ramda'
import {
  formattedHours,
  formattedPrice,
  mockProductIfDevelopment,
} from 'common/utils'
import Storage from 'common/storage'
import Section from './section.vue'
import CalendarCheckIcon from 'images/noun_Calendar_1074173.svg'

export default {
  data: function() {
    return {
      showMoreLink: true,
      shared: Storage.sharedState,
    }
  },

  computed: {
    patternName: function() {
      return this.shared.product.name
    },

    truncatedDescription: function() {
      return slice(0, 35, this.description) + '...'
    },

    description: function() {
      return this.shared.product.description
    },
  },

  methods: {
    expandDescription: function() {
      this.showMoreLink = false
    },
    formattedHours,
    formattedPrice,
  },

  created() {
    mockProductIfDevelopment()
  },

  components: {
    Section,
    CalendarCheckIcon,
  },
}
</script>

<style lang="less">
@import '../../common/utils.less';

.appointment-summary {
  // .ignore-parent-padding();
  border: 2px solid @darkBlue;
  padding: 15px;
  background-color: white;

  .row {
    margin: 5px 0;
  }

  .style-header {
    font-size: 12px;
    font-weight: bold;
    color: @darkBlue;
    text-align: center;
  }

  .style-name {
    color: @orange;
    text-align: center;
    font-size: 16px;
    font-weight: bold;
    font-family: utopia-std;
  }

  .pattern-name {
    color: @orange;
    font-size: 28px;
    font-weight: bold;
    text-align: center;
    font-family: utopia-std;
    text-transform: none;
  }

  .description {
    margin-top: 20px;
    font-size: 14px;
    line-height: 21px;
    text-align: center;
  }

  .more-action {
    color: rgba(28, 48, 66, 0.5);
  }

  .customizations {
    strong {
      color: @orange;
    }

    li {
      list-style: none;
      font-size: 14px;
      line-height: 21px;
    }

    li::before {
      content: '\2022';
      color: @orange;
      font-weight: bold;
      display: inline-block;
      width: 1em;
      margin-left: -1em;
    }
  }

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
