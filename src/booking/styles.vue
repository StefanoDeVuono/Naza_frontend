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
        <h2 class="subcategory">{{ subcategory }}</h2>
        <div class="option" v-for="style in styles">
          <router-link
            @click.native="$event.stopImmediatePropagation()"
            :to="{
              name: 'customize',
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
            <DurationAndPrice :duration="totalDuration" :price="totalPrice" />
          </div>
        </div>
      </div>
    </Content>
  </div>
</template>

<script>
import Header from './header.vue'
import Content from './content.vue'
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
} from 'ramda'
import DurationAndPrice from './duration-and-price.vue'

// TODO: update json files

export default {
  data: () => {
    return {
      CURL_ASSET_ROOT: getCurlAssetRoot(),
      stylesBySubcategory: {},
      totalPrice: 0,
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
    getSubcategory: function(style) {
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
    DurationAndPrice,
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
}

.category {
  .ignore-parent-padding();
  .ignore-parent-padding--add-padding(0.5);
}

.category:nth-child(even) {
  background-color: #f7f6f2;
}

h2.subcategory {
  text-align: center;
  font-size: 22px;
  line-height: normal;
  letter-spacing: 0.92px;
  margin: 40px 0;
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
  line-height: normal;
  letter-spacing: 0.5px;
  margin-bottom: 10px;
}
</style>
