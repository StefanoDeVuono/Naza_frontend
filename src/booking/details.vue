<template>
  <div v-cloak v-if="product">
    <h1>{{ product.name }}</h1>
    <img
      :data-url="CURL_ASSET_ROOT + getImageUrl(product)"
      v-bind:src="CURL_ASSET_ROOT + getImageUrl(product)"
    />
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
        <img
          :data-url="CURL_ASSET_ROOT + getSmallImageUrl(addOn)"
          v-bind:src="CURL_ASSET_ROOT + getSmallImageUrl(addOn)"
        />
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
import { getSpreeServer, getCurlAssetRoot } from '../constants'
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
}
</script>

<style>
[v-cloak] {
  display: none;
}
</style>
