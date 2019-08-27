<template>
  <div class="appointment-summary">
    <div class="header">
      <CalendarCheckOutlineIcon />
      <h2>Appointment Summary</h2>
      <ChevronUpIcon />
    </div>

    <div class="body">
      <div class="section">
        <h2 class="style-header">Style</h2>
        <h2 class="style-name">{{ styleName }}</h2>
      </div>

      <div class="section">
        <h2 class="style-header">Pattern</h2>
        <h2 class="pattern-name">{{ patternName }}</h2>
      </div>

      <div class="section">
        <p class="description" v-if="showMoreLink">{{ truncatedDescription }} <span class="more-action" @click="expandDescription">more</span></p>
        <p class="description" v-else>{{ description }}</p>
      </div>

      <div class="section">
        <ul class="customizations">
          <li v-for="(value, customization) in customizations">
            <strong>{{ customization }}:</strong> {{value}}
          </li>
        </ul>
      </div>

      <div class="section">
        <p class="modify-notice">If something isn't right, you can go back and modify your reservation.</p>
      </div>

      <hr />

      <div class="totals">
        <div class="total total-price">
          <h2>Total:</h2> <span>{{ formattedPrice(price) }}</span>
        </div>

        <div class="total total-duration">
          <h2>Duration:</h2> <span>{{ formattedHours(duration) }}</span>
        </div>
      </div>
    </div>

    <div class="cancellation-policy">
      <h2>Cancellation Policy</h2>
      <p>A 24-hour cancellation notice is required to avoid being fully charged for the appointment.</p>
    </div>
  </div>
</template>

<script>
  import CalendarCheckOutlineIcon from 'vue-material-design-icons/CalendarCheckOutline.vue'
  import ChevronDownIcon from 'vue-material-design-icons/ChevronDown.vue'
  import ChevronUpIcon from 'vue-material-design-icons/ChevronUp.vue'
  import { slice } from 'ramda'
  import { formattedHours, formattedPrice } from 'common/utils'

  export default {
    props: {
      product: Object,
      price: Number,
      duration: Number
    },

    data: function() {
      return {
        showMoreLink: true
      }
    },

    computed: {
      styleName: function() {
        return "Crochet Braids"
      },

      patternName: function() {
        return "Twists"
      },

      truncatedDescription: function() {
        return slice(0, 35, this.description) + '...'
      },

      description: function() {
        return "What though the radiance which was once so bright Be now for ever taken from my sight, Though nothing can bring back the hour Of splendour in the grass, of glory in the flower"
      },

      customizations: function() {
        return {
          "Size": "Medium",
          "Length": "Medium",
          "Volume": "Biggest",
          "Color": "Brown with Blonde Highlights",
          // "Free Add-ons": "Organic Add-On",
          // "Premium Add-ons": "Wash &amp; Deep Condition",
          // "Drink": "Mocktail"
        }
      },
    },

    methods: {
      expandDescription: function() {
        this.showMoreLink = false
      },
      formattedHours,
      formattedPrice,
    },
    
    components: {
      CalendarCheckOutlineIcon,
      ChevronDownIcon,
      ChevronUpIcon
    }
  }
</script>

<style lang="less">
  @import '../common/utils.less';
  
  .appointment-summary {
    margin-bottom: 40px;

    .header {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      margin-bottom: 40px;

      .material-design-icon.calendar-check-outline-icon > .material-design-icon__svg {
        height: 25px;
        width: 25px;
        fill: @orange;
      }

      h2 {
        margin: 0 10px 8px 10px;
        font-size: 22px;
        font-weight: bold;
        text-align: center;
        text-transform: none;
      }
    }

    .body {
      border: 2px solid @darkBlue;
      padding: 15px;

      .section {
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
        color: rgba(28, 48, 66, 0.5)
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
          content: "\2022";
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
  }
</style>
