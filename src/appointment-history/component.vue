<template>
  <div class="container">
    <DecorBorder />

    <div class="content">
      <div class="head">
        <h1>
          <span class="mini">Your</span> Order<br />
          History
        </h1>
      </div>

      <div class="appointment" v-for="appointment in appointments">
        <div class="name-and-time">
          <h3>{{ appointment.style_name }}</h3>
          <p>{{ formatTime(appointment.start_time) }}</p>
        </div>

        <div class="info-and-button">
          <ul>
            <li>Total: {{ formattedPrice(appointment.price) }}</li>
            <li>
              Duration:
              {{
                formattedHours(appointment.duration, {
                  singularLabel: 'Hour',
                  pluralLabel: 'Hours',
                })
              }}
            </li>
          </ul>
        </div>
      </div>

      <div class="foot">
        <h2>Feel like changing up?</h2>

        <SqButton @click="launchBooking" label="Book a New Style" />
      </div>
    </div>

    <DecorBorder :flip="true" />

    <Footer />
  </div>
</template>

<script>
import 'whatwg-fetch'
import { getAppServer } from 'common/constants'
import Storage from 'common/storage'
import { parse } from 'jsonapi-parse'
import SqButton from 'common/sq-button.vue'
import DecorBorder from 'common/decor-border.vue'
import Footer from 'common/footer.vue'
import { parseISO, format } from 'date-fns'
import { formattedPrice, formattedHours } from 'common/utils'

export default {
  data() {
    return {
      shared: Storage.sharedState,
      appointments: [],
    }
  },

  methods: {
    formattedPrice,
    formattedHours,
    formatTime(time) {
      const timeObj = parseISO(time)
      return format(timeObj, 'PP')
    },

    launchBooking() {
      this.$router.push({ name: 'categories' })
    },
  },

  watch: {
    // we have to wait until userToken gets set
    // in the main mounted function
    'shared.userToken': function(val, oldVal) {
      if (!val) {
        return
      }

      const data = {
        'spree/user_email': this.shared.customerEmail,
        'spree/user_token': this.shared.userToken,
      }

      fetch(
        getAppServer() +
          '/naza/appointments.json?spree%2Fuser_email=' +
          this.shared.customerEmail +
          '&spree%2Fuser_token=' +
          this.shared.userToken
      )
        .then(response => response.json())
        .then(json => {
          this.appointments = parse(json).data
        })
    },
  },

  components: {
    SqButton,
    DecorBorder,
    Footer,
  },
}
</script>

<style lang="less" scoped>
@import '../common/utils.less';

.container {
  height: 100%;
}

.content {
  width: 100%;
  max-width: 640px;
  margin: 0 auto;

  .head {
    padding: 50px 0;

    h1 {
      position: relative;
      font-size: 28px;
      font-weight: 600;
      text-align: center;
      text-transform: uppercase;
      vertical-align: top;
    }

    .mini {
      vertical-align: text-top;
      font-family: 'Moret';
      font-size: 16px;
      font-weight: 600;
      text-decoration: underline;
    }
  }

  .appointment {
    border-bottom: 2px solid @darkBlue;
    margin-bottom: 20px;
  }

  h2 {
    font-family: 'TTCommons', sans-serif;
    font-weight: 600;
    text-transform: uppercase;
    font-size: 16px;
    color: @darkBlue;
    text-align: center;
  }

  ul {
    padding: 0;
  }

  li {
    list-style-type: none;
  }

  .foot {
    margin-top: 40px;
  }
}

.name-and-time {
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  h3,
  p {
    margin: 0;
  }

  h3 {
    font-family: 'TTCommons', sans-serif;
    font-weight: 600;
    text-transform: uppercase;
    font-size: 14px;
    color: @darkBlue;
    line-height: normal;
  }

  p {
    font-family: 'TTCommons', sans-serif;
    font-weight: 500;
    font-size: 14px;
    color: @darkBlue;
    line-height: normal;
  }
}
</style>
