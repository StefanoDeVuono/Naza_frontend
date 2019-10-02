<template>
  <div :class="{ flipped: flip }">
    <img
      class="border"
      src="assets/images/double%20border%20full.png"
      alt=""
      srcset="
        assets/images/double%20border.png    1x,
        assets/images/double%20border@2x.png 2x
      "
    />
    <img
      class="decor"
      :class="{ flipped: flip }"
      src="assets/images/decor%20border%20full.png"
      alt=""
      srcset="
        assets/images/decor%20border%20full.png 1x,
        assets/images/decor%20border%20full.png 2x
      "
    />
  </div>
</template>

<script>
export default {
  props: {
    flip: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style lang="less" scoped>
@import './utils.less';

div {
  .ignore-parent-padding();
  position: relative;

  &.flipped {
    height: 0;
  }
}

.border {
  display: block;
  width: 100%;
  height: 5px;
  top: 0;
}

.decor {
  display: block;
  position: relative;
  margin: 0 auto;
  top: -5px;
  height: 19px;

  &.flipped {
    transform: scaleY(-1);
    top: -19px;
  }
}
</style>
