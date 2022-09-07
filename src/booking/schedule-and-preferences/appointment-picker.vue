<template>
  <div class="appointment-picker">
    <h2 class="section-header">Date &amp; Time</h2>
    <div class="superheader">
      <h2 v-if="slotsByDate[0] && isTomorrow(slotsByDate[0][0])">Tomorrow</h2>

      <h2 v-else-if="slotsByDate[0] && weekText(slotsByDate[0][0])">
        {{ weekText(slotsByDate[0][0]) }}
      </h2>

      <h2 v-else>&nbsp;</h2>
    </div>

    <div class="main-header">
      <div v-for="slotByDate in slotsByDate">
        <h2>{{ formatHeaderDay(slotByDate[0]) }}</h2>
        <p>{{ formatHeaderDate(slotByDate[0]) }}</p>
      </div>
    </div>

    <TimeSlots :slotsByDate="slotsByDate" />

    <div class="key">
      <span class="key-text unavailable">Unavailable</span>
      <span class="key-text selected">Selected</span>
    </div>
    <div class="actions">
      <div class="previous" v-show="days > 3">
        &larr;
        <span @click="getPrevSlots">Previous</span>
      </div>
      <div class="more">
        <span @click="getNextSlots">More times</span> &rarr;
      </div>
    </div>
  </div>
</template>

<script>
import { getAppServer, getBoulevardEnabled, getBoulevardSchedules } from 'common/constants'
import TimeSlots from './time-slots.vue'
import ArrowRightIcon from 'vue-material-design-icons/ArrowRight.vue'
import ArrowLeftIcon from 'vue-material-design-icons/ArrowLeft.vue'
import {
  lightFormat,
  format,
  parseISO,
  addDays,
  differenceInWeeks,
  getHours,
  getDay,
  isSameDay
} from 'date-fns'
import Section from '../components/section.vue'
import { map, find, compose, equals, nth } from 'ramda'
import CalendarIcon from 'images/noun_Calendar_2804231.svg'
import VueScrollTo from 'vue-scrollto'
import Storage from 'common/storage'



export default {
  data: function () {
    return {
      days: 1,
      slotsByDate: [],
      shared: Storage.sharedState,
    }
  },
  computed: {},

  methods: {
    fetchSlots: function () {
      const dayOffset = this.days
      if (getBoulevardSchedules()) { // if Boulevard schedules are enabled
        const { boulevardCartId, boulevardClientId } = Storage.sharedState
        fetch(
          `${getAppServer()}/cart/available_times?cart_id=${boulevardCartId}&client_id=${boulevardClientId}&day_offset=${dayOffset}`
        )
          .then(response => response.json())
          .then(json => {
            if (json.errors) {
              this.$emit('available-times-error', json.errors)
            } else {
              const today = new Date()
              this.slotsByDate = Array.from([dayOffset, dayOffset + 1, dayOffset + 2], offset => {
                const date = addDays(today, offset)
                const includedDates = json.times.filter(el => isSameDay(parseISO(el.startTime), date))
                if (!includedDates) return []

                const key = lightFormat(date, 'yyyy-MM-dd')
                const value = includedDates.map(({ startTime: time, id: timeId }) => {
                  const date = new Date(time)
                  const hour = getHours(date)
                  const position = { 9: 1, 14: 2 }[hour]
                  const day = getDay(date)

                  return {
                    time,
                    hour,
                    position,
                    slotsAvailable: 1,
                    timeId,
                    day
                  }

                })
                return [key, value]
              })
            }
          })
      } else { // if Boulevard not enabled
        const { duration } = Storage.sharedState
        fetch(
          `${getAppServer()}/schedules/available_times?duration=${duration}&days=${dayOffset}`
        )
          .then(response => response.json())
          .then(json => {
            if (json.errors) {
              this.$emit('available-times-error', json.errors)
            } else {
              this.slotsByDate = json
            }
          })
      }
    },

    getPrevSlots: function () {
      this.days = this.days - 3
      this.fetchSlots()
    },

    getNextSlots: function () {
      this.days = this.days + 3
      this.fetchSlots()
    },

    isTomorrow: function (timeString) {
      const tomorrow = lightFormat(
        addDays(new Date(Date.now()), 1),
        'yyyy-MM-dd'
      )
      return timeString === tomorrow
    },

    formatHeaderDay: function (dateString) {
      const date = parseISO(dateString)
      return format(date, 'eeee')
    },

    formatHeaderDate: function (dateString) {
      const date = parseISO(dateString)
      return format(date, 'MMMM d')
    },

    weekText: function (timeString) {
      const visibleDate = parseISO(timeString)
      const delta = differenceInWeeks(visibleDate, new Date(Date.now()))

      if (delta === 0) {
        return null
      } else if (delta === 1) {
        return 'Next week'
      } else {
        return `${delta} weeks`
      }
    },
  },

  created: async function () {
    this.$root.$on('appointment-picker:selected', () => {
      this.$root.$emit('appointment-summary:hide')
      this.$root.$emit('your-information:show')
      this.$nextTick(() => {
        VueScrollTo.scrollTo('#your-information-section')
      })
    })

    const { product, taxonName, customizations, location } = Storage.sharedState
    if (getBoulevardEnabled()) {
      await fetch(getAppServer() + `/cart/create`
        , {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            taxon_name: taxonName,
            customizations: customizations,
            style_name: product.name,
            location: location
          }),
        })
        .then(response => {
          if (response.status === 200) {
            return response.json()
          }
          return Promise.reject()
        })
        .then(data => {
          Storage.setBoulevardCartId(data.cart_id)
        })
    }

    this.fetchSlots()
  },

  components: {
    Section,
    ArrowRightIcon,
    ArrowLeftIcon,
    TimeSlots,
    CalendarIcon,
  },
}
</script>

