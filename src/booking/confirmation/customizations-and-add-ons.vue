<template>
  <ul>
    <li v-for="(value, customization) in shared.customizations">
      <strong>{{ customization }}:</strong> {{ value }}
    </li>

    <li v-if="!isEmpty(shared.selectedFreeAddOns)">
      <strong>Free Add-Ons:</strong> {{ freeAddOns }}
    </li>

    <li v-if="!isEmpty(shared.selectedPremiumAddOns)">
      <strong>Premium Add-Ons:</strong> {{ premiumAddOns }}
    </li>

    <li v-if="!!shared.selectedDrinkAddOnString">
      <strong>Drink:</strong> {{ shared.selectedDrinkAddOnString }}
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
    freeAddOns() {
      return join(', ', Object.values(this.shared.selectedFreeAddOns))
    },

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
