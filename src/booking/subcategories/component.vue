<template>
  <div class="subcategories">
    <LightHeader
      :showBackArrow="true"
      :totalPrice="totalPrice"
      :totalDuration="totalDuration"
    />

    <Content :progressStep="2">
      <StepHeader
        stepTitle="Step Two"
        imageUrl="https://s3.amazonaws.com/projectcurl-assets/HowItWorks/step2.png"
        ctaText="Select one of the options below"
      />

      <div
        :class="{ category: true, closed: closedSections[subcategory] }"
        v-for="(styles, subcategory) in stylesBySubcategory"
      >
        <h1 class="subcategory" @click="toggleSection(subcategory)">
          {{ subcategory }}
          <ChevronDownIcon v-show="!closedSections[subcategory]" :size="24" />
          <ChevronRightIcon v-show="closedSections[subcategory]" :size="24" />
        </h1>

        <Carousel
          v-show="!closedSections[subcategory]"
          :ref="'carousel' + subcategory"
          :perPageCustom="[[0, 1], [640, 2]]"
          :centerMode="true"
          :paginationPadding="5"
          :spacePadding="60"
          paginationColor="rgba(28, 48, 66, 0.4)"
          paginationActiveColor="#bc4940"
        >
          <template v-slot:pagination>
            <CustomCarouselPaginator
              @paginationclick="goToPage(subcategory, $event)"
            />
          </template>

          <Slide :key="style.name" v-for="style in styles">
            <div class="container">
              <div class="slide">
                <div class="image-container">
                  <img
                    :data-url="CURL_ASSET_ROOT + getImageUrl(style)"
                    :src="CURL_ASSET_ROOT + getImageUrl(style)"
                  />
                </div>
                <div class="description">
                  <h2>{{ style.name }}</h2>
                  <p class="full-desc">
                    {{ style.description }}
                  </p>
                  <DurationAndPrice
                    :duration="totalDuration"
                    :price="totalPrice"
                  />
                </div>
                <SqButton
                  :inverted="true"
                  label="Select This Style &rarr;"
                  :onClick="
                    () => {
                      handleClick(style)
                    }
                  "
                >
                </SqButton>
              </div>
            </div>
          </Slide>
        </Carousel>
      </div>
    </Content>
  </div>
</template>

<script>
import StepHeader from '../components/step-header.vue'
import LightHeader from '../components/light-header.vue'
import Content from '../components/content.vue'
import DurationAndPrice from '../components/duration-and-price.vue'
import CustomCarouselPaginator from '../components/custom-carousel-paginator.vue'
import SqButton from 'common/sq-button.vue'
import { getSpreeServer, getCurlAssetRoot } from 'common/constants'
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
  reduce,
  min,
  slice,
  forEach,
  flatten,
} from 'ramda'
import { Slide, Carousel } from 'vue-carousel'
import ChevronDownIcon from 'vue-material-design-icons/ChevronDown.vue'
import ChevronRightIcon from 'vue-material-design-icons/ChevronRight.vue'

// TODO: update json files

