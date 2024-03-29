<template>
  <div>
    <InfoHeader />
    <Content :progressStep="1">
      <div v-cloak class="categories">
        <StepHeader
          stepTitle="Step One"
          imageUrl="https://s3.amazonaws.com/projectcurl-assets/HowItWorks/step1.png"
          ctaText="Select one of the options below"
        />
        <Carousel
          ref="carousel"
          :perPageCustom="[
            [0, 1],
            [640, 2],
          ]"
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
                <h1 class="category-name">{{ category.name }}</h1>
                <p class="category-description">
                  {{ category.meta_description }}
                </p>
                <SqButton
                  :inverted="true"
                  label="Select This Style &rarr;"
                  :onClick="
                    () => {
                      handleClick(category.id)
                    }
                  "
                />
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
import { parse } from 'jsonapi-parse'
import { sortBy, reject, prop, compose, path } from 'ramda'
import InfoHeader from './info-header.vue'
import { Carousel, Slide } from 'vue-carousel'
import CustomCarouselPaginator from '../components/custom-carousel-paginator.vue'
import SqButton from 'common/sq-button.vue'

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
    handleClick(categoryId) {
      this.$router.push({
        name: 'subcategories',
        params: { categoryId },
      })
    },
  },
  created: function() {
    this.fetchData()
  },
  components: {
    Header,
    Content,
    InfoHeader,
    CustomCarouselPaginator,
    StepHeader,
    Carousel,
    Slide,
    SqButton,
  },
}
</script>

<style lang="less" scoped>
@import '../../common/utils.less';

[v-cloak] {
  display: none;
}

.categories {
  .ignore-parent-padding();
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

.category-name {
  font-size: 26px;
  letter-spacing: 1.3px;
  text-align: center;
  color: white;
  margin-bottom: 10px;
}

.category-description {
  margin-bottom: 20px;
  font-size: 14px;
  text-align: center;
  color: white;
  line-height: normal;
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
</style>

<style lang="less">
@import '../../common/utils.less';

.categories {
  .VueCarousel-slide {
    box-sizing: border-box;

    .image-container {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    img {
      margin: auto;
      height: 334px;
      width: 100%;
      max-width: 260px;
      object-fit: cover;
    }
  }

  .VueCarousel-arrow svg path {
    fill: @darkBlue;
  }
}
</style>
