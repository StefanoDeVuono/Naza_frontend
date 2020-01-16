<template>
  <div class="customize" v-if="shared.product">
    <Loading :active.sync="isLoading" :is-full-page="true" />

    <LightHeader
      :showBackArrow="true"
      :totalPrice="parseInt(shared.product.price)"
      :totalDuration="parseInt(shared.product.duration)"
    />

    <Content :progressStep="3">
      <StepHeader
        stepTitle="Step Three"
        imageUrl="https://s3.amazonaws.com/projectcurl-assets/HowItWorks/step3.png"
        ctaText="Adjust the style, such as volume and hair color, by selecting your preferences below"
      />

      <Carousel
        ref="carousel"
        :perPage="1"
        :centerMode="true"
        :paginationPadding="5"
        :spacePadding="50"
        paginationColor="rgba(28, 48, 66, 0.4)"
        paginationActiveColor="#bc4940"
      >
        <template v-slot:pagination>
          <CustomCarouselPaginator
            @paginationclick="$refs.carousel.goToPage($event, 'pagination')"
          />
        </template>

        <Slide :key="image.id" v-for="image in shared.product.images">
          <img class="slide-img" :src="largeImageUrl(image)" :alt="image.alt" />
          <caption>
            {{
              image.alt
            }}
          </caption>
        </Slide>
      </Carousel>

      <div class="desc">
        <h2 class="taxon-name">{{ shared.taxonName }}</h2>
        <h2 class="style-name">{{ shared.product.name }}</h2>
        <p class="style-desc">{{ shared.product.description }}</p>
      </div>

      <div v-if="shared.product" class="customizations">
        <div v-for="optionType in availableOptions" class="customization">
          <RadioButtonGrouping
            :optionValueMap="optionValueMap"
            :name="optionType.presentation"
            :options="optionType.option_values"
            :onChange="handleCustomizationChange"
            :showHelp="true"
          />
        </div>

        <div v-for="optionType in colorOptions" class="customization">
          <HairColorSelector
            :colors="optionType.option_values"
            :onPress="handleColorChange"
            :selectedColor="shared.customizations.Color"
          />
        </div>

        <SqButton
          label="Next Step, Please!"
          :onClick="submit"
          :disabled="!isSubmitActive"
        />
      </div>
    </Content>
  </div>
</template>

