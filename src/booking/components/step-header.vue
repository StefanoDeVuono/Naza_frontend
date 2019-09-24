<template>
  <div class="step-header">
    <div class="subheader">
      <span>{{ stepTitle }}</span>
    </div>
    <div class="header-container">
      <div class="header">
        <img :alt="stepTitle" :src="imageUrl" />
      </div>
    </div>
    <div class="text"><h2 v-html="ctaText"></h2></div>
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

.step-header {
  text-align: center;
  margin-right: 20px;
  margin-left: 20px;
  margin-bottom: 40px;
  line-height: 24px;
  height: 100%;
  color: @darkBlue;

  .subheader {
    font-size: 14px;
    font-weight: bold;
    letter-spacing: 0.89px;
    color: @orange;
    text-transform: uppercase;
    margin-bottom: 10px;
  }

  .header-container {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
  }

  .header {
    width: 122px;

    img {
      width: 100%;
      height: auto;
    }
  }

  .text h2 {
    .ignore-parent-padding();

    word-wrap: break-word;
    font-size: 18px;
    font-weight: normal;
    letter-spacing: 0.53px;
  }
}
</style>
