<template>
  <div class="customize" v-if="shared.product">
    <Header title="Customizations" :showBackArrow="true" />

    <RunningTotals :price="shared.price" :duration="shared.duration" />

    <Content :progress-step="3">
      <h2 class="cta">Make it Your Style</h2>

      <p class="cta">
        We will grieve not, rather find Strength in what remains behind; In the
        primal sympathy Which having been must ever be
      </p>

      <ChevronDownIcon />

      <div class="img-container">
        <img
          :data-url="CURL_ASSET_ROOT + largeImageUrl"
          :src="CURL_ASSET_ROOT + largeImageUrl"
        />
      </div>

      <div class="taxon">
        <h2 class="subheader">Style</h2>
        <h2 class="taxon-name">{{ shared.taxonName }}</h2>
      </div>

      <div class="style">
        <h2 class="subheader">Pattern</h2>
        <h2 class="style-name">{{ shared.product.name }}</h2>
        <p class="style-desc">{{ shared.product.description }}</p>
      </div>

      <div class="customizations">
        <div v-for="optionType in availableOptions" class="customization">
          <RadioButtonGrouping
            :optionValueMap="optionValueMap"
            :name="optionType.presentation"
            :options="optionType.option_values"
            :onChange="handleCustomizationChange"
          />
        </div>

        <div v-for="optionType in colorOptions" class="customization">
          <HairColorSelector
            :colors="optionType.option_values"
            :onPress="handleColorChange"
            :selectedColor="shared.customizations.Color"
          />
        </div>

        <NextStepButton
          label="Next Step, Please!"
          :onClick="nextScreen"
          :disabled="disableSubmit"
        />
      </div>
    </Content>
  </div>
</template>

<script>
import { getSpreeServer, getCurlAssetRoot } from '../constants'
import Header from './header.vue'
import Content from './content.vue'
import ChevronDownIcon from 'vue-material-design-icons/ChevronDown.vue'
import 'whatwg-fetch'
import { parse } from 'jsonapi-parse'
import HairColorSelector from './hair-color-selector.vue'
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
import RadioButtonGrouping from 'common/radio-button-grouping.vue'
import FindYourStyle from './find-your-style.vue'
import RunningTotals from './running-totals.vue'
import NextStepButton from 'common/next-step-button.vue'
import Storage from 'common/storage'

export default {
  data: function() {
    return {
      CURL_ASSET_ROOT: getCurlAssetRoot(),

      // we need to store this separately so vue can
      // track updates
      customizationCount: 0,

      shared: Storage.sharedState
    }
  },

  // @param {integer} categoryId
  props: ['categoryId'],

  computed: {
    disableSubmit: function() {
      return this.customizationCount !== this.shared.product.option_types.length
    },

    largeImageUrl: function() {
      return path(['images', 0, 'styles', 3, 'url'], this.shared.product)
    },

    smallImageUrl: function() {
      return path(['images', 0, 'styles', 2, 'url'], this.shared.product)
    },

    availableOptions: function() {
      return filter(x => x.name !== 'Color', this.shared.product.option_types)
    },

    colorOptions: function() {
      return filter(x => x.name === 'Color', this.shared.product.option_types)
    },

    optionValueMap: function() {
      return compose(
        reduce((acc, option_value) => {
          acc[option_value.name] = option_value
          return acc
        }, {}),
        flatten(),
        map(x => x.option_values)
      )(this.shared.product.option_types)
    }
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
          Storage.setProduct(parse(json).data)
          Storage.setTaxonName(this.findTaxonName())
        })
    },

    findTaxonName: function() {
      return compose(
        replace(/Hair Styles -> /, ''),
        last,
        sortBy(x => -x.length),
        map(x => x.pretty_name)
      )(this.shared.product.taxons)
    },

    nextScreen: function(event) {
      event.stopImmediatePropagation()

      if (this.disableSubmit) {
        return
      }

      this.$router.push({
        name: 'schedule-and-preferences',
        params: {
          productId: this.$route.params.productId,
        }
      })
    },

    findMatchingVariant: function() {
      // first build a list of customizations that have been
      // chosen so far. this will look something like
      // ['Size:Medium', 'Volume:Biggest']
      const selectedCustomizations = compose(
        sortBy(x => x),
        map(x => replace(/ /g, '', x)),
        map(x => join(':', x)),
        filter(x => !isNil(x[1])),
        Object.entries
      )(this.shared.customizations)

      // next we get all the product variants. we want variants
      // with multiple option values earlier so that the more
      // generic ones are selected later.
      const variants = sortBy(
        x => -x.option_values.length,
        this.shared.product.variants
      )

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
    },

    handleCustomizationChange: function(optionType, value) {
      Storage.setCustomization(optionType, value)
      const match = this.findMatchingVariant()

      if (match) {
        Storage.setPrice(match.price || this.shared.product.price)
        Storage.setDuration(match.duration || this.shared.product.duration)
      } else {
        Storage.setPrice(this.shared.product.price)
        Storage.setDuration(this.shared.product.duration)
      }

      this.customizationCount = Object.keys(this.shared.customizations).length
    },

    handleColorChange: function(color) {
      Storage.setCustomization('Color', color)
      this.customizationCount = Object.keys(this.shared.customizations).length
    },
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
    ChevronDownIcon,
    RadioButtonGrouping,
    FindYourStyle,
    HairColorSelector,
    RunningTotals,
    NextStepButton,
  },
}
</script>

<style lang="less">
  @import '../common/utils.less';

  .customize {
    .material-design-icon.chevron-down-icon > .material-design-icon__svg {
    height: 35px;
      width: 35px;
      display: block;
      fill: @orange;
      margin: 0 auto 0.5em auto;
    }

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

    h2.subheader {
      text-align: center;
      font-size: 12px;
      color: @darkBlue;
      letter-spacing: 0.5px;
      font-weight: bold;
    }

    div.taxon {
      margin-top: 40px;
      margin-bottom: 20px;
    }

    h2.taxon-name {
      font-size: 16px;
      letter-spacing: 0.67px;
      color: @orange;
      text-align: center;
      font-family: utopia-std;
      text-transform: none;
      margin: 0;
    }

    div.style {
      margin-top: 20px;
      margin-bottom: 40px;
    }

    h2.style-name {
      font-size: 32px;
      color: @orange;
      letter-spacing: 1.33px;
      font-weight: bold;
      text-align: center;
      font-family: utopia-std;
      text-transform: none;
      margin: 0 auto 20px auto;
    }

    p.style-desc {
      margin-top: 0;
      font-size: 14px;
      line-height: 1.5;
      letter-spacing: normal;
      text-align: center;
      color: @darkBlue;
    }

    div.img-container {
      .ignore-parent-padding();
      line-height: 0;
    }

    div.customizations {
      .ignore-parent-padding();
      .ignore-parent-padding--add-padding(2);

      background-color: @lightGray;
    }

    div.customization {
      margin-bottom: 40px;
    }
  }
</style>
