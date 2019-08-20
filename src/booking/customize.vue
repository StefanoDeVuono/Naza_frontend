<template>
  <div>
    <Header title="Customizations" instructions="Though nothing can bring back the hour; Of splendor in the grass, of glory in the flower" :totalCost="0" :totalDuration="0" :showBackArrow="true" />

    <Content :progress-step="3">
      <h2 class="cta">Make it Your Style</h2>

      <p class="cta">We will grieve not, rather find Strength in what remains behind; In the primal sympathy Which having been must ever be</p>

      <ArrowDownIcon />

      <div v-if="product" class="img-container">
        <img
          :data-url="CURL_ASSET_ROOT + getImageUrl(product)"
          :src="CURL_ASSET_ROOT + getImageUrl(product)"
        />
      </div>
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
  import { path, compose, prop, nth, filter } from 'ramda'

  export default {
    data: () => {
      return {
        CURL_ASSET_ROOT: getCurlAssetRoot(),
        product: undefined,
        addOns: undefined,
        state: {
          selectedAddOns: new Set(),
        },
      }
    },

    props: ['categoryId'],
    methods: {
      getImageUrl: function(product) {
        return path(['images', 0, 'styles', 3, 'url'], product)
      },

      getSmallImageUrl: function(product) {
        return path(['images', 0, 'styles', 2, 'url'], product)
      },

      getDuration: function(product) {
        var duration = compose(
          prop('value'),
          nth(0),
          filter(x => {
            return x.name === 'Duration'
          }),
          prop('product_properties')
        )(product)
        var hours = Math.floor(duration / 60)
        var minutes = duration % 60

        if (minutes > 0) {
          if (hours === 0) {
            return minutes + ' minutes'
          } else if (hours === 1) {
            return '1 hour ' + minutes + ' minutes'
          } else {
            return hours + ' hours ' + minutes + ' minutes'
          }
        }

        if (hours === 1) {
          return '1 hour'
        } else {
          return hours + ' hours'
        }
      },

      fetchStyles: function() {
        var productId = this.$route.params.productId
        if (!productId) {
          return
        }

        var path = `${getSpreeServer()}/products/${productId}?include=images,option_types.option_values,product_properties`
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

      fetchData: function() {
        this.fetchStyles()
        this.fetchAddOns()
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
      ArrowDownIcon
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
</style>
