<template>
  <div v-if="!shared.userToken" class="login-cta">
    <span class="header">Already a customer?</span>
    <div>
      <router-link
        @click.native="$event.stopImmediatePropagation()"
        :to="{ name: 'sign-in' }"
      ><span class="header-cta">Retrieve your preferences here</span></router-link>
    </div>
  </div>
</template>

<script>
import Storage from 'common/storage'

export default {
  data() {
    return {
      shared: Storage.sharedState,
    }
  },
}
</script>

<style lang="less">
@import '../../common/utils.less';

.login-cta {
  .ignore-parent-padding();
  padding: 20px;
  background-color: white;
  color: @darkBlue;
  text-align: center;
  line-height: 20px;

  .header {
    text-transform: uppercase;
    font-weight: 400;
    font-size: 14px;
  }

  a {
    text-decoration: underline;

    .header-cta {
      text-transform: uppercase;
      font-weight: 500;
      font-size: 14px;
    }
  }
}
</style>
