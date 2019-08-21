<template>
  <div class="booking-nav-header">
    <div class="back-arrow">
      <KeyboardBackspaceIcon @click="goBack" v-if="showBackArrow" />
    </div>

    <div class="stats">
      <div id="total-price">
        <span>Total</span>:
        <span id="total-price-value">{{ formattedPrice(totalPrice) }}</span>
      </div>
      <div id="total-duration">
        <span>Duration</span>:
        <span id="total-duration-value">{{
          formattedHours(totalDuration)
        }}</span>
      </div>
    </div>
  </div>
</template>

<script>
// import 'vue-material-design-icons/styles.css'
import KeyboardBackspaceIcon from 'vue-material-design-icons/KeyboardBackspace.vue'
import { formattedPrice, formattedHours } from 'common/utils'

export default {
  props: {
    totalPrice: Number,
    totalDuration: Number,
    showBackArrow: Boolean,
  },

  methods: {
    goBack: function() {
      this.$router.go(-1)
    },
    formattedHours,
    formattedPrice,
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

    #total-price-value,
    #total-duration-value {
      margin-left: 0.25em;
    }
  }
}
</style>
