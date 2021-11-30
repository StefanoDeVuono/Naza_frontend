<template>
  <ul class="customizations">
    <li v-for="(value, customization) in shared.customizations">
      <strong>{{ customization }}:</strong> {{ value }}
    </li>

    <li v-if="!isEmpty(shared.selectedPremiumAddOns)">
      <strong>Premium Add-Ons:</strong> {{ premiumAddOns }}
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

  computed: {
    premiumAddOns() {
      return join(', ', Object.values(this.shared.selectedPremiumAddOns))
    },
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
