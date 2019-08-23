<template>
  <div class="hair-color-selector">
    <h2>Color</h2>
    <div class="colors">
      <div v-for="color in colors">
        <input
          type="radio"
          :id="color.presentation + '-' + getSafeName(color)"
          :value="color.presentation"
          name="color"
          v-model="localValue"
        />
        <label :for="color.presentation + '-' + getSafeName(color)"
          ><img :src="getAssetPath(color)"
        /></label>
      </div>
    </div>
    <div class="selected-color" v-show="selectedColor">
      <strong>Your Choice:</strong> {{ selectedColor }}
    </div>
  </div>
</template>

<script>
export default {
  // @param {Color[]} colors List of all the available colors
  // @param {string} selectedColor The currently selected color
  // @param {(color: string) => void} A callback to handle selection
  props: ['colors', 'selectedColor', 'onPress'],

  methods: {
    getSafeName: function(color) {
      return color.presentation.replace(/[^a-zA-Z]/g, '_')
    },
    getAssetPath: function(color) {
      const filename = color.presentation.replace(/[^a-zA-Z]/g, '_')
      return `/assets/hair-colors/${filename}.jpeg`
    },
  },

  computed: {
    localValue: {
      get() {
        return this.value
      },
      set(x) {
        this.onPress(x)
      },
    },
  },
}
</script>

<style lang="less">
@darkBlue: #1c3042;
@selection: #bc5940;

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
    grid-template-columns: repeat(5, 1fr);
    grid-gap: 15px;
    margin-top: 25px;

    img {
      width: 43px;
      height: 43px;
      border-radius: 50%;
      border: 3px solid transparent;
    }

    input[type='radio'] {
      opacity: 0;
      position: fixed;
      width: 0;

      &:checked + label img,
      &:focus + label img {
        border: 3px solid @selection;
      }
    }
  }

  .selected-color {
    font-size: 14px;
    color: @darkBlue;
    text-align: center;
  }
}
</style>
