<template>
  <div v-if="!shared.userToken" class="info-header">
    <span class="header">Don’t see the style you’re looking for? We can help!</span>
    <br />
    <span class="header">
      Send an inspo photo &amp; natural hair photo to
      <a
        rel="noopener noreferrer"
        target="_blank"
        href="mailto:booking@nazabeauty.com">booking@nazabeauty.com</a>
    </span>
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

.info-header {
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
  }
}
</style>
