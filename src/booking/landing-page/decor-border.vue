<template>
  <div class="sunburst-border__container">
    <div class="sunburst-border__edge" />
    <div class="sunburst-border__image-container">
      <img
        src="/assets/images/decor%201.svg"
        class="sunburst-border__sunburst"
        :class="{ 'sunburst-border__sunburst--flipped': flip }"
        alt="sunburst border"
      />
    </div>
    <div class="sunburst-border__edge" />
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
@import '../../common/utils.less';

.sunburst-border__container {
  display: flex;
  justify-content: flex-start;
  width: 100%;
  height: 5px;
  top: 0;
}

.sunburst-border__edge {
  border: 1px solid @white;
  border-left: none;
  border-right: none;
  flex-grow: 1;
}

.sunburst-border__image-container {
  @media @extra-small {
    width: 100%
  }
}

.sunburst-border__sunburst {
  @media @extra-small {
    width: 100%
  }
}

.sunburst-border__sunburst--flipped {
  transform: rotate(180deg) translate(0, 14px);
}
</style>
