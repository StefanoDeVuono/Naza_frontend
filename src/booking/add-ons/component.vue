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

      <div class="add-ons">
        <div class="header">
          <DrinkIcon />
          <h2>A Drink On Us!</h2>
        </div>

        <div class="products">
          <div
            class="product"
            v-bind:class="{ active: isActive(product.id) }"
            v-for="product in drinkAddOns"
          >
            <img
              @click="selectDrink(product)"
              :src="getAddOnImageUrl(product)"
            />
            <h2>{{ product.name }}</h2>
            <p>{{ product.description }}</p>
            <div class="duration-and-price-wrapper">
              <DurationAndPrice :duration="0" :price="0" />
            </div>
          </div>
        </div>

        <SqButton
          label="Schedule Your Appointment"
          :onClick="scheduleYourAppointment"
        />
      </div>
    </Content>
  </div>
</template>

<script>
import { getSpreeServer, getCurlAssetRoot } from 'common/constants'
import Header from '../components/header.vue'
import Content from '../components/content.vue'
import AppointmentSummaryContent from '../components/appointment-summary-content.vue'
import RunningTotals from '../components/running-totals.vue'
import DurationAndPrice from '../components/duration-and-price.vue'
import 'whatwg-fetch'
import { parse } from 'jsonapi-parse'
import {
  path,
  compose,
  prop,
  nth,
  filter,
  map,
  last,
  sortBy,
  replace,
  isNil,
  join,
  find,
  difference,
  isEmpty,
  reduce,
  flatten,
} from 'ramda'
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
      selectedDrinkId: undefined,
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
    isActive(productId) {
      return this.selectedDrinkId === productId
    },

    getAddOnImageUrl(product) {
      return (
        this.CURL_ASSET_ROOT + path(['images', 0, 'styles', 1, 'url'], product)
      )
    },

    selectDrink(product) {
      this.selectedDrinkId = product.default_variant.id
    },

    fetchAddOns() {
      var path = `${getSpreeServer()}/taxons/drink-add-ons?include=products.images,default_variant`
      fetch(path)
        .then(response => {
          return response.json()
        })
        .then(json => {
          this.drinkAddOns = parse(json).data.products
        })
    },

    fetchData() {
      this.fetchAddOns()
    },

    scheduleYourAppointment() {
      const data = {
        variant_id: this.selectedDrinkId,
        quantity: 1,
      }

      return fetch(getSpreeServer() + '/cart/add_item', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Spree-Order-Token': this.shared.orderToken,
        },
        body: JSON.stringify(data),
      }).then(() => {
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
    DurationAndPrice,
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

.add-ons {
  .ignore-parent-padding();
  .ignore-parent-padding--add-padding(1);

  &:nth-child(even) {
    background-color: @lightGray;
  }

  .header {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    h2 {
      font-size: 22px;
      font-weight: bold;
      color: @darkBlue;
      text-transform: none;
    }

    svg {
      margin-right: 10px;
      transform: translate(0, 8px);
    }
  }

  .products {
    margin-top: 20px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    grid-column-gap: 15px;
    grid-row-gap: 15px;
  }

  .product {
    margin-bottom: 20px;

    h2 {
      text-align: center;
      color: @orange;
      text-transform: none;
      font-size: 14px;
      margin: 5px 0;
    }

    p {
      text-align: center;
      font-size: 12px;
      margin: 0;
      color: @darkBlue;
    }

    svg {
      transform: translate(0, -2px);
    }

    img {
      width: 100%;
      height: calc(50vw - 30px);
      object-fit: cover;
      line-height: 0;
      border: 3px solid @darkBlue;
    }

    &.active img {
      border: 3px solid @orange;
    }

    .duration-and-price-wrapper {
      width: 80%;
      margin: 0 auto;
    }
  }
}
</style>
