<template>
  <div class="appointment-summary-content">
    <h3 class="style-header" @click="toggleDetails">
      Style Details
      <ChevronUpIcon :size="20" v-show="!showDetails" />
      <ChevronDownIcon :size="20" v-show="showDetails" />
    </h3>
    <ul v-show="showDetails">
      <li><strong>Style:</strong> {{ shared.taxonName }}</li>
      <li><strong>Pattern:</strong> {{ patternName }}</li>
      <li>
        <strong>Description:</strong>
        <span v-if="showMoreLink">{{ truncatedDescription }}</span>
        <span v-else>{{ description }}</span>
        <span v-if="showMoreLink" class="more-action" @click="expandDescription"
          >more</span
        >
      </li>
    </ul>

    <h3 class="style-header" @click="toggleCustomizations">
      Customizations
      <ChevronUpIcon :size="20" v-show="!showCustomizations" />
      <ChevronDownIcon :size="20" v-show="showCustomizations" />
    </h3>
    <ul v-show="showCustomizations">
      <li v-for="(value, customization) in shared.customizations">
        <strong>{{ customization }}:</strong> {{ value }}
      </li>
    </ul>

    <h3 class="style-header" @click="toggleAddOns">
      Add-ons
      <ChevronUpIcon :size="20" v-show="!showAddOns" />
      <ChevronDownIcon :size="20" v-show="showAddOns" />
    </h3>
    <ul v-show="showAddOns">
      <li v-if="!isEmpty(shared.selectedFreeAddOns)">
        <strong>Free:</strong> {{ freeAddOns }}
      </li>

      <li v-if="!isEmpty(shared.selectedPremiumAddOns)">
        <strong>Premium:</strong> {{ premiumAddOns }}
      </li>

      <li v-if="!isNil(shared.selectedDrinkAddOnString)">
        <strong>Drink:</strong> {{ shared.selectedDrinkAddOnString }}
      </li>
    </ul>
  </div>
</template>

<script>
import Storage from 'common/storage'
import { slice, isEmpty, isNil, join } from 'ramda'
import CustomizationsAndAddOns from './customizations-and-add-ons.vue'
import ChevronDownIcon from 'vue-material-design-icons/ChevronDown.vue'
import ChevronUpIcon from 'vue-material-design-icons/ChevronUp.vue'

export default {
  data() {
    return {
      showMoreLink: true,
      showDetails: true,
      showCustomizations: true,
      showAddOns: true,
      shared: Storage.sharedState,
    }
  },

  methods: {
    isEmpty,
    isNil,
    toggleDetails() {
      this.showDetails = !this.showDetails
    },
    toggleCustomizations() {
      this.showCustomizations = !this.showCustomizations
    },
    toggleAddOns() {
      this.showAddOns = !this.showAddOns
    },
    expandDescription() {
      this.showMoreLink = false
    },
  },

  computed: {
    patternName() {
      return this.shared.product.name
    },

    freeAddOns() {
      return join(', ', Object.values(this.shared.selectedFreeAddOns))
    },

    premiumAddOns() {
      return join(', ', Object.values(this.shared.selectedPremiumAddOns))
    },

    truncatedDescription() {
      return slice(0, 35, this.description) + '...'
    },

    description() {
      return this.shared.product.description
    },
  },

  components: {
    CustomizationsAndAddOns,
    ChevronDownIcon,
    ChevronUpIcon,
  },
}
</script>

<style lang="less" scoped>
@import '../../common/utils.less';

.appointment-summary-content {
  margin-top: 20px;

  .material-design-icon {
    display: inline-block;
    transform: translateY(4px);
  }

  ul {
    padding-left: 1em;
  }

  .style-header {
    font-family: 'TTCommons', sans-serif;
    font-size: 16px;
    font-weight: bold;
    color: @darkBlue;
    text-transform: uppercase;
  }

  .more-action {
    color: rgba(28, 48, 66, 0.5);
  }
}
</style>
