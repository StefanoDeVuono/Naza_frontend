<template>
  <div class="appointment-picker" v-if="slotsByDate[0]">
    <div class="superheader">
      <h2 v-if="slotsByDate[0] && isTomorrow(slotsByDate[0][0])">
        Tomorrow
      </h2>

      <h2 v-else-if="slotsByDate[0] && weekText(slotsByDate[0][0])">
        {{ weekText(slotsByDate[0][0]) }}
      </h2>

      <h2 v-else>&nbsp;</h2>
    </div>

    <div class="header">
      <div v-for="slotByDate in slotsByDate">
        <h2>{{ formatHeaderDay(slotByDate[0]) }}</h2>
        <p>{{ formatHeaderDate(slotByDate[0]) }}</p>
      </div>
    </div>

    <TimeSlots :slotsByDate="slotsByDate" :onTimeSelected="onTimeSelected" />

    <div class="actions">
      <div class="previous" v-show="days > 3">
        <ArrowLeftIcon />
        <span @click="getPrevSlots">Previous</span>
      </div>
      <div class="more">
        <span @click="getNextSlots">More times</span> <ArrowRightIcon />
      </div>
    </div>
  </div>
</template>

<script>
  import { getAppServer } from '../constants'
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
  } from 'date-fns'
  import { map, find, compose, equals, nth } from 'ramda'

  export default {
    props: {
      onTimeSelected: Function,
    },

    data: function() {
      return {
        days: 1,
        slotsByDate: [],
      }
    },

    computed: {},

    methods: {
      fetchSlots: function() {
        const duration = 180
        fetch(
          `${getAppServer()}/schedules/available_times?duration=${duration}&days=${
            this.days
          }`
        )
          .then(response => response.json())
          .then(json => {
            this.slotsByDate = json
          })
      },

      getPrevSlots: function() {
        this.days = this.days - 3
        this.fetchSlots()
      },

      getNextSlots: function() {
        this.days = this.days + 3
        this.fetchSlots()
      },

      isTomorrow: function(timeString) {
        const tomorrow = lightFormat(addDays(new Date(Date.now()), 1), 'yyyy-MM-dd')
        return timeString === tomorrow
      },

      formatHeaderDay: function(dateString) {
        const date = parseISO(dateString)
        return format(date, 'eeee')
      },

      formatHeaderDate: function(dateString) {
        const date = parseISO(dateString)
        return format(date, 'MMMM d')
      },

      weekText: function(timeString) {
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

    created: function() {
      this.fetchSlots()
    },

    components: {
      ArrowRightIcon,
      ArrowLeftIcon,
      TimeSlots,
    },
  }
</script>

<style lang="less">
  @midGray: #e6e1da;
  @lightGray: #f7f6f2;
  @darkBlue: #1c3042;

  .appointment-picker {
    display: grid;
    grid-template-rows: auto auto auto;

    .superheader {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      background-color: @midGray;
      border: 2px solid @midGray;
      border-bottom: none;

      h2 {
        text-transform: uppercase;
        font-weight: 500;
        font-size: 12px;
        letter-spacing: normal;
        margin: 15px 20px;
      }
    }

    .header {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      background-color: @lightGray;
      border: 2px solid @midGray;
      border-bottom: none;

      & > div {
        padding: 15px 10px;
      }

      h2 {
        text-transform: none;
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

      .material-design-icon.arrow-right-icon > .material-design-icon__svg {
        height: 15px;
        width: 15px;
      }

      .material-design-icon.arrow-left-icon > .material-design-icon__svg {
        height: 15px;
        width: 15px;
      }

      .previous {
        grid-column-start: 1;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        flex-grow: 1;
      }

      .more {
        grid-column-start: 2;
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        align-items: center;
        flex-grow: 1;
      }
    }
  }
</style>
