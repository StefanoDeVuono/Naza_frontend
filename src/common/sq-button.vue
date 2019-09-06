<template>
  <div class="sqs-block-button sqs-block button-block">
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
    methods: {
      handleClick(e) {
        if (this.disabled) {
          return
        }

        this.onClick(e)
      }
    },
    
    props: {
      label: String,
      disabled: Boolean,
      onClick: Function
    }
  }
</script>

<style lang="less">
@import '../common/utils.less';

.sqs-block-button .sqs-block-button-element {
  display: block;

  &.disabled {
    background-color: white;
    color: @darkBlue;
    border: 2px solid @darkBlue;
    font-weight: bold;
  }
}
</style>
