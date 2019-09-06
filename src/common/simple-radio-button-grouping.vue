<template>
  <div class="simple-radio-button-grouping">
    <h2>{{ name }}</h2>
    <p class="caption" v-if="caption">{{ caption }}</p>

    <div class="options">
      <div class="option" v-for="option in options">
        <input
          type="radio"
          :id="name + '-' + option"
          :value="option"
          :name="name"
          ref="radio"
          @input="updateValue(option)"
        />
        <label :for="name + '-' + option">{{
          option
        }}</label>
      </div>
    </div>
  </div>
</template>

<script>
import HelpCircleOutlineIcon from 'vue-material-design-icons/HelpCircleOutline.vue'

export default {
  // @param {string} name The name of the customization
  // @param {string[]} options An array of potential options
  // @param {string} value The selected value of this radio button group
  // @param {string} caption
  props: ['name', 'options', 'value', 'caption'],

  methods: {
    updateValue(option) {
      this.$emit('input', option)
    }
  }
}
</script>

<style lang="less">
@darkBlue: #1c3042;

.simple-radio-button-grouping {
  h2 {
    font-size: 18px;
    font-weight: bold;
    text-align: left;
    color: @darkBlue;
    margin-bottom: 10px;
    text-transform: none;
  }

  .caption {
    text-align: left;
    color: @darkBlue;
  }

  .options {
    display: flex;
    flex-direction: row;
  }

  .option {
    border: none;
    flex-grow: 1;
    flex-basis: 0;
    margin: 0;

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
