<template>
  <div class="login-cta">
    <div>Already a customer?</div>
    <div>
      <a href="/login">Retrieve your preferences here</a>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="less">
@import '../../common/utils.less';

.login-cta {
  .ignore-parent-padding();
  .ignore-parent-padding--add-padding(0.5);

  background-color: #bc5940;
  color: white;
  text-align: center;
  line-height: 20px;

  a {
    text-decoration: underline;
  }
}
</style>
