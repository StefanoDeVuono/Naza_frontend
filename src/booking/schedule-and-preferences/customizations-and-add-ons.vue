<template>
  <ul class="customizations">
    <li v-for="(value, customization) in shared.customizations">
      <strong>{{ customization }}:</strong> {{ value }}
    </li>
  </ul>
</template>

<script>
import Storage from 'common/storage'
import { join, isEmpty, isNil } from 'ramda'

export default {
  data() {
    return {
      shared: Storage.sharedState,
    }
  },

  methods: {
    isEmpty,
    isNil,
  },
}
</script>

<style lang="less">
@import '../../common/utils.less';
</style>
