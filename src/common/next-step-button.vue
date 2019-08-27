<template>
  <div class="next-step-button sqs-block-button sqs-block button-block">
    <div class="sqs-block-button-content sqs-block-content">
      <div class="sqs-block-button-container--center">
        <div
          class="sqs-block-button-element--medium sqs-block-button-element"
          v-bind:class="{ disabled: disabled }"
          @click="handleClick"
        >
          {{ label }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    label: String,
    onClick: Function,
    disabled: Boolean,
  },

  methods: {
    handleClick: function(event) {
      if (this.disabled) {
        return
      }

      this.onClick(event)
    },
  },
}
</script>

<style lang="less">
@import '../common/utils.less';

.next-step-button.sqs-block-button .sqs-block-button-element {
  display: block;

  &.disabled {
    background-color: white;
    color: @darkBlue;
    border: 2px solid @darkBlue;
    font-weight: bold;
  }
}
</style>
