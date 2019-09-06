<template>
  <div class="running-totals">
    <span class="info"> Total: {{ prettyPrice }} </span>
    <span class="separator">|</span>
    <span class="info"> Duration: {{ prettyDuration }} </span>
  </div>
</template>

<script>
import { formattedPrice, formattedHours } from 'common/utils'
import Storage from 'common/storage'

export default {
  data: function() {
    return {
      shared: Storage.sharedState,
    }
  },
  computed: {
    prettyPrice: function() {
      return formattedPrice(this.shared.price)
    },

    prettyDuration: function() {
      return formattedHours(this.shared.duration)
    },
  },
}
</script>

<style lang="less">
@import '../../common/utils.less';

.running-totals {
  .ignore-parent-padding();
  .ignore-parent-padding--add-padding(0.5);

  .separator {
    margin: 0 1em;
  }

  color: #1c3042;
  background-color: #e6e1da;
  text-transform: uppercase;
  font-size: 12px;
  letter-spacing: 0.36px;
  text-align: center;
  line-height: 2em;
}
</style>
