<template>
  <div>
    <LoginCta />
    <Content :progress-step="1">
      <div v-cloak class="categories">
        <StepHeader
          stepTitle="Step One"
          imageUrl="assets/categories/cta-header@3x.png"
          ctaText="Select one of the options below"
        />
        <Carousel
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

          <Slide
            class="category-container"
            v-for="category in categories"
            v-bind:key="category.id"
          >
            <div class="category-container-inner">
              <div class="image-container">
                <img
                  :alt="category.name"
                  :data-src="CURL_ASSET_ROOT + getImageUrl(category)"
                  v-bind:src="CURL_ASSET_ROOT + getImageUrl(category)"
                />
              </div>
              <div class="category-details-container">
                <div class="category-name">
                  <h1>{{ category.name }}</h1>
                </div>
                <div class="category-description">
                  <span>{{ category.meta_description }}</span>
                </div>
                <router-link
                  @click.native="$event.stopImmediatePropagation()"
                  :to="{
                    name: 'subcategories',
                    params: { categoryId: category.id },
                  }"
                >
                  <div class="category-select">
                    <span>
                      Select This Style <span class="select-arrow">&rarr;</span>
                    </span>
                  </div>
                </router-link>
              </div>
            </div>
          </Slide>
        </Carousel>
      </div>
    </Content>
  </div>
</template>

<script>
import Header from '../components/header.vue'
import StepHeader from '../components/step-header.vue'
import Content from '../components/content.vue'
import { getSpreeServer, getCurlAssetRoot } from 'common/constants'
import 'whatwg-fetch'
import { Carousel, Slide } from 'vue-carousel'
import { parse } from 'jsonapi-parse'
import { sortBy, reject, prop, compose, path } from 'ramda'
import LoginCta from './login-cta.vue'
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
    CustomCarouselPaginator,
    StepHeader,
    Carousel,
    Slide,
  },
}
</script>

<style lang="less" scoped>
@import '../../common/utils.less';

[v-cloak] {
  display: none;
}

.categories {
  margin-bottom: 37px;

  .VueCarousel-arrow-icon path {
    fill: @darkBlue;
  }
}

.image-container {
  margin-bottom: 20px;

  img {
    width: 100%;
    height: auto;
  }
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
  line-height: normal;
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
