<template>
  <ul class="customizations">
    <li v-for="(value, customization) in shared.customizations">
      <strong>{{ customization }}:</strong> {{ value }}
    </li>

    <li v-if="shared.freeAddOns">
      <strong>Free Add-Ons:</strong> {{ shared.freeAddOns }}
    </li>

    <li v-if="shared.premiumAddOns">
      <strong>Premium Add-Ons:</strong> {{ shared.premiumAddOns }}
    </li>

    <li v-if="shared.drinkAddOn">
      <strong>Drink:</strong> {{ shared.drinkAddOn }}
    </li>
  </ul>
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

.customizations {
  strong {
    color: @orange;
  }

  li {
    list-style: none;
    font-size: 14px;
    line-height: 21px;
  }

  li::before {
    content: '\2022';
    color: @orange;
    font-weight: bold;
    display: inline-block;
    width: 1em;
    margin-left: -1em;
  }
}
</style>
