<template>
  <div>
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
      src="assets/images/decor%20border%20full.png"
      alt=""
      srcset="
        assets/images/decor%20border%20full.png 1x,
        assets/images/decor%20border%20full.png 2x
      "
    />
  </div>
</template>

<style lang="less" scoped>
@import '../../common/utils.less';

div {
  .ignore-parent-padding();
  position: relative;
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
}
</style>
