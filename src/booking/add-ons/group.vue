<template>
  <div class="add-ons">
    <div class="header">
      <slot name="icon"></slot>
      <h2>{{ title }}</h2>
    </div>

    <div class="products">
      <div
        class="product"
        v-bind:class="{ active: isActive(product.default_variant.id) }"
        v-for="product in products"
      >
        <img @click="onSelect(product)" :src="getImageUrl(product)" />
        <h2>{{ product.name }}</h2>
        <p>{{ product.description }}</p>
        <div class="duration-and-price-wrapper">
          <DurationAndPrice
            :duration="parseInt(product.duration || 0)"
            :price="parseInt(product.price || 0)"
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

    h2 {
      font-size: 22px;
      font-weight: bold;
      color: @darkBlue;
      text-transform: none;
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

    h2 {
      text-align: center;
      color: @orange;
      text-transform: none;
      font-size: 14px;
      margin: 5px 0;
    }

    p {
      text-align: center;
      font-size: 12px;
      margin: 0;
      color: @darkBlue;
    }

    svg {
      transform: translate(0, -2px);
    }

    img {
      width: 100%;
      height: calc(50vw - 30px);
      object-fit: cover;
      line-height: 0;
      border: 3px solid @darkBlue;
    }

    &.active img {
      border: 3px solid @orange;
    }

    .duration-and-price-wrapper {
      width: 80%;
      margin: 0 auto;
    }
  }
}
</style>
