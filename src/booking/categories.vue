<template>
  <div>
    <Header />
    <Content progress-step="1">
      <div v-cloak id="categories">
        <div class="cta">
          <h2>What&apos;s Your Style?</h2>
          <p>Choose your style and customize it in the following steps</p>
        </div>

        <div v-for="category in categories">
          <router-link
            @click.native="$event.stopImmediatePropagation()"
            :to="{ name: 'styles', params: { categoryId: category.id } }"
          >
            <img
              :alt="category.name"
              :data-src="CURL_ASSET_ROOT + getImageUrl(category)"
              v-bind:src="CURL_ASSET_ROOT + getImageUrl(category)"
            />
          </router-link>
        </div>
      </div>
    </Content>
  </div>
</template>

<script>
import Header from './header.vue'
import { getSpreeServer, getCurlAssetRoot } from '../constants'
import 'whatwg-fetch'
import { parse } from 'jsonapi-parse'
import { sortBy, reject, prop, compose, path } from 'ramda'
import Content from './content.vue'

export default {
  data: () => {
    return { categories: [], CURL_ASSET_ROOT: getCurlAssetRoot() }
  },
  methods: {
    getImageUrl: function(category) {
      return path(['image', 'styles', 2, 'url'], category)
    },
    fetchData: function() {
      fetch(`${getSpreeServer()}/taxons?include=image,taxonomy&roots=true`)
        .then(response => {
          return response.json()
        })
        .then(json => {
          this.categories = compose(
            sortBy(prop('name')),
            reject(x => {
              return x.taxonomy.name === x.name
            }),
            prop('data'),
            parse
          )(json)
        })
    },
  },
  created: function() {
    this.fetchData()
  },
  components: {
    Header,
    Content,
  }
}
</script>

<style>
[v-cloak] {
  display: none;
}

.cta {
  text-align: center;
  margin-bottom: 40px;
}

img {
  width: 100%;
  height: auto;
}
</style>
