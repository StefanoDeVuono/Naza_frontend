<template>
  <div class="add-ons">
    <LightHeader
      :showBackArrow="true"
      :totalPrice="parseInt(shared.price)"
      :totalDuration="parseInt(shared.duration)"
    />

    <Content :progress-step="4">
      <StepHeader
        stepTitle="Step Four"
        imageUrl="https://s3.amazonaws.com/projectcurl-assets/HowItWorks/step4.png"
        ctaText="Select as many add-ons as you'd like!"
      />

      <Group
        testID="free-add-ons"
        title="Free Add-ons"
        :products="freeAddOns"
        :onSelect="selectFreeAddOn"
        :isActive="isFreeAddOnActive"
      >
        <template v-slot:icon>
          <DrinkIcon />
        </template>
      </Group>

      <Group
        testID="premium-add-ons"
        title="Premium Add-ons"
        :products="premiumAddOns"
        :onSelect="selectPremiumAddOn"
        :isActive="isPremiumAddOnActive"
      >
        <template v-slot:icon>
          <DrinkIcon />
        </template>
      </Group>

      <Group
        testID="drink-add-ons"
        title="A Drink On Us!"
        :products="drinkAddOns"
        :onSelect="selectDrink"
        :isActive="isDrinkActive"
      >
        <template v-slot:icon>
          <DrinkIcon />
        </template>

        <template v-slot:footer>
          <SqButton
            label="Schedule Your Appointment"
            :onClick="scheduleYourAppointment"
          />
        </template>
      </Group>
    </Content>
  </div>
</template>

<script>
import { getSpreeServer, getCurlAssetRoot } from 'common/constants'
import Header from '../components/header.vue'
import Content from '../components/content.vue'
import RunningTotals from '../components/running-totals.vue'
import Group from './group.vue'
import 'whatwg-fetch'
import { parse } from 'jsonapi-parse'
import { path } from 'ramda'
import Storage from 'common/storage'
import { mockProductIfDevelopment } from 'common/utils'
import DrinkIcon from 'images/noun_drinks_2776386.svg'
import SqButton from 'common/sq-button.vue'
import Vue from 'vue'
import LightHeader from '../components/light-header.vue'
import StepHeader from '../components/step-header.vue'

export default {
  data() {
    return {
      CURL_ASSET_ROOT: getCurlAssetRoot(),
      shared: Storage.sharedState,
      drinkAddOns: [],
      freeAddOns: [],
      premiumAddOns: [],
    }
  },

  computed: {
    largeImageUrl() {
      return path(['images', 0, 'styles', 3, 'url'], this.shared.product)
    },

    smallImageUrl() {
      return path(['images', 0, 'styles', 2, 'url'], this.shared.product)
    },
  },

  methods: {
    isDrinkActive(productId) {
      return this.shared.selectedDrinkAddOnId === productId
    },

    selectDrink(product) {
      this.shared.selectedDrinkAddOnId = product.default_variant.id
      this.shared.selectedDrinkAddOnString = product.name
    },

    isFreeAddOnActive(productId) {
      return !!this.shared.selectedFreeAddOns[productId]
    },

    selectFreeAddOn(product) {
      const variant = product.default_variant

      if (this.shared.selectedFreeAddOns[variant.id]) {
        Vue.delete(this.shared.selectedFreeAddOns, variant.id)
      } else {
        Vue.set(this.shared.selectedFreeAddOns, variant.id, product.name)
      }
    },

    isPremiumAddOnActive(productId) {
      return !!this.shared.selectedPremiumAddOns[productId]
    },

    selectPremiumAddOn(product) {
      const variant = product.default_variant

      if (this.shared.selectedPremiumAddOns[variant.id]) {
        Vue.delete(this.shared.selectedPremiumAddOns, variant.id)
      } else {
        Vue.set(this.shared.selectedPremiumAddOns, variant.id, product.name)
      }
    },

    fetchAddOns() {
      fetch(
        `${getSpreeServer()}/taxons/drink-add-ons?include=products.images,default_variant`
      )
        .then(response => response.json())
        .then(json => {
          this.drinkAddOns = parse(json).data.products
        })

      fetch(
        `${getSpreeServer()}/taxons/free-add-ons?include=products.images,default_variant`
      )
        .then(response => response.json())
        .then(json => {
          this.freeAddOns = parse(json).data.products
        })

      fetch(
        `${getSpreeServer()}/taxons/premium-add-ons?include=products.images,default_variant`
      )
        .then(response => response.json())
        .then(json => {
          this.premiumAddOns = parse(json).data.products
        })
    },

    fetchData() {
      this.fetchAddOns()
    },

    scheduleYourAppointment() {
      this.$router.push({
        name: 'schedule-and-preferences',
      })
    },
  },
  watch: {
    $route: 'fetchData',
  },
  components: {
    Content,
    DrinkIcon,
    SqButton,
    Group,
    LightHeader,
    StepHeader,
  },
  created() {
    mockProductIfDevelopment()
    this.fetchAddOns()
  },
}
</script>

<style lang="less" scoped>
@import '../../common/utils.less';

.add-ons {
  padding: 0 20px;
}
</style>
