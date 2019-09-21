<template>
  <div class="hair-color-selector">
    <h2>Color</h2>
    <div class="colors">
      <div
        v-for="color in colors"
        class="color-container"
        @click="handlePress(color)"
      >
        <div
          :class="{
            color: true,
            selected: selectedColor === color.presentation,
          }"
        >
          <img :src="getAssetUrl(color)" />
        </div>
        <div class="desc"><strong>Color:</strong> {{ color.presentation }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedColor: undefined,
    }
  },

  // @param {Color[]} colors List of all the available colors
  // @param {(color: string) => void} A callback to handle selection
  props: ['colors', 'onPress'],

  methods: {
    handlePress(color) {
      this.selectedColor = color.presentation
      this.onPress(color)
    },

    getSafeName(color) {
      return color.presentation.replace(/[^a-zA-Z]/g, '_')
    },

    getAssetUrl(color) {
      return (
        'https://projectcurl-assets.s3.amazonaws.com/HairColors/' +
        window.encodeURIComponent(color.presentation) +
        '.png'
      )
    },
  },
}
</script>

<style lang="less" scoped>
@import '../../common/utils.less';

.hair-color-selector {
  h2 {
    font-size: 22px;
    font-weight: bold;
    text-align: center;
    color: @darkBlue;
    margin-bottom: 10px;
    text-transform: none;
  }

  .colors {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 5px;
    margin-top: 10px;

    img {
      width: 100%;
      height: auto;
    }
  }

  .color {
    box-sizing: border-box;
    border: 3px solid transparent;
    line-height: 0;

    img {
      box-sizing: border-box;
      width: 100%;
      height: auto;
      border: 2px solid @lightGray;
    }

    &.selected {
      border: 3px solid @darkBlue;
    }
  }

  .color-container .desc {
    strong {
      color: @darkBlue;
    }

    font-family: 'TTCommons', sans-serif;
    font-size: 14px;
    line-height: normal;
    margin: 0 3px;
  }
}
</style>
