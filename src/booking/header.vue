<template>
  <div>
    <div class="booking-header">
      <NavHeader :showBackArrow="showBackArrow" />

      <h1>{{ title }}</h1>
      <div v-if="instructions" class="desc">
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
  text-align: center;
  font-size: 36px;
  letter-spacing: 1.52px;
}
</style>