<script>
import { getSpreeServer, getCurlAssetRoot } from 'common/constants'
import StepHeader from '../components/step-header.vue'
import Content from '../components/content.vue'
import 'whatwg-fetch'
import { parse } from 'jsonapi-parse'
import HairColorSelector from './hair-color-selector.vue'
import {
  path,
  compose,
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
import SqButton from 'common/sq-button.vue'
import Storage from 'common/storage'
import Loading from 'vue-loading-overlay'
import LightHeader from '../components/light-header.vue'
import { Carousel, Slide } from 'vue-carousel'
import CustomCarouselPaginator from '../components/custom-carousel-paginator.vue'

export default {
  data() {
    return {
      CURL_ASSET_ROOT: getCurlAssetRoot(),

      isLoading: false,
      isSubmitActive: false,

      shared: Storage.sharedState,
    }
  },

  // @param {integer} categoryId
  props: ['categoryId'],

  computed: {
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
    },
  },

  methods: {
    largeImageUrl: function(image) {
      return getCurlAssetRoot() + path(['styles', 3, 'url'], image)
    },

    smallImageUrl: function(image) {
      return getCurlAssetRoot() + path(['styles', 2, 'url'], image)
    },

    updateSubmitState() {
      if (this.shared.product.option_types.length === 0) {
        this.isSubmitActive = true
      } else if (this.colorOptions.length === 0) {
        this.isSubmitActive = true
      }
    },

    initializeCustomizations() {
      this.shared.product.option_types.forEach(optionType => {
        const values = optionType.option_values
        if (values.length <= 2) {
          Storage.setCustomization(
            optionType.name,
            optionType.name,
            values[0].presentation
          )
        } else if (values.length > 2) {
          Storage.setCustomization(optionType.name, values[1].presentation)
        }
      })

      this.updateSubmitState()
    },

    fetchStyles() {
      var productId = this.$route.params.productId
      if (!productId) {
        return
      }

      var path = `${getSpreeServer()}/products/${productId}?include=taxons,images,option_types.option_values,product_properties,variants,default_variant`
      fetch(path)
        .then(response => {
          return response.json()
        })
        .then(json => {
          Storage.setProduct(parse(json).data)
          Storage.setTaxonName(this.findTaxonName())
          this.initializeCustomizations()
        })
    },

    findTaxonName() {
      return compose(
        replace(/Hair Styles -> /, ''),
        last,
        sortBy(x => -x.length),
        map(x => x.pretty_name)
      )(this.shared.product.taxons)
    },

    submit(event) {
      if (!this.isSubmitActive) {
        return
      }

      this.findVariant()
      this.$router.push({
        name: 'add-ons',
      })
    },

    findMatchingVariant() {
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

    fetchData() {
      this.fetchStyles()
    },

    findVariant() {
      Storage.setPrice(this.shared.product.price)
      Storage.setDuration(this.shared.product.duration)
      Storage.setVariant(this.findMatchingVariant())

      if (this.shared.variant) {
        if (this.shared.variant.price) {
          Storage.setPrice(this.shared.variant.price)
        }

        if (this.shared.variant.duration) {
          Storage.setDuration(this.shared.variant.duration)
        }
      } else {
        Storage.setVariant(this.shared.product.default_variant)
      }
    },

    handleCustomizationChange(optionType, value) {
      Storage.setCustomization(optionType, value)

      this.findVariant()
    },

    handleColorChange(color) {
      Storage.setCustomization('Color', color.presentation)
      this.isSubmitActive = true
    },
  },

  watch: {
    $route: 'fetchData',
  },

  created: function() {
    this.fetchData()
  },

  components: {
    StepHeader,
    Content,
    RadioButtonGrouping,
    FindYourStyle,
    HairColorSelector,
    SqButton,
    Loading,
    LightHeader,
    Carousel,
    Slide,
    CustomCarouselPaginator,
  },
}
</script>

<style lang="less" scoped>
@import '../../common/utils.less';

.customize {
  .desc {
    margin-top: 40px;

    .taxon-name {
      font-family: 'TTCommons', sans-serif;
      font-size: 14px;
      font-weight: bold;
      color: @darkBlue;
      letter-spacing: 0.3px;
      text-align: center;
      text-transform: uppercase;
    }

    .style-name {
      color: @orange;
      font-size: 28px;
      font-weight: bold;
      letter-spacing: 1.17px;
      text-align: center;
    }

    .style-desc {
      margin-top: 0;
      font-size: 16px;
      font-weight: 400;
      line-height: 1.5;
      letter-spacing: normal;
      text-align: center;
      color: @darkBlue;
      margin-bottom: 20px;
    }
  }

  .customizations {
    background-color: @lightGray;
  }

  .customization {
    margin-bottom: 40px;
  }
}
</style>

<style lang="less">
@import '../../common/utils.less';

.customize {
  .VueCarousel {
    .ignore-parent-padding();
    margin-top: 20px;

    .VueCarousel-dot-container {
      margin-top: 0 !important;
    }

    .VueCarousel-arrow {
      svg path {
        fill: @darkBlue;
      }
    }
  }

  .VueCarousel-slide {
    box-sizing: border-box;
    padding: 5px;
    display: flex;
    flex-direction: column;

    .slide-img {
      margin: auto;
      height: 334px;
      max-width: 100%;
      object-fit: cover;
    }

    caption {
      display: block;
      text-align: center;
      font-family: 'TTCommons', sans-serif;
      font-size: 16px;
      font-style: italic;
    }
  }
}
</style>
