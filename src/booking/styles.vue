<template>
  <div>
    <Header
      :showBackArrow="true"
      :totalCost="totalCost"
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

      <div class="category" v-for="(styles, subcategory) in stylesBySubcategory">
        <h2 class="subcategory">{{ subcategory }}</h2>
        <div class="option" v-for="style in styles">
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
              :src="CURL_ASSET_ROOT + getImageUrl(style)"
            />
          </router-link>
          <div>
            <h2 class="option">{{ style.name }}</h2>
            <p class="option">{{ style.description }}</p>
            <DurationAndCost :duration="totalDuration" :cost="totalCost" />
          </div>
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
import DurationAndCost from './duration-and-cost.vue'

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
        nth(1),
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
    DurationAndCost,
  },
}
</script>

<style lang="less">
@import '../common/utils.less';

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
  margin-bottom: 40px;
}

.category {
  .ignore-parent-padding();
  .ignore-parent-padding--add-padding(1);
}

.category:nth-child(even) {
  background-color: #f7f6f2;
}

h2.subcategory {
  text-align: center;
  font-size: 22px;
  line-height: 0.41;
  letter-spacing: 0.92px;
  margin: 60px 0;
}

div.option {
  margin-bottom: 60px;
  line-height: 0;

  img {
    margin-bottom: 10px;
  }
}

h2.option {
  font-size: 18px;
  line-height: 18px;
  letter-spacing: 0.75px;
  text-transform: none;
  color: #bc5940;
  font-weight: bold;
  margin-bottom: 5px;
}

p.option {
  font-size: 12px;
  line-height: 1;
  letter-spacing: 0.5px;
  margin-bottom: 10px;
}
</style>
