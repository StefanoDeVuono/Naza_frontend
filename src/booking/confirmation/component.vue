<template>
  <div class="confirmation">
    <div class="confirmation-header">
      <div class="text">
        <h1>You&rsquo;re all set</h1>
        <p>We can&rsquo;t wait to get you styled!</p>
      </div>

      <img src="assets/copy01.jpeg" class="image" />
    </div>

    <div class="check-container">
      <CheckIcon :size="28" fillColor="white" />
    </div>

    <div class="summary">
      <h2>Your Appointment Information:</h2>

      <div class="section">
        <h2>Appointment Summary</h2>

        <p class="style-name">{{ shared.taxonName }} - {{ shared.product.name }}</p>

        <Section title="Customizations & Add-Ons" name="customizations-and-add-ons">
          <CustomizationsAndAddOns />
        </Section>
      </div>

      <div class="section">
        <h2>Time</h2>
        <p>{{ formattedTime }}</p>
      </div>

      <div class="section">
        <h2>Our Location</h2>
        <p>985 Valencia St, San Francisco, CA</p>
      </div>
    </div>
  </div>
</template>

<script>
import 'whatwg-fetch'
import { getSpreeServer } from 'common/constants'
import { mockProductIfDevelopment } from 'common/utils'
import Storage from 'common/storage'
import CheckIcon from 'vue-material-design-icons/Check.vue'
import CustomizationsAndAddOns from '../components/customizations-and-add-ons.vue'
import Section from '../section.vue'
import { parseISO, format } from 'date-fns'

export default {
  data() {
    return {
      shared: Storage.sharedState,
    }
  },

  methods: {},

  computed: {
    formattedTime() {
      const timeObj = parseISO(this.shared.selectedTime)
      return format(timeObj, 'LLLL d, h:mm aa')
    }
  },

  created() {
    mockProductIfDevelopment()
  },

  components: {
    CheckIcon,
    CustomizationsAndAddOns,
    Section
  }
}
</script>

<style lang="less">
@import '../../common/utils.less';

.confirmation {
  .confirmation-header {
    .ignore-parent-padding();
    background-color: rgba(28, 48, 66, 0.5);
    color: white;
    line-height: 0;

    .text {
      padding: 50px 0 30px 0;
      text-align: center;

      h1 {
        margin-bottom: 20px;
        color: white;
        letter-spacing: 1.5px;
      }

      p {
        font-size: 18px;
        margin: 0;
      }
    }

    image {
    }
  }

  .check-container {
    position: relative;
    z-index: 10;
    margin: calc(38px / -2) auto 20px auto;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: @orange;
    border-radius: 50%;
    width: 38px;
    height: 38px;
    border: 4px solid white;

    .material-design-icon {
      height: 28px;
      width: 28px;
    }
  }

  .summary {
    h2 {
      margin: 0 auto 10px auto;
      color: @orange;
      text-transform: uppercase;
      font-size: 18px;
      text-align: center;
    }

    p {
      text-align: center;
      margin: 0;
    }

    .section {
      margin: 40px 0;

      h2 {
        color: @darkBlue;
        font-size: 22px;
        text-transform: none;
      }

      .section {
        margin: 0;

        header {
          margin: 0;
        }

        .body {
          padding: 0;
        }

        .customizations {
          margin: 0;
        }

        h2 {
          font-size: 14px;
          margin: 0;
          font-weight: normal;
        }
      }
    }
  }
}

</style>
