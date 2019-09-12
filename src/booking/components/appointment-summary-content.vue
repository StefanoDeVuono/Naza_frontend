<template>
  <div class="appointment-summary-content">
    <div class="row">
      <h2 class="style-header">Style</h2>
      <h2 class="style-name">{{ shared.taxonName }}</h2>
    </div>

    <div class="row">
      <h2 class="style-header">Pattern</h2>
      <h2 class="pattern-name">{{ patternName }}</h2>
    </div>

    <div class="row">
      <p class="description" v-if="showMoreLink">
        {{ truncatedDescription }}
        <span class="more-action" @click="expandDescription">more</span>
      </p>
      <p class="description" v-else>{{ description }}</p>
    </div>

    <div class="row">
      <CustomizationsAndAddOns />
    </div>
  </div>
</template>

<script>
import Storage from 'common/storage'
import { slice } from 'ramda'
import CustomizationsAndAddOns from './customizations-and-add-ons.vue'

export default {
  data() {
    return {
      showMoreLink: true,
      shared: Storage.sharedState,
    }
  },

  methods: {
    expandDescription: function() {
      this.showMoreLink = false
    },
  },

  computed: {
    patternName: function() {
      return this.shared.product.name
    },

    truncatedDescription: function() {
      return slice(0, 35, this.description) + '...'
    },

    description: function() {
      return this.shared.product.description
    },
  },

  components: {
    CustomizationsAndAddOns,
  },
}
</script>

<style lang="less">
@import '../../common/utils.less';

.appointment-summary-content {
  .row {
    margin: 5px 0;
  }

  .style-header {
    font-size: 12px;
    font-weight: bold;
    color: @darkBlue;
    text-align: center;
  }

  .style-name {
    color: @orange;
    text-align: center;
    font-size: 16px;
    font-weight: bold;
    font-family: utopia-std;
  }

  .pattern-name {
    color: @orange;
    font-size: 28px;
    font-weight: bold;
    text-align: center;
    font-family: utopia-std;
    text-transform: none;
  }

  .description {
    margin-top: 20px;
    font-size: 14px;
    line-height: 21px;
    text-align: center;
  }

  .more-action {
    color: rgba(28, 48, 66, 0.5);
  }
}
</style>
