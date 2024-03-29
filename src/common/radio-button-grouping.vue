<template>
  <div class="radio-button-grouping">
    <div class="header">
      <h2>
        Select {{ name }}
        <HelpCircleOutlineIcon v-if="showHelp" @click="expandHelp" />
      </h2>
      <div class="supplemental-price" v-show="supplementalPrice">
        + {{ supplementalPrice }}
      </div>
    </div>

    <div v-show="isDescriptionVisible" class="description">
      <p v-if="description">{{ description }}</p>
      <p v-else>Select an option to read a description.</p>
    </div>

    <div class="radio-button-grouping-options">
      <div class="radio-button-grouping-option" v-for="option in options">
        <input
          type="radio"
          :id="name + '-' + option.presentation"
          :value="option.presentation"
          :name="name"
          v-model="localValue"
        />
        <label :for="name + '-' + option.presentation">{{
          option.presentation
        }}</label>
      </div>
    </div>
  </div>
</template>

<script>
import HelpCircleOutlineIcon from 'vue-material-design-icons/HelpCircleOutline.vue'

export default {
  // @param {string} name The name of the customization
  // @param {object[]} options An array of potential options
  // @param {string} options[].presentation The name of the option
  // @param {(value: string) => void} A callback when a button is pressed
  // @param {object} optionValueMap Maps option types to option values
  // @param {object} optionValueMap[]
  // @param {number} optionValueMap[].supplemental_price
  // @param {string} optionValueMap[].description
  // @param {boolean} showHelp
  props: ['name', 'options', 'onChange', 'optionValueMap', 'showHelp'],

  data: function() {
    return {
      value: this.calculateInitialValue(),
      supplementalPrice: undefined,
      isDescriptionVisible: false,
      description: undefined,
    }
  },

  computed: {
    localValue: {
      get() {
        return this.value
      },
      set(x) {
        const key = `${this.name}:${x}`.replace(/ /g, '')
        const optionValue = this.optionValueMap[key]

        if (
          optionValue &&
          optionValue.supplemental_price &&
          optionValue.supplemental_price > 0
        ) {
          this.supplementalPrice = `$${optionValue.supplemental_price}`
        } else {
          this.supplementalPrice = undefined
        }

        if (optionValue) {
          this.description = optionValue.description
        } else {
          this.description = undefined
        }

        // do this instead of using v-model to trigger updates
        // to the parent component
        this.onChange(this.name, x)
      },
    },
  },

  methods: {
    calculateInitialValue() {
      if (this.options.length === 0) {
        return null
      }

      if (this.options.length <= 2) {
        return this.options[0].presentation
      }

      return this.options[1].presentation
    },

    expandHelp() {
      this.isDescriptionVisible = true
    },
  },

  components: {
    HelpCircleOutlineIcon,
  },
}
</script>

<style lang="less">
@import './utils.less';

.radio-button-grouping {
  .header {
    display: grid;
    grid-template-columns: 20% 60% 20%;

    h2 {
      .sans-serif();
      grid-column-start: 2;
      font-size: 16px;
      font-weight: bold;
      text-align: center;
      margin-bottom: 10px;
      text-transform: uppercase;
      font-weight: bold;
    }

    .supplemental-price {
      justify-self: end;
      font-size: 12px;
      font-weight: 500;
      letter-spacing: normal;
      color: @darkBlue;
    }

    .material-design-icon.help-circle-outline-icon
      > .material-design-icon__svg {
      transform: translate(0, 5px);
      margin-left: 10px;
      height: 20px;
      width: 20px;
    }
  }

  .description {
    p {
      text-align: center;
      font-size: 14px;
      line-height: 1;
      margin-bottom: 10px;
    }
  }

  .radio-button-grouping-options {
    display: flex;
    flex-direction: row;
  }

  .radio-button-grouping-option {
    flex-grow: 1;
    flex-basis: 0;

    &:first-of-type label {
      border-radius: 32px 0 0 32px;
      border-width: 2px;
    }

    &:last-of-type label {
      border-radius: 0 32px 32px 0;
    }
  }

  input[type='radio'] {
    opacity: 0;
    position: fixed;
    width: 0;

    &:checked + label,
    &:focus + label {
      color: white;
      background-color: @darkBlue;
    }
  }

  label {
    .sans-serif();
    font-size: 14px;
    background-color: white;
    display: block;
    color: @darkBlue;
    border: solid @darkBlue;
    border-width: 2px 2px 2px 0;
    text-align: center;
    padding: 15px 10px;
    font-weight: bold;
    line-height: normal;
  }
}
</style>
