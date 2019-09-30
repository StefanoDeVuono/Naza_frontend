<template>
  <div class="add-ons">
    <div class="header">
      <slot name="icon"></slot>
      <h3>{{ title }}</h3>
    </div>

    <div class="products">
      <div
        class="product"
        v-bind:class="{ active: isActive(product.default_variant.id) }"
        v-for="product in products"
      >
        <div class="image-container">
          <img
              @click="onSelect(product)"
              :src="getLargeImageUrl(product)"
          />
        </div>
        <h3>{{ product.name }}</h3>
        <p>{{ product.description }}</p>
        <div
          v-if="parseInt(product.price) > 0"
          class="duration-and-price-wrapper"
        >
          <DurationAndPrice
            :duration="parseInt(product.duration)"
            :price="parseInt(product.price)"
          />
        </div>
      </div>
    </div>

    <slot name="footer"></slot>
  </div>
</template>

<script>
import Storage from 'common/storage'
import { getCurlAssetRoot } from 'common/constants'
import DurationAndPrice from '../components/duration-and-price.vue'
import { path } from 'ramda'

export default {
  data() {
    return {
      CURL_ASSET_ROOT: getCurlAssetRoot(),
    }
  },

  props: {
    testID: String,
    title: String,
    products: Array,
    onSelect: Function,
    isActive: Function,
  },

  methods: {
    getImageUrl(product) {
      return (
        this.CURL_ASSET_ROOT + path(['images', 0, 'styles', 1, 'url'], product)
      )
    },

    getLargeImageUrl(product) {
      return (
        this.CURL_ASSET_ROOT + path(['images', 0, 'styles', 3, 'url'], product)
      )
    },
  },

  components: {
    DurationAndPrice,
  },
}
</script>

<style lang="less">
@import '../../common/utils.less';

.add-ons {
  .ignore-parent-padding();
  .ignore-parent-padding--add-padding(1);

  &:nth-child(odd) {
    background-color: @lightGray;
  }

  .header {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    h3 {
      font-family: 'TTCommons', sans-serif;
      font-size: 18px;
      font-weight: bold;
      color: @darkBlue;
      text-transform: uppercase;
    }

    svg {
      margin-right: 10px;
      transform: translate(0, 8px);
    }
  }

  .products {
    margin-top: 20px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    grid-column-gap: 15px;
    grid-row-gap: 15px;
  }

  .product {
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;

    h3 {
      font-family: 'TTCommons', sans-serif;
      text-align: center;
      color: @orange;
      text-transform: none;
      font-size: 14px;
      margin: 5px 0;
    }

    p {
      text-align: center;
      font-size: 14px;
      margin: 0;
      color: @darkBlue;
    }

    .image-container {
      box-sizing: border-box;
      border: 3px solid transparent;
      line-height: 0;

      img {
        box-sizing: border-box;
        width: 40vw;
        height: 40vw;
        object-fit: cover;
        line-height: 0;
        border: 2px solid @lightGray;
      }

      @media screen and (min-width: 640px) {
        img {
          width: 300px;
          height: 300px;
        }
      }
    }

    &.active .image-container {
      border: 3px solid @darkBlue;
    }

    .duration-and-price-wrapper {
      margin: 0 auto;
    }
  }
}
</style>
