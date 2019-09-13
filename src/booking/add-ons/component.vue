<template>
  <div>
    <Header title="Add-ons" :showBackArrow="true" />

    <RunningTotals />

    <Content :progress-step="4">
      <h2 class="cta">Anything You'd Like To Add?</h2>

      <p class="cta">
        We will grieve not, rather find Strength in what remains behind; In the
        primal sympathy Which having been must ever be
      </p>

      <div class="img-container">
        <img
          :data-url="CURL_ASSET_ROOT + largeImageUrl"
          :src="CURL_ASSET_ROOT + largeImageUrl"
        />
      </div>

      <AppointmentSummaryContent />

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
import AppointmentSummaryContent from '../components/appointment-summary-content.vue'
import RunningTotals from '../components/running-totals.vue'
import Group from './group.vue'
import 'whatwg-fetch'
import { parse } from 'jsonapi-parse'
import { path, reduce, concat, filter, map, join } from 'ramda'
import Storage from 'common/storage'
import { mockProductIfDevelopment } from 'common/utils'
import DrinkIcon from 'images/noun_drinks_2776386.svg'
import SqButton from 'common/sq-button.vue'

export default {
  data() {
    return {
      CURL_ASSET_ROOT: getCurlAssetRoot(),
      shared: Storage.sharedState,
      drinkAddOns: [],
      freeAddOns: [],
      premiumAddOns: [],
      selectedDrinkId: undefined,
      selectedDrinkName: undefined,
      selectedFreeAddOns: {},
      selectedPremiumAddOns: {},
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
      return this.selectedDrinkId === productId
    },

    selectDrink(product) {
      this.selectedDrinkId = product.default_variant.id
      this.selectedDrinkName = product.name
    },

    isFreeAddOnActive(productId) {
      return !!this.selectedFreeAddOns[productId]
    },

    selectFreeAddOn(product) {
      const variant = product.default_variant

      if (this.selectedFreeAddOns[variant.id]) {
        this.$delete(this.selectedFreeAddOns, variant.id)
      } else {
        this.$set(this.selectedFreeAddOns, variant.id, product.name)
      }
    },

    isPremiumAddOnActive(productId) {
      return !!this.selectedPremiumAddOns[productId]
    },

    selectPremiumAddOn(product) {
      const variant = product.default_variant

      if (this.selectedPremiumAddOns[variant.id]) {
        this.$delete(this.selectedPremiumAddOns, variant.id)
      } else {
        this.$set(this.selectedPremiumAddOns, variant.id, product.name)
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

    addCartItem(variantId) {
      return fetch(getSpreeServer() + '/cart/add_item', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Spree-Order-Token': this.shared.orderToken,
        },
        body: JSON.stringify({
          variant_id: variantId,
          quantity: 1,
        }),
      })
    },

    scheduleYourAppointment() {
      this.shared.drinkAddOn = this.shared.selectedDrinkName
      this.shared.freeAddOns = join(
        ', ',
        Object.values(this.selectedFreeAddOns)
      )
      this.shared.premiumAddOns = join(', ', Object.values(this.premiumAddOns))

      const variantIds = filter(
        Boolean,
        reduce(concat, [])([
          [this.selectedDrinkId],
          Object.keys(this.selectedFreeAddOns),
          Object.keys(this.selectedPremiumAddOns),
        ])
      )

      reduce((promise, variantId) => {
        return promise.then(() => this.addCartItem(variantId))
      }, Promise.resolve())(variantIds).then(() => {
        this.$router.push({
          name: 'schedule-and-preferences',
        })
      })
    },
  },
  watch: {
    $route: 'fetchData',
  },
  components: {
    Header,
    Content,
    RunningTotals,
    AppointmentSummaryContent,
    DrinkIcon,
    SqButton,
    Group,
  },
  created() {
    mockProductIfDevelopment()
    this.fetchAddOns()
  },
}
</script>

<style lang="less">
@import '../../common/utils.less';

h2.cta {
  color: @darkBlue;
  font-weight: bold;
  font-size: 18px;
  letter-spacing: 0.75px;
}

p.cta {
  text-align: center;
  margin-bottom: 1em;
}

div.img-container {
  .ignore-parent-padding();
  margin: 30px 0;
  line-height: 0;
}

.sqs-block-button .sqs-block-button-element {
  display: block;
}
</style>
