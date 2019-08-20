<template>
  <div class="radio-button-grouping">
    <h2>{{ name }}</h2>
    <div class="radio-button-grouping-options">
      <div class="radio-button-grouping-option" v-for="option in options">
        <input type="radio" :id="name + '-' + option.presentation" :value="option.presentation" :name="name" />
        <label :for="name + '-' + option.presentation">{{ option.presentation }}</label>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    // @param {string} name The name of the customization
    // @param {object[]} options An array of potential options
    // @param {string} options.presentation The name of the option
    props: ['name', 'options']
  }
</script>

<style lang="less">
  .radio-button-grouping {
    h2 {
      font-size: 22px;
      font-weight: 500;
      text-align: center;
      color: #1c3042;
    }

    .radio-button-grouping-options {
      display: flex;
      flex-direction: row;
    }

    .radio-button-grouping-option {
      flex-grow: 1;

      &:first-of-type label {
        border-radius: 32px 0 0 32px;
        border-width: 2px;
      }

      &:last-of-type label {
        border-radius: 0 32px 32px 0;
      }
    }

    input[type="radio"] {
      opacity: 0;
      position: fixed;
      width: 0;

      &:checked + label, &:focus + label {
        background-color: #e6e1da;
      }
    }

    label {
      display: block;
      color: #1c3042;
      border: solid #e6e1da;
      border-width: 2px 2px 2px 0;
      text-align: center;
      padding: 10px;
      font-size: 14px;
      font-weight: bold;
      line-height: normal;
    }
  }
</style>
