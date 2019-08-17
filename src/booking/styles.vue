<template>
  <div>
    <Header
      :showBackArrow="true"
      :totalCost="totalCost"
      :totalDuration="totalDuration"
    />

    <Content :progress-step="2">
      <div v-for="(styles, subcategory) in stylesBySubcategory">
        <h2>{{ subcategory }}</h2>
        <div v-for="style in styles">
          <h3>{{ style.name }} - {{ style.display_price }}</h3>
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
      </div>
    </Content>
  </div>
</template>

<script>
import Header from './header.vue'
import Content from './content.vue'
import { getSpreeServer, getCurlAssetRoot } from '../constants'
import 'whatwg-fetch'
import { parse } from 'jsonapi-parse'
import {
  groupBy,
  prop,
  propEq,
  compose,
  nth,
  find,
  sortBy,
  path,
  values,
  map,
  median,
} from 'ramda'

// TODO: update json files

export default {
  data: () => {
    return {
      CURL_ASSET_ROOT: getCurlAssetRoot(),
      stylesBySubcategory: {},
      totalCost: 0,
      totalDuration: 0,
    }
  },
  methods: {
    fetchData: function() {
      var categoryId = this.$route.params.categoryId
      if (!categoryId) {
        return
      }

      var path = `${getSpreeServer()}/products?include=images,taxons,product_properties&filter[taxons]=${categoryId}`
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

          this.totalCost = compose(
            median,
            map(x => parseInt(x.price)),
            nth(0),
            values
          )(this.stylesBySubcategory)

          this.totalDuration = compose(
            median,
            map(x => parseInt(x.value)),
            map(x => find(propEq('name', 'Duration'))(x.product_properties)),
            nth(0),
            values
          )(this.stylesBySubcategory)
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
  components: {
    Header,
    Content,
  },
}
</script>

<style>
[v-cloak] {
  display: none;
}
</style>
