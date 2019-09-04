<template>
  <div v-if="product">
    <Header title="Add-ons" :showBackArrow="true" />

    <RunningTotals />

    <Content :progress-step="4">
      <h2 class="cta">Anything You'd Like To Add?</h2>

      <p class="cta">
        We will grieve not, rather find Strength in what remains behind; In the
        primal sympathy Which having been must ever be
      </p>

      <div class="img-container">
        <img
          :data-url="CURL_ASSET_ROOT + largeImageUrl"
          :src="CURL_ASSET_ROOT + largeImageUrl"
        />
      </div>

      <div class="taxon">
        <h2 class="subheader">Style</h2>
        <h2 class="taxon-name">{{ shared.taxonName }}</h2>
      </div>

      <div class="style">
        <h2 class="subheader">Pattern</h2>
        <h2 class="style-name">{{ shared.product.name }}</h2>
        <p class="style-desc">{{ shared.product.description }}</p>
      </div>
    </Content>
  </div>
</template>

<script>
import { getSpreeServer, getCurlAssetRoot } from 'common/constants'
import Header from '../header.vue'
import Content from '../content.vue'
import 'whatwg-fetch'
import { parse } from 'jsonapi-parse'
import {
  path,
  compose,
  prop,
  nth,
  filter,
  map,
  last,
  sortBy,
  replace,
  isNil,
  join,
  find,
  difference,
  isEmpty,
  reduce,
  flatten,
} from 'ramda'
import RunningTotals from '../running-totals.vue'
import Storage from 'common/storage'

export default {
  data: function() {
    return {
      CURL_ASSET_ROOT: getCurlAssetRoot(),
      shared: Storage.sharedState,
    }
  },

  computed: {
    largeImageUrl: function() {
      return path(['images', 0, 'styles', 3, 'url'], this.shared.product)
    },

    smallImageUrl: function() {
      return path(['images', 0, 'styles', 2, 'url'], this.shared.product)
    },
  },

  methods: {
    fetchAddOns: function() {
      var path = `${getSpreeServer()}/taxons/drink-add-ons?include=products.images`
      fetch(path)
        .then(response => {
          return response.json()
        })
        .then(json => {
          this.drinkAddOns = parse(json).data.products
        })
    },

    fetchData: function() {
      this.fetchAddOns()
    },
  },
  watch: {
    $route: 'fetchData',
  },
  components: {
    Header,
    Content,
    RunningTotals,
  },
}
</script>

<style lang="less">
@import '../../common/utils.less';

h2.cta {
  color: @darkBlue;
  font-weight: bold;
  font-size: 18px;
  letter-spacing: 0.75px;
}

p.cta {
  text-align: center;
  margin-bottom: 1em;
}

h2.subheader {
  text-align: center;
  font-size: 12px;
  color: @darkBlue;
  letter-spacing: 0.5px;
  font-weight: bold;
}

div.taxon {
  margin-top: 40px;
  margin-bottom: 20px;
}

h2.taxon-name {
  font-size: 16px;
  letter-spacing: 0.67px;
  color: @orange;
  text-align: center;
  font-family: utopia-std;
  text-transform: none;
  margin: 0;
}

div.style {
  margin-top: 20px;
  margin-bottom: 40px;
}

h2.style-name {
  font-size: 32px;
  color: @orange;
  letter-spacing: 1.33px;
  font-weight: bold;
  text-align: center;
  font-family: utopia-std;
  text-transform: none;
  margin: 0 auto 20px auto;
}

p.style-desc {
  margin-top: 0;
  font-size: 14px;
  line-height: 1.5;
  letter-spacing: normal;
  text-align: center;
  color: @darkBlue;
}

div.img-container {
  .ignore-parent-padding();
  line-height: 0;
}

div.customizations {
  .ignore-parent-padding();
  .ignore-parent-padding--add-padding(2);

  background-color: @lightGray;
}

div.customization {
  margin-bottom: 40px;
}

.sqs-block-button .sqs-block-button-element {
  display: block;
}
</style>