export default {
  data: () => {
    return {
      CURL_ASSET_ROOT: getCurlAssetRoot(),
      stylesBySubcategory: {},
      totalPrice: 0,
      totalDuration: 0,
      truncatedDescs: {},
      fullDescs: {},
      activeSubcategory: undefined,
      closedSections: {},
    }
  },
  methods: {
    fetchData() {
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

          compose(
            forEach(style => {
              this.$set(this.truncatedDescs, style.id, true)
              this.$set(this.fullDescs, style.id, false)
            }),
            flatten,
            values
          )(this.stylesBySubcategory)

          this.totalPrice = compose(
            reduce(min, Infinity),
            map(x => parseInt(x.price)),
            nth(0),
            values
          )(this.stylesBySubcategory)

          this.totalDuration = compose(
            reduce(min, Infinity),
            map(x => parseInt(x.duration)),
            nth(0),
            values
          )(this.stylesBySubcategory)
        })
    },

    expandDesc(id) {
      this.$set(this.truncatedDescs, id, false)
      this.$set(this.fullDescs, id, true)
    },

    activateSubcategory(id) {
      this.activeSubcategory = id
    },

    truncatedDesc(desc) {
      return slice(0, 35, desc) + '...'
    },

    getSubcategory(style) {
      const subcategory = compose(
        prop('name'),
        nth(1),
        sortBy(x => {
          return !x.is_root
        })
      )(style.taxons)

      if (subcategory) {
        return subcategory
      }

      // some of these aren't nested
      return compose(
        prop('name'),
        nth(0),
        sortBy(x => {
          return !x.is_root
        })
      )(style.taxons)
    },

    getImageUrl(style) {
      return path(['images', 0, 'styles', 2, 'url'], style)
    },

    goToPage(subcategory, $event) {
      this.$refs['carousel' + subcategory][0].goToPage($event, 'pagination')
    },

    toggleSection(subcategoryId) {
      this.$set(
        this.closedSections,
        subcategoryId,
        !this.closedSections[subcategoryId]
      )
    },

    handleClick(style) {
      this.$router.push({
        name: 'customize',
        params: { productId: style.id },
        query: { categoryId: this.$route.params.categoryId },
      })
    },
  },
  watch: {
    $route: 'fetchData',
  },
  created() {
    this.fetchData()
  },
  components: {
    LightHeader,
    Content,
    DurationAndPrice,
    StepHeader,
    CustomCarouselPaginator,
    SqButton,
    Carousel,
    Slide,
    ChevronDownIcon,
    ChevronRightIcon,
  },
}
</script>

<style lang="less" scoped>
@import '../../common/utils.less';

[v-cloak] {
  display: none;
}

.subcategories {
  h2.cta {
    text-transform: uppercase;
    font-size: 18px;
    letter-spacing: 0.75px;
    margin-bottom: 10px;
  }

  p.cta {
    text-align: center;
  }

  .category {
    .ignore-parent-padding();

    &.closed {
      border-bottom: 1px solid @darkBlue;

      &:last-child {
        border-bottom: none;
      }
    }

    &:nth-child(3n + 0) .slide {
      background-color: @tan;

      h2,
      p {
        color: @darkBlue;
      }

      .duration-and-price {
        color: @darkBlue;

        .divider {
          border-left: 1px solid @darkBlue;
        }

        svg path {
          fill: @darkBlue;
        }
      }
    }

    &:nth-child(3n + 1) .slide {
      background-color: @darkBlue;
    }

    &:nth-child(3n + 2) .slide {
      background-color: @brown;
    }
  }

  .subcategory {
    text-align: center;
    font-size: 32px;
    line-height: normal;
    letter-spacing: 0.92px;
    margin: 20px 0;
    font-weight: 400;
  }
}
</style>

<style lang="less">
@import '../../common/utils.less';

.subcategories {
  .category {
    &:nth-child(3n + 0) .slide {
      .duration-and-price {
        label {
          color: @darkBlue;
        }

        .divider {
          border-left: 1px solid @darkBlue;
        }

        svg path {
          fill: @darkBlue;
        }
      }
    }
  }

  .VueCarousel-slide {
    box-sizing: border-box;
    color: white;

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

    .container {
      padding: 5px;
    }

    .slide {
      padding: 10px;

      img {
        margin-bottom: 10px;
      }

      svg {
        transform: translate(0, 2px);
      }

      h2 {
        font-size: 26px;
        letter-spacing: 0.76px;
        text-transform: none;
        text-align: center;
        margin-bottom: 5px;
        color: white;
      }

      p {
        font-size: 14px;
        line-height: normal;
        letter-spacing: 0.5px;
        margin-bottom: 10px;
        text-align: center;
      }

      .select-this-style {
        margin: 10px 20px;
      }

      .duration-and-price {
        label {
          color: white;
          font-weight: 500;
        }

        .divider {
          border-left: 1px solid white;
        }
      }
    }
  }

  .VueCarousel-arrow svg path {
    fill: @darkBlue;
  }
}
</style>
