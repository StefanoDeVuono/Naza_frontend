<template>
  <div>
    <LoginCta />
    <Content :progress-step="1">
      <div v-cloak class="categories">
        <div class="cta">
          <div class="cta-subheader"><span>Step One</span></div>
          <div class="cta-header-container">
            <div class="cta-header">
              <img alt="Pick Your Style"
                   src="assets/categories/cta-header@3x.png"
              >
            </div>
          </div>
          <div class="cta-text"><h2>Select one of the options below</h2></div>
        </div>

        <carousel
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

          <slide class="category-container" v-for="category in categories" v-bind:key="category.id">
            <div class="category-container-inner">
              <div class="image-container">
                  <img
                          :alt="category.name"
                          :data-src="CURL_ASSET_ROOT + getImageUrl(category)"
                          v-bind:src="CURL_ASSET_ROOT + getImageUrl(category)"
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
import CustomCarouselPaginator from '../components/custom-carousel-paginator.vue'

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
    Slide,
    CustomCarouselPaginator,
  },
}
</script>

<style lang="less">
  @import '../../common/utils.less';

  [v-cloak] {
    display: none;
  }

  .cta {
    text-align: center;
    margin-right: 20px;
    margin-left: 20px;
    margin-bottom: 40px;
    line-height: 24px;
    color: @darkBlue;
  }

  .cta-subheader {
    font-size: 14px;
    font-weight: bold;
    letter-spacing: 0.89px;
    color: @orange;
    text-transform: uppercase;
    margin-bottom: 10px;
  }

  .cta-header-container {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
  }

  .cta-header {
    width: 122px;
  }

  .cta-text h2 {
    height: 24px;
    font-size: 18px;
    font-weight: normal;
    letter-spacing: .53px;
  }

  .categories {
    margin-bottom: 37px;

    .VueCarousel-arrow-icon path {
      fill: @darkBlue
    }
  }

  .image-container {
    margin-bottom: 20px;
  }

  img {
    width: 100%;
    height: auto;
  }

  .category-container {
    display: flex;
    justify-content: center;
    padding: 0 10px;
  }

  .category-container-inner {
    padding: 12px;
    background-color: @darkBlue;
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
    line-height: 1.29;
    text-align: center;
    color: #ffffff;
  }

  .category-select {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 40px;
    font-size: 12px;
    font-weight: bold;
    letter-spacing: 0.26px;
    text-align: center;
    color: @darkBlue;
    background-color: #ffffff;
    text-transform: uppercase;
  }

  .VueCarousel {
    .ignore-parent-padding();
  }

  .VueCarousel-slide {
    box-sizing: border-box;

    img {
      margin: auto;
      height: 334px;
      width: 100%;
      object-fit: cover;
    }
  }
</style>
