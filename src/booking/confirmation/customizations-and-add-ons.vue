<template>
  <ul>
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

<style lang="less" scoped>
@import '../../common/utils.less';

ul {
  margin: 10px 0;
  padding: 0;

  li {
    list-style-type: none;
    display: block;
    text-align: center;
  }
}
</style>
