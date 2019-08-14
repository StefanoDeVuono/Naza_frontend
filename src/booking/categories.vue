<template>
  <div v-cloak id="categories">
    <div v-for="category in categories">
      <h3>{{ category.name }}</h3>
      <router-link
        @click.native="$event.stopImmediatePropagation()"
        :to="{ name: 'styles', params: { categoryId: category.id } }"
      >
        <img v-bind:src="CURL_ASSET_ROOT + getImageUrl(category)" />
      </router-link>
      <hr />
    </div>
  </div>
</template>

<script>
import { SPREE_SERVER, CURL_ASSET_ROOT } from '../constants'
import 'whatwg-fetch'
import * as jsonapi from 'jsonapi-parse'
import * as R from 'ramda'

export default {
  data: () => {
    return { categories: [], CURL_ASSET_ROOT }
  },
  methods: {
    getImageUrl: function(category) {
      return R.path(['image', 'styles', 2, 'url'], category)
    },
    fetchData: function() {
      fetch(`${SPREE_SERVER}/taxons?include=image,taxonomy&roots=true`)
        .then(response => {
          return response.json()
        })
        .then(json => {
          this.categories = R.compose(
            R.sortBy(R.prop('name')),
            R.reject(x => {
              return x.taxonomy.name === x.name
            }),
            R.prop('data'),
            jsonapi.parse
          )(json)
        })
    },
  },
  created: function() {
    this.fetchData()
  },
  template: '#categories-template',
}
</script>

<style>
[v-cloak] {
  display: none;
}
</style>
