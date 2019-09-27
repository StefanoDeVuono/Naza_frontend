<template>
  <div v-if="errors.length" class="scheduling-errors">
    <div v-for="(error, index) in errors" :key="index">
      <span>- {{ error }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    errors: Array,
  },
}
</script>

<style lang="less">
@import '../../common/utils.less';

.scheduling-errors {
  .ignore-parent-padding();

  background-color: rgba(147, 32, 4, 0.37);
  color: @deepRed;
  font-size: 14px;
  font-weight: bold;
  line-height: 1.43;
  letter-spacing: 0.5px;
  padding: 20px;
}
</style>