<style lang="less" scoped>
@import '../../common/utils.less';

.appointment-picker {
  margin-top: 40px;
  display: grid;
  grid-template-rows: auto auto auto;

  .section-header {
    font-family: 'TTCommons', sans-serif;
    font-size: 16px;
    font-weight: bold;
    text-align: center;
    text-transform: uppercase;
  }

  .superheader {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    background-color: @midGray;
    border: 2px solid @midGray;
    border-bottom: none;

    h2 {
      text-transform: uppercase;
      font-family: 'TTCommons', sans-serif;
      font-weight: 500;
      font-size: 12px;
      letter-spacing: normal;
      margin: 15px 20px;
    }
  }

  .main-header {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    background-color: @lightGray;
    border: 2px solid @midGray;
    border-bottom: none;

    &>div {
      padding: 15px 10px;
    }

    h2 {
      text-transform: none;
      font-family: 'TTCommons', sans-serif;
      font-size: 16px;
      font-weight: bold;
      color: @darkBlue;
      margin: 0;
      text-align: center;
    }

    p {
      font-size: 12px;
      color: @darkBlue;
      font-weight: normal;
      opacity: 0.7;
      margin: 0;
      text-align: center;
    }
  }

  .key {
    display: flex;

    .key-text {
      color: #4a4a4a;
      font-family: TTCommons;
      font-size: 12px;
      font-weight: 500;
      margin-right: 15px;

      &:before {
        content: '';
        display: inline-block;
        position: relative;
        top: 1px;
        width: 12px;
        height: 12px;
        margin-right: 4px;
        box-sizing: border-box;
        border-radius: 20px;
      }

      &.unavailable:before {
        border: solid 1.5px #e6e1da;
        background-color: #f8f7f5;
      }

      &.selected:before {
        border: solid 1.5px #bc5940;
        background-color: #e4bdb3;
      }
    }
  }

  .actions {
    margin-top: 20px;
    display: grid;
    grid-template-columns: 1fr 1fr;

    .material-design-icon.arrow-right-icon {
      margin-top: 3px;
      margin-left: 5px;
    }

    .material-design-icon.arrow-left-icon {
      margin-top: 3px;
      margin-right: 5px;
    }

    .material-design-icon.arrow-right-icon>.material-design-icon__svg {
      height: 15px;
      width: 15px;
    }

    .material-design-icon.arrow-left-icon>.material-design-icon__svg {
      height: 15px;
      width: 15px;
    }

    .previous,
    .more {
      cursor: pointer;
      display: flex;
      flex-direction: row;
      align-items: center;
      text-transform: uppercase;
      font-weight: bold;
      flex-grow: 1;
      color: @darkBlue;
    }

    .previous {
      grid-column-start: 1;
      justify-content: flex-start;

      span {
        margin-left: 0.25em;
      }
    }

    .more {
      grid-column-start: 2;
      justify-content: flex-end;

      span {
        margin-right: 0.25em;
      }
    }
  }
}
</style>
