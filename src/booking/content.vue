<template>
  <div>
    <div class="content">
      <div class="progress-bar">
        <VueStepper :steps="steps" :value="1"></VueStepper>
      </div>
      <slot></slot>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import VueStepper from 'vue-stepper-component'
import Footer from '../common/footer.vue'

export default {
  props: ['progressStep'],
  data: function() {
    return {
      steps: 5,
      step: 1
    }
  },
  components: {
    VueStepper,
    Footer
  }
}
</script>

<style lang="less">
  @import "../../styles/util.less";

  @contentPadding: 25px;
  @darkBlue: #1c3042;
  @orange: #bc5940;

  .progress-bar {
    margin-bottom: @contentPadding;
  }

  .content {
    padding-top: @contentPadding;
    padding-bottom: @contentPadding;
  }

  .v-stepper {
    margin-right: calc(-25% + 35px);

    .v-step {
      margin-right: 0;

      .divider {
        border-bottom: 1px dashed @darkBlue;
        margin-left: 3px;
        margin-right: 3px;
      }

      &:last-child {
        .divider {
          display: none;
        }
      }

      .index {
        width: 30px;
        height: 30px;
        box-shadow: none;
        font-size: 20px;
        border: 2px solid @darkBlue;
        color: @orange;
        padding-bottom: 0.1em;
        margin-right: 0
      }

      &.is-visited .index {
        color: @orange;
      }

      &.is-active .label .index {
        background-color: @orange;
        border: 2px solid @orange;
        color: white;
      }
    }
  }
</style>
