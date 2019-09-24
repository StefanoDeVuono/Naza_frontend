<template>
  <div class="time-slots">
    <div class="day" v-for="slotByDate in slotsByDate">
      <div
        v-for="slot in slotByDate[1]"
        class="time-slot"
        v-bind:class="[
          getActiveClass(slotByDate[0], slot.position),
          getPositionClass(slot.position),
        ]"
        @click="setActive(slotByDate[0], slot.position, slot.time)"
      >
        {{ formatTime(slot) }}
      </div>
    </div>
  </div>
</template>

<script>
import { lightFormat, parseISO } from 'date-fns'
import { find } from 'ramda'
import Storage from 'common/storage'

export default {
  props: {
    slotsByDate: Array,
  },

  data: function() {
    return {
      activeDate: undefined,
      activePosition: undefined,
    }
  },

  methods: {
    setActive: function(date, position, time) {
      this.activeDate = date
      this.activePosition = position
      Storage.setSelectedTime(time)
      this.$root.$emit('appointment-picker:selected')
    },

    getActiveClass: function(date, position) {
      if (date == this.activeDate && position == this.activePosition) {
        return 'active'
      }

      return ''
    },

    getPositionClass: function(position) {
      return 'position-' + position
    },

    formatTime: function(slot) {
      if (!slot) {
        return null
      }

      const time = parseISO(slot.time)
      return lightFormat(time, 'h:mm aaaa')
    },
  },
}
</script>

<style lang="less">
@midGray: #e6e1da;
@brown: #bc5940;

.time-slots {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  background-color: white;
  border: 2px solid @midGray;
  padding: 0;

  .day {
    display: grid;
    grid-template-rows: 1fr 1fr 1fr 1fr;

    .time-slot {
      text-align: center;
      padding: 5px;
      margin: 10px 10px;
      border: 2px solid transparent;
      font-family: 'TTCommons', sans-serif;

      &.active {
        border: 2px solid @brown;
        border-radius: 25px;
        background-color: rgba(188, 89, 64, 0.4);
      }

      &.position-1 {
        grid-row-start: 1;
      }

      &.position-2 {
        grid-row-start: 2;
      }

      &.position-3 {
        grid-row-start: 3;
      }

      &.position-4 {
        grid-row-start: 4;
      }
    }
  }
}
</style>
