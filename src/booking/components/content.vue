<template>
  <div>
    <div class="content">
      <div class="progress-bar">
        <VueStepper :steps="steps" v-model="step"></VueStepper>
      </div>
      <slot></slot>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import VueStepper from 'vue-stepper-component'
import Footer from 'common/footer.vue'

export default {
  props: {
    progressStep: Number,
  },
  data: function() {
    return {
      steps: 5,
    }
  },
  computed: {
    step: {
      get() {
        return this.progressStep
      },

      set(step) {
        const delta = this.progressStep - step
        if (delta > 0) {
          this.$router.go(-1 * delta)
        }
        return this.progressStep
      },
    },
  },
  components: {
    VueStepper,
    Footer,
  },
}
</script>

<style lang="less">
@import '../../../styles/util.less';

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
  margin-top: calc(40px - @contentPadding);

  .v-step {
    margin-right: 0;
    flex-basis: 24%;

    .divider {
      border-bottom: 1px dashed @darkBlue;
      margin-left: 3px;
      margin-right: 3px;
    }

    &:last-child {
      flex-basis: 4%;

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
      margin-right: 0;
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
