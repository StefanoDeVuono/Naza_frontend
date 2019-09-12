<template>
  <div>
    <Header
      title="Our Services"
      instructions="That though the radiance which was once so bright be now forever taken from my sight."
      :showBackArrow="true"
      :totalPrice="totalPrice"
      :totalDuration="totalDuration"
    />

    <Content :progress-step="2">
      <div>
        <h2 class="cta">Be More Specific...</h2>

        <p class="cta">
          Because the lovely little flower is free down to its root, and in that
          freedom bold.
        </p>
      </div>

      <div
        class="category"
        v-for="(styles, subcategory) in stylesBySubcategory"
      >
        <h1 class="subcategory">{{ subcategory }}</h1>
        <div
          class="option"
          v-for="style in styles"
          @click="activateSubcategory(style.id)"
        >
          <img
            :data-url="CURL_ASSET_ROOT + getImageUrl(style)"
            :src="CURL_ASSET_ROOT + getImageUrl(style)"
          />
          <div class="description">
            <h2>{{ style.name }}</h2>
            <p class="trunc-desc" v-show="truncatedDescs[style.id]">
              {{ truncatedDesc(style.description) }}
              <span @click="expandDesc(style.id)" class="expand-desc"
                >more</span
              >
            </p>
            <p class="full-desc" v-show="fullDescs[style.id]">
              {{ style.description }}
            </p>
            <DurationAndPrice :duration="totalDuration" :price="totalPrice" />
          </div>
          <div
            v-show="activeSubcategory === style.id"
            class="select-this-style"
          >
            <div class="sqs-block-button sqs-block button-block">
              <div class="sqs-block-button-content sqs-block-content">
                <div class="sqs-block-button-container--center">
                  <router-link
                    @click.native="$event.stopImmediatePropagation()"
                    :to="{
                      name: 'customize',
                      params: { productId: style.id },
                      query: { categoryId: $route.params.categoryId },
                    }"
                  >
                    <div
                      class="sqs-block-button-element--medium sqs-block-button-element"
                    >
                      Select This Style
                    </div>
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Content>
  </div>
</template>

<script>
import Header from '../components/header.vue'
import Content from '../components/content.vue'
import DurationAndPrice from '../components/duration-and-price.vue'
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
      console.log('expanding', id)
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
    DurationAndPrice,
  },
}
</script>

<style lang="less">
@import '../../common/utils.less';

[v-cloak] {
  display: none;
}

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
  .ignore-parent-padding--add-padding(0.5);
}

.category:nth-child(odd) {
  background-color: #f7f6f2;
}

h1.subcategory {
  text-align: center;
  font-size: 32px;
  line-height: normal;
  letter-spacing: 0.92px;
  margin: 20px 0;
  color: @darkBlue;
}

div.option {
  margin-bottom: 60px;
  line-height: 0;
  border: 2px solid @darkBlue;

  img {
    margin-bottom: 10px;
  }

  .description {
    padding: 10px;
  }

  svg {
    transform: translate(0, 2px);
  }

  h2 {
    font-size: 18px;
    line-height: 18px;
    letter-spacing: 0.75px;
    text-transform: none;
    text-align: center;
    color: #bc5940;
    font-weight: bold;
    margin-bottom: 5px;
  }

  p {
    font-size: 12px;
    line-height: normal;
    letter-spacing: 0.5px;
    margin-bottom: 10px;
    text-align: center;
  }

  .expand-desc {
    color: rgba(28, 48, 66, 0.56);
  }

  .select-this-style {
    margin: 10px 20px;
  }
}
</style>
