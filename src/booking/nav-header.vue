<template>
  <div class="booking-nav-header">
    <div class="back-arrow">
      <KeyboardBackspaceIcon @click="goBack" v-if="showBackArrow" />
    </div>

    <div class="stats">
      <div id="total-cost">
        <span>Total</span>:
        <span id="total-cost-value">{{ formattedCost }}</span>
      </div>
      <div id="total-duration">
        <span>Duration</span>:
        <span id="total-duration-value">{{ formattedHours }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import 'vue-material-design-icons/styles.css'
import KeyboardBackspaceIcon from 'vue-material-design-icons/KeyboardBackspace.vue'

export default {
  props: {
    totalCost: Number,
    totalDuration: Number,
    showBackArrow: Boolean
  },

  computed: {
    formattedCost: function() {
      if (global.Intl) {
        const formatter = new global.Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
        })

        return formatter.format(this.totalCost)
      } else {
        return `$${this.totalCost}`
      }
    },

    formattedHours: function() {
      if (this.totalDuration <= 60) {
        return '1 HR'
      } else {
        const hours = Math.round(this.totalDuration / 60)
        return `${hours} HRS`
      }
    },
  },

  methods: {
    goBack: function() {
      this.$router.go(-1)
    }
  },

  components: {
    KeyboardBackspaceIcon,
  },
}
</script>

<style lang="less">
@import '../../styles/util.less';

.material-design-icon.keyboard-backspace-icon,
.material-design-icon.keyboard-backspace-icon > .material-design-icon__svg {
  height: 25px;
  width: 25px;
}

.booking-nav-header {
  .flex-parent();
  .flex-direction('column');
  .flex-justify-content('space-between');
  justify-content: space-between;

  .back-arrow {
    color: white;
  }

  .stats {
    color: white;
    text-transform: uppercase;
    font-size: 10px;
    letter-spacing: 0.36px;
    text-align: right;
    line-height: 2em;

    #total-cost-value,
    #total-duration-value {
      margin-left: 0.25em;
    }
  }
}
</style>
