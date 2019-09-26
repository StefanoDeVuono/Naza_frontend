<template>
  <div class="confirmation">
    <div class="youre-all-set">
      <h3>Well, this is exciting...</h3>

      <div>
        <img
          src="https://projectcurl-assets.s3.amazonaws.com/Confirmation/Confirmation+header.png"
          srcset="
            https://projectcurl-assets.s3.amazonaws.com/Confirmation/Confirmation+header.png      1x,
            https://projectcurl-assets.s3.amazonaws.com/Confirmation/Confirmation+header%402x.png 2x
          "
          alt="You're all set!"
        />
      </div>

      <p>
        See below for your appointment confirmation!<br />
        You will receive a copy via email as well.
      </p>
    </div>

    <div class="appointment-info">
      <h1>
        Appointment<br />
        Information
      </h1>

      <div>
        <h3>Your Style</h3>
        <p>{{ shared.taxonName }} - {{ shared.product.name }}</p>
      </div>

      <div>
        <h3>Customizations &amp; Add-ons</h3>
        <CustomizationsAndAddOns />
      </div>

      <div>
        <h3>Appointment</h3>
        <p>{{ formattedTime }}</p>
      </div>

      <div>
        <h3>Our Location</h3>
        <p>985 Valencia St, San Francisco, CA</p>
      </div>

      <div>
        <h3>Totals</h3>
        <p>Time: {{ duration }} - Price: {{ price }}*</p>
        <p class="charge-disclaimer">
          *Your card will not be charged until after your appointment is
          completed. Tips are optional &amp; can be paid via credit card.
        </p>
        <p class="cancel-disclaimer">
          No-shows or cancellations within 24 hours of scheduled appointment
          will be charged the full price.
        </p>
      </div>
    </div>

    <div class="common-questions">
      <div class="border">
        <img
          alt=""
          src="assets/images/decor%201.png"
          srcset="
            assets/images/decor%201.png    1x,
            assets/images/decor%201@2x.png 2x
          "
        />
      </div>

      <div class="img-container">
        <img
          alt="Some Common Questions"
          src="https://projectcurl-assets.s3.amazonaws.com/Confirmation/some+common+questions+header.png"
          srcset="
            https://projectcurl-assets.s3.amazonaws.com/Confirmation/some+common+questions+header.png      1x,
            https://projectcurl-assets.s3.amazonaws.com/Confirmation/some+common+questions+header%402x.png 2x
          "
        />
      </div>

      <div class="questions">
        <div>
          <h3>Can I change my appointment?</h3>
          <p>
            Absolutely! To change or update your appointment information just
            give us a call or at (415) 123-4567 or shoot us an email (<a
              href="mailto:appointments@nazabeauty.com"
              >appointments@nazabeauty.com</a
            >).
          </p>
        </div>

        <hr />

        <div>
          <h3>When will my card be charged?</h3>
          <p>
            Your card will not be charged until after your appointment is
            completed. Tips are option &amp; can be paid via credit card.
          </p>
        </div>

        <hr />

        <div>
          <h3>Which stylists will I have?</h3>
        </div>

        <hr />

        <div>
          <h3>How do I prep for my appointment?</h3>
        </div>

        <hr />

        <div>
          <h3>Ahh! I still have more questions!</h3>
          <p>
            All good. We got you covered. Check out our
            <a href="/faq">FAQ</a> page for answers to all your burning
            questions.
          </p>
        </div>
      </div>

      <div class="border">
        <img
          alt=""
          src="assets/images/decor%202.png"
          srcset="
            assets/images/decor%202.png    1x,
            assets/images/decor%202@2x.png 2x
          "
        />
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
import Section from '../components/section.vue'
import { parseISO, format } from 'date-fns'
import SqButton from 'common/sq-button.vue'
import { formattedHours, formattedPrice } from 'common/utils'
import ChevronDownIcon from 'vue-material-design-icons/ChevronDown.vue'
import ChevronUpIcon from 'vue-material-design-icons/ChevronUp.vue'

export default {
  data() {
    return {
      shared: Storage.sharedState,
    }
  },

  methods: {
    visitOurBlock() {
      window.location = 'http://www.google.com'
    },
  },

  computed: {
    formattedTime() {
      const timeObj = parseISO(this.shared.selectedTime)
      return format(timeObj, 'LLLL d, h:mm aa')
    },

    duration() {
      return formattedHours(this.shared.duration, {
        singularLabel: 'Hour',
        pluralLabel: 'Hours',
      })
    },

    price() {
      return formattedPrice(this.shared.price)
    },
  },

  created() {
    mockProductIfDevelopment()
  },

  components: {
    CheckIcon,
    Section,
    SqButton,
    ChevronDownIcon,
    ChevronUpIcon,
  },
}
</script>

<style lang="less" scoped>
@import '../../common/utils.less';

.confirmation {
  padding-bottom: 30px;

  .border {
    margin: 0;
    padding: 0;
    line-height: 0;
  }

  .youre-all-set {
    .ignore-parent-padding();
    display: flex;
    flex-direction: column;
    background-color: @brown;
    padding: 50px 0 30px 0;
    text-align: center;

    h3 {
      .sans-serif();
      margin-top: 30px;
      margin-bottom: 30px;
      color: white;
      text-transform: uppercase;
      font-size: 16px;
      letter-spacing: 1.5px;
    }

    img {
      margin-bottom: 30px;
    }

    p {
      font-family: 'Moret', serif;
      font-size: 16px;
      font-weight: normal;
      letter-spacing: 1px;
      color: white;
      margin-bottom: 40px;
    }
  }

  .appointment-info {
    background-color: @lightGray;
    padding: 60px 10px 30px 10px;

    & > div {
      margin-bottom: 40px;
    }

    h1 {
      text-align: center;
      font-size: 40px;
      font-weight: bold;
      text-transform: uppercase;
    }

    h3 {
      .sans-serif-header();
      text-align: center;
      margin: 0 0 10px 0;
    }

    p {
      font-weight: 300;
      font-size: 20px;
      text-align: center;
      margin: 0;
    }

    .charge-disclaimer,
    .cancel-disclaimer {
      font-size: 14px;
      line-height: normal;
      margin: 0.5em 0;
    }

    .cancel-disclaimer {
      font-weight: 500;
    }

    hr {
      border: none;
      border-bottom: 1px solid @darkBlue;
    }
  }

  .common-questions {
    .ignore-parent-padding();
    background-color: @darkBlue;
    color: white;

    .img-container {
      padding-top: 1px;

      img {
        margin: 60px auto;
        display: block;
      }
    }

    .questions {
      padding: 0 20px;

      h3 {
        color: white;
        font-size: 16px;
        letter-spacing: 1.31px;
        text-transform: uppercase;
        margin-bottom: 10px;
      }

      p {
        line-height: normal;
      }

      hr {
        margin: 20px 0;
      }
    }
  }
}
</style>
