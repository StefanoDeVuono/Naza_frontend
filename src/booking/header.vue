<template>
  <div>
    <div class="booking-header">
      <NavHeader :totalCost="totalCost" :totalDuration="totalDuration" :showBackArrow="showBackArrow" />

      <h1>Our Services</h1>
      <div class="desc">
        That though the radiance which was once so bright be now forever taken
        from my sight.
      </div>
    </div>

    <LoginCta />
  </div>
</template>

<script>
import NavHeader from './nav-header.vue'
import LoginCta from './login-cta.vue'

export default {
  props: {
    totalCost: Number,
    totalDuration: Number,
    showBackArrow: Boolean
  },
  components: {
    NavHeader,
    LoginCta,
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
