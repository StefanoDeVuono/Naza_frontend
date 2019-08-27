<template>
  <div class="radio-button-grouping">
    <div class="header">
      <h2>{{ name }}</h2>
      <div class="supplemental-price" v-show="supplementalPrice">
        + {{ supplementalPrice }}
      </div>
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
export default {
  data: function() {
    return {
      supplementalPrice: undefined,
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

        // do this instead of using v-model to trigger updates
        // to the parent component
        this.onChange(this.name, x)
      },
    },
  },

  // @param {string} name The name of the customization
  // @param {object[]} options An array of potential options
  // @param {string} options.presentation The name of the option
  // @param {(value: string) => void} A callback when a button is pressed
  props: ['value', 'name', 'options', 'onChange', 'optionValueMap'],
}
</script>

<style lang="less">
@darkBlue: #1c3042;

.radio-button-grouping {
  .header {
    display: grid;
    grid-template-columns: 20% 60% 20%;

    h2 {
      grid-column-start: 2;
      font-size: 22px;
      font-weight: bold;
      text-align: center;
      color: @darkBlue;
      margin-bottom: 10px;
      text-transform: none;
    }

    .supplemental-price {
      justify-self: end;
      font-size: 12px;
      font-weight: 500;
      letter-spacing: normal;
      color: @darkBlue;
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
    background-color: white;
    display: block;
    color: @darkBlue;
    border: solid @darkBlue;
    border-width: 2px 2px 2px 0;
    text-align: center;
    padding: 10px;
    font-size: 14px;
    font-weight: bold;
    line-height: normal;
  }
}
</style>