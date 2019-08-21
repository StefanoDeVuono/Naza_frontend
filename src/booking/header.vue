<template>
  <div>
    <div class="booking-header">
      <NavHeader
        :totalPrice="totalPrice"
        :totalDuration="totalDuration"
        :showBackArrow="showBackArrow"
      />

      <h1>{{ title }}</h1>
      <div class="desc">
        {{ instructions }}
      </div>
    </div>
  </div>
</template>

<script>
import NavHeader from './nav-header.vue'

export default {
  props: {
    title: String,
    instructions: String,
    totalPrice: Number,
    totalDuration: Number,
    showBackArrow: Boolean,
  },
  components: {
    NavHeader,
  },
}
</script>

<style lang="less">
@import '../../styles/util.less';
@import '../common/utils.less';

.booking-header {
  .ignore-parent-padding();
  .ignore-parent-padding--add-padding(1);
  background-color: #1c3042;

  .desc {
    font-size: 18px;
    line-height: 27px;
    letter-spacing: 0;
    color: white;
  }
}

.booking-header h1 {
  color: white;
}
</style>
