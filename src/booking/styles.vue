<template>
  <div v-cloak id="styles">
    <p>
      <router-link
        @click.native="$event.stopImmediatePropagation()"
        to="/categories"
        >Back</router-link
      >
    </p>
    <div v-for="(styles, subcategory) in stylesBySubcategory">
      <h2>{{ subcategory }}</h2>
      <div v-for="style in styles">
        <h3>{{ style.name }}</h3>
        <router-link
          @click.native="$event.stopImmediatePropagation()"
          :to="{
            name: 'details',
            params: { productId: style.id },
            query: { categoryId: $route.params.categoryId },
          }"
        >
          <img
            :data-url="CURL_ASSET_ROOT + getImageUrl(style)"
            v-bind:src="CURL_ASSET_ROOT + getImageUrl(style)"
          />
        </router-link>
      </div>
      <hr />
    </div>
  </div>
</template>

<script>
import { getSpreeServer, getCurlAssetRoot } from '../constants'
import 'whatwg-fetch'
import { parse } from 'jsonapi-parse'
import { groupBy, prop, compose, nth, sortBy, path } from 'ramda'

export default {
  data: () => {
    return {
      CURL_ASSET_ROOT: getCurlAssetRoot(),
      stylesBySubcategory: {},
    }
  },
  methods: {
    fetchData: function() {
      var categoryId = this.$route.params.categoryId
      if (!categoryId) {
        return
      }

      var path = `${getSpreeServer()}/products?include=images,taxons&filter[taxons]=${categoryId}`
      fetch(path)
        .then(response => {
          return response.json()
        })
        .then(json => {
          this.stylesBySubcategory = compose(
            groupBy(x => {
              return this.getSubcategory(x)
            }),
            prop('data'),
            parse
          )(json)
        })
    },
    getSubcategory: function(style) {
      return compose(
        prop('name'),
        nth(0),
        sortBy(x => {
          return !x.is_root
        })
      )(style.taxons)
    },
    getImageUrl: function(style) {
      return path(['images', 0, 'styles', 2, 'url'], style)
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
