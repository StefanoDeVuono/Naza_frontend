<template>
  <div class="cta">
    <div class="cta-subheader">
      <span>{{ stepTitle }}</span>
    </div>
    <div class="cta-header-container">
      <div class="cta-header">
        <img alt="Pick Your Style" :src="imageUrl" />
      </div>
    </div>
    <div class="cta-text"><h2>Select one of the options below</h2></div>
  </div>
</template>

<script>
export default {
  props: {
    stepTitle: String,
    imageUrl: String,
    ctaText: String,
  },
}
</script>

<style lang="less" scoped>
@import '../../common/utils.less';

.cta {
  text-align: center;
  margin-right: 20px;
  margin-left: 20px;
  margin-bottom: 40px;
  line-height: 24px;
  color: @darkBlue;
}

.cta-subheader {
  font-size: 14px;
  font-weight: bold;
  letter-spacing: 0.89px;
  color: @orange;
  text-transform: uppercase;
  margin-bottom: 10px;
}

.cta-header-container {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.cta-header {
  width: 122px;

  img {
    width: 100%;
    height: auto;
  }
}

.cta-text h2 {
  height: 24px;
  font-size: 18px;
  font-weight: normal;
  letter-spacing: 0.53px;
}
</style>
