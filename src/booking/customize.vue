<template>
  <div v-if="product">
    <Header
      title="Customizations"
      instructions="Though nothing can bring back the hour; Of splendor in the grass, of glory in the flower"
      :totalPrice="price"
      :totalDuration="duration"
      :showBackArrow="true"
    />

    <Content :progress-step="3">
      <h2 class="cta">Make it Your Style</h2>

      <p class="cta">
        We will grieve not, rather find Strength in what remains behind; In the
        primal sympathy Which having been must ever be
      </p>

      <ArrowDownIcon />

      <div class="img-container">
        <img
          :data-url="CURL_ASSET_ROOT + largeImageUrl"
          :src="CURL_ASSET_ROOT + largeImageUrl"
        />
      </div>

      <div class="breadcrumbs">
        {{ breadcrumbs }}
      </div>

      <div class="description">
        <h2 class="option">{{ product.name }}</h2>
        <p>{{ product.description }}</p>
      </div>

      <hr />

      <div v-for="optionType in availableOptions" class="customization">
        <RadioButtonGrouping
          v-model="customizations[optionType.name]"
          :name="optionType.presentation"
          :options="optionType.option_values"
          :onChange="handleCustomizationChange"
        />
      </div>

      <FindYourStyle />
    </Content>
  </div>
</template>

<script>
import { getSpreeServer, getCurlAssetRoot } from '../constants'
import Header from './header.vue'
import Content from './content.vue'
import ArrowDownIcon from 'vue-material-design-icons/ArrowDown.vue'
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
  isEmpty
} from 'ramda'
import RadioButtonGrouping from 'common/radio-button-grouping.vue'
import FindYourStyle from './find-your-style.vue'

export default {
  data: () => {
    return {
      CURL_ASSET_ROOT: getCurlAssetRoot(),
      product: undefined,
      addOns: undefined,
      customizations: {
      },
      selectedAddOns: new Set(),
      variantPrice: undefined,
      variantDuration: undefined
    }
  },

  // @param {integer} categoryId
  props: ['categoryId'],

  computed: {
    largeImageUrl: function() {
      return path(['images', 0, 'styles', 3, 'url'], this.product)
    },

    smallImageUrl: function() {
      return path(['images', 0, 'styles', 2, 'url'], this.product)
    },

    availableOptions: function() {
      return filter(x => x.option_values.length < 5, this.product.option_types)
    },

    duration: function() {
      if (this.variantDuration) {
        return parseInt(this.variantDuration)
      }

      return parseInt(this.product.duration)
    },

    price: function() {
      if (this.variantPrice) {
        return parseInt(this.variantPrice)
      }

      return parseInt(this.product.price)
    },

    breadcrumbs: function() {
      return compose(
        replace(/->/, '>'),
        replace(/Hair Styles -> /, ''),
        last,
        sortBy(x => x.length),
        map(x => x.pretty_name)
      )(this.product.taxons)
    },
  },

  methods: {
    fetchStyles: function() {
      var productId = this.$route.params.productId
      if (!productId) {
        return
      }

      var path = `${getSpreeServer()}/products/${productId}?include=taxons,images,option_types.option_values,product_properties,variants`
      fetch(path)
        .then(response => {
          return response.json()
        })
        .then(json => {
          this.product = parse(json).data
        })
    },

    fetchAddOns: function() {
      var path = `${getSpreeServer()}/taxons/add-ons?include=products.images`
      fetch(path)
        .then(response => {
          return response.json()
        })
        .then(json => {
          this.addOns = parse(json).data.products
        })
    },

    findMatchingVariant: function() {
      // first build a list of customizations that have been
      // chosen so far. this will look something like
      // ['Size:Medium', 'Volume:Biggest']
      const selectedCustomizations = compose(
        sortBy(x => x),
        map(x => join(':', x)),
        filter(x => !isNil(x[1])),
        Object.entries
      )(this.customizations)

      // next we get all the product variants. we want variants
      // with multiple option values earlier so that the more
      // generic ones are selected later.
      const variants = sortBy(x => -x.option_values.length, this.product.variants)

      // find the first matching variant that has all the
      // customizations we selected.
      const matchingVariant = find(variant => {
        const options = map(x => x.name, variant.option_values)
        const delta = difference(options, selectedCustomizations)
        return isEmpty(delta)
      }, variants)

      return matchingVariant
    },

    fetchData: function() {
      this.fetchStyles()
      this.fetchAddOns()
    },

    handleCustomizationChange: function(optionType, value) {
      this.customizations[optionType] = value
      const match = this.findMatchingVariant()

      if (match) {
        this.variantPrice = match.price
        this.variantDuration = match.duration
      } else {
        this.variantPrice = undefined
        this.variantDuration = undefined
      }
    }
  },
  watch: {
    $route: 'fetchData',
  },
  created: function() {
    this.fetchData()
  },

  components: {
    Header,
    Content,
    ArrowDownIcon,
    RadioButtonGrouping,
    FindYourStyle,
  },
}
</script>

<style lang="less">
@import '../common/utils.less';

.material-design-icon.arrow-down-icon,
.material-design-icon.arrow-down-icon > .material-design-icon__svg {
  height: 25px;
  width: 25px;
  display: block;
  margin: 0 auto 1em auto;
}

h2.cta {
  color: #1c3042;
}

p.cta {
  text-align: center;
  margin-bottom: 1em;
}

div.img-container {
  .ignore-parent-padding();
}

div.breadcrumbs {
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.5px;
  color: #1c3042;
  margin-bottom: 1em;
}

div.description p {
  margin-top: 0;
  font-size: 14px;
  line-height: 21px;
  letter-spacing: 0.58px;
  color: #1c3042;
}

hr {
  border-top: 2px solid #1c3042;
  margin: 40px 0;
}

div.customization {
  margin-bottom: 40px;
}
</style>
