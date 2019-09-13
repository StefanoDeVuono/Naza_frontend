<template>
  <div v-if="!loggedIn" class="login-cta">
    <div>Already a customer?</div>
    <div>
      <router-link
        @click.native="$event.stopImmediatePropagation()"
        :to="{ name: 'sign-in' }"
        >Retrieve your preferences here</router-link
      >
    </div>
  </div>
</template>

<script>
import Storage from 'common/storage'

export default {
  computed: {
    loggedIn() {
      return Storage.loggedIn()
    },
  },
}
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
