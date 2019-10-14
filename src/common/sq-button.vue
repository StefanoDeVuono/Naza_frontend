<template>
  <div class="sqs-block-button sqs-block button-block" :class="{ inverted }">
    <div class="sqs-block-button-content sqs-block-content">
      <div class="sqs-block-button-container--center">
        <div
          class="sqs-block-button-element--medium sqs-block-button-element"
          role="button"
          v-bind:class="{ disabled: disabled }"
          @click="handleClick"
          v-html="label"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    handleClick(e) {
      if (this.disabled) {
        return
      }

      if (this.onClick) {
        this.onClick(e)
      }

      this.$emit('click')
    },
  },

  props: {
    label: String,
    disabled: Boolean,
    onClick: Function,
    inverted: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style lang="less">
@import '../common/utils.less';

.sqs-block-button .sqs-block-button-element {
  font-family: 'TTCommons', sans-serif;
  font-weight: 500;
  color: white;
  display: block;
  padding: 20px 5px;
  letter-spacing: 0.5px;

  &.disabled {
    background-color: white;
    color: @darkBlue;
    border: 2px solid @darkBlue;
    font-weight: bold;
  }
}

.sqs-block-button.inverted .sqs-block-button-element {
  background-color: white;
  color: @darkBlue;
  letter-spacing: normal;
  font-size: 12px;
  font-weight: bold;
  border: 1px solid @darkBlue;
  margin: 0 10px;
  padding: 15px 5px;
}
</style>
