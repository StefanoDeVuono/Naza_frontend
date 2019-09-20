<template>
  <div class="container">
    <div v-show="showBackArrow" class="back-arrow" @click="goBack">
      &larr;
    </div>

    <div class="time-and-cost">
      <h3>
        TIME: {{ prettyDuration }}
        <span class="dash">&ndash;</span>
        COST: {{ prettyPrice }}
      </h3>
    </div>

    <div v-show="showBackArrow" class="back-arrow">&nbsp;</div>
  </div>
</template>

<script>
import { formattedPrice, formattedHours } from 'common/utils'

export default {
  computed: {
    prettyPrice() {
      return formattedPrice(this.totalPrice)
    },

    prettyDuration() {
      return formattedHours(this.totalDuration)
    },
  },

  props: {
    totalDuration: Number,
    totalPrice: Number,
    showBackArrow: Boolean,
  },

  methods: {
    goBack() {
      this.$router.go(-1)
    },
  },
}
</script>

<style lang="less" scoped>
@import '../../common/utils.less';

.back-arrow {
  flex-grow: 1;
  font-size: 24px;
}

.time-and-cost {
  flex-grow: 2;

  h3 {
    font-family: 'TTCommons', sans-serif;
    font-weight: bold;
    font-size: 14px;
    letter-spacing: 0.7px;
    color: @darkBlue;
    text-align: center;
  }

  .dash {
    margin: 0 0.5em;
  }
}

.container {
  .ignore-parent-padding();
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  padding: 20px;
  background-color: white;
}
</style>
