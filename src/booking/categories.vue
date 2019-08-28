<template>
  <div>
    <Header
      title="Our Services"
      instructions="That though the radiance which was once so bright be now forever taken from my sight."
      :totalPrice="0"
      :totalDuration="0"
    />
    <LoginCta />
    <Content :progress-step="1">
      <div v-cloak id="categories">
        <div class="cta">
          <h2>What&apos;s Your Style?</h2>
          <p>Choose your style and customize it in the following steps</p>
        </div>

        <div class="image-container" v-for="category in categories">
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
import Content from './content.vue'
import { getSpreeServer, getCurlAssetRoot } from '../constants'
import 'whatwg-fetch'
import { parse } from 'jsonapi-parse'
import { sortBy, reject, prop, compose, path } from 'ramda'
import LoginCta from './login-cta.vue'

export default {
  data: () => {
    return {
      categories: [],
      CURL_ASSET_ROOT: getCurlAssetRoot(),
    }
  },
  methods: {
    getImageUrl: function(category) {
      return path(['image', 'styles', 2, 'url'], category)
    },
    fetchData: function() {
      fetch(
        `${getSpreeServer()}/taxons/hair-styles?include=children.image,children.taxonomy`
      )
        .then(response => {
          return response.json()
        })
        .then(json => {
          this.categories = compose(
            sortBy(prop('position')),
            reject(x => {
              return x.taxonomy.name === x.name
            }),
            path(['data', 'children']),
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
    LoginCta,
  },
}
</script>

<style>
[v-cloak] {
  display: none;
}

.cta {
  text-align: center;
  margin-bottom: 40px;
  line-height: 24px;
  color: #1c3042;
}

#categories {
  margin-bottom: 100px;
}

.image-container {
  line-height: 0;
  margin-bottom: 4px;
}

a {
  margin: 0;
  padding: 0;
}

img {
  width: 100%;
  height: auto;
}
</style>
