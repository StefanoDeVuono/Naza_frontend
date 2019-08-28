<template>
  <div class="schedule-and-preferences">
    <Header title="Schedule &amp; Preferences" :showBackArrow="true" />

    <RunningTotals />

    <Content :progress-step="5">
      <div class="cta">
        <h2>Let's Pick a Time &amp; Date</h2>
        <p>
          For oft, when on my couch I lie \ In vacant or in pensive mood \ They
          flash upon that inward eye \ Which is the bliss of solitude
        </p>
      </div>

      <div class="sections">
        <AppointmentSummary />
        
        <div class="section">
          <div class="section-header">
            <CalendarBlankOutlineIcon />
            <h2>Date &amp; Time</h2>
          </div>
          <AppointmentPicker :onTimeSelected="handleTimeSelected" />
        </div>

        <NextStepButton
          label="Book Appointment"
          :onClick="bookAppointment"
          :disabled="isDisabled"
        />
      </div>
    </Content>
  </div>
</template>

<script>
import AppointmentPicker from './appointment-picker.vue'
import Header from './header.vue'
import RunningTotals from './running-totals.vue'
import Content from './content.vue'
import CalendarBlankOutlineIcon from 'vue-material-design-icons/CalendarBlankOutline.vue'
import NextStepButton from 'common/next-step-button.vue'
import AppointmentSummary from './appointment-summary.vue'
import Storage from 'common/storage'

export default {
  data: function() {
    return {
      shared: Storage.sharedState
    }
  },

  props: {
  },

  computed: {
    isDisabled: function() {
      return this.shared.selectedTime === undefined
    },
  },

  methods: {
    handleTimeSelected: function(time) {
      Storage.setSelectedTime(time)
    },

    bookAppointment: function() {
      window.alert('This would be the confirmation screen')
    },
  },

  components: {
    AppointmentPicker,
    Header,
    RunningTotals,
    Content,
    CalendarBlankOutlineIcon,
    NextStepButton,
    AppointmentSummary,
  },
}
</script>

<style lang="less">
@import '../common/utils.less';

.schedule-and-preferences {
  .cta {
    h2 {
      font-size: 18px;
      font-weight: bold;
      letter-spacing: 0.75px;
      text-align: center;
    }

    p {
      font-size: 16px;
      text-align: center;
      font-weight: 500;
    }
  }

  .sections {
    .ignore-parent-padding();
    .ignore-parent-padding--add-padding(2);
    background-color: @lightGray;

    div.section-header {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      margin-bottom: 10px;

      h2 {
        font-size: 22px;
        font-weight: bold;
        text-align: center;
        margin: 0 0 10px 10px;
        text-transform: none;
      }

      .material-design-icon.calendar-blank-outline-icon
        > .material-design-icon__svg {
        height: 25px;
        width: 25px;
        fill: @orange;
      }
    }
  }
}
</style>
