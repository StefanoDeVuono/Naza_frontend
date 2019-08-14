<template>
  <div v-cloak v-if="product">
    <h1>{{ product.name }}</h1>
    <img v-bind:src="CURL_ASSET_ROOT + getImageUrl(product)" />
    <ul>
      <li><strong>Price</strong>: {{ product.display_price }}</li>
      <li><strong>Duration</strong>: {{ getDuration(product) }}</li>
      <li v-for="optionType in product.option_types">
        <ul>
          <li>
            <strong>{{ optionType.presentation }}</strong>
          </li>
          <li v-for="optionValue in optionType.option_values">
            {{ optionValue.presentation }}
          </li>
        </ul>
      </li>
    </ul>

    <div>
      <h2>Add-ons</h2>

      <div v-for="addOn in addOns">
        <h3>{{ addOn.name }}</h3>
        <img v-bind:src="CURL_ASSET_ROOT + getSmallImageUrl(addOn)" />
      </div>
    </div>

    <p>
      <router-link
        @click.native="$event.stopImmediatePropagation()"
        :to="'/categories/' + $route.query.categoryId"
        >Back</router-link
      >
    </p>
  </div>
</template>

<script>
import { SPREE_SERVER, CURL_ASSET_ROOT } from './constants'
import 'whatwg-fetch'
import * as jsonapi from 'jsonapi-parse'
import * as R from 'ramda'

export default {
  data: function() {
    return {
      CURL_ASSET_ROOT,
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
      return R.path(['images', 0, 'styles', 3, 'url'], product)
    },

    getSmallImageUrl: function(product) {
      return R.path(['images', 0, 'styles', 2, 'url'], product)
    },

    getDuration: function(product) {
      var duration = R.compose(
        R.prop('value'),
        R.nth(0),
        R.filter(function(x) {
          return x.name === 'Duration'
        }),
        R.prop('product_properties')
      )(product)
      var hours = duration / 60
      var minutes = duration % 60

      if (minutes > 0) {
        if (hours === 1) {
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

      var path =
        SPREE_SERVER +
        '/products/' +
        productId +
        '?include=images,option_types.option_values,product_properties'
      fetch(path)
        .then(function(response) {
          return response.json()
        })
        .then(
          function(json) {
            this.product = jsonapi.parse(json).data
          }.bind(this)
        )
    },

    fetchAddOns: function() {
      var path = SPREE_SERVER + '/taxons/add-ons?include=products.images'
      fetch(path)
        .then(function(response) {
          return response.json()
        })
        .then(
          function(json) {
            this.addOns = jsonapi.parse(json).data.products
          }.bind(this)
        )
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
  template: '#details-template',
}
</script>

<style>
[v-cloak] {
  display: none;
}
</style>
