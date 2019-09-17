<template>
  <div>
    <Header
      title="Our Services"
      instructions="That though the radiance which was once so bright be now forever taken from my sight."
      :totalPrice="0"
      :totalDuration="0"
    />
    <LoginCta />
    <Content :progress-step="1" >
      <div v-cloak id="categories">
        <div class="cta">
          <h2>What&rsquo;s Your Style?</h2>
          <p>Choose your style and customize it in the following steps</p>
        </div>

          <carousel :perPage="1" :centerMode="true">
            <slide class="category-container" v-for="category in categories">
              <div class="category-container-inner">
                <div class="image-container">
                    <img
                            :alt="categories[0].name"
                            :src="`assets/categories/group-6@3x.png`"
                    />
                </div>
                <div class="category-details-container">
                  <div class="category-name"><h1>{{category.name}}</h1></div>
                  <div class="category-description"><span>{{category.meta_description}}</span></div>
                    <router-link
                            @click.native="$event.stopImmediatePropagation()"
                            :to="{ name: 'subcategories', params: { categoryId: category.id } }"
                    >
                        <div class="category-select">
                            <span>
                              Select This Style <span class="select-arrow">&rarr;</span>
                            </span>
                        </div>
                    </router-link>

                </div>
              </div>
            </slide>
          </carousel>
        </div>
    </Content>
  </div>
</template>

<script>
import Header from '../components/header.vue'
import Content from '../components/content.vue'
import { getSpreeServer, getCurlAssetRoot } from 'common/constants'
import 'whatwg-fetch'
import { parse } from 'jsonapi-parse'
import { sortBy, reject, prop, compose, path } from 'ramda'
import LoginCta from './login-cta.vue'
import { Carousel, Slide } from 'vue-carousel';

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
    Carousel,
    Slide
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
    margin-bottom: 20px;
  }

  img {
    width: 100%;
    height: auto;
  }

  .category-container {
    background-color: #1c3042;
    display: flex;
    justify-content: center;
  }

  .category-container-inner {
    padding: 12px;
  }

  .category-details-container {
    margin-right: 10px;
    margin-left: 10px;
  }

  .category-name h1 {
    letter-spacing: 1.3px;
    text-align: center;
    color: #ffffff;
    margin-bottom: 10px;
  }

  .category-description {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 63px;
    margin-bottom: 20px;
    font-size: 14px;
    line-height: 1.5;
    text-align: center;
    color: #ffffff;
  }

  .category-select {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 40px;
    font-size: 14px;
    font-weight: bold;
    letter-spacing: 0.15px;
    text-align: center;
    color: #1c3042;
    background-color: #ffffff;
    text-transform: uppercase;
  }
</style>
