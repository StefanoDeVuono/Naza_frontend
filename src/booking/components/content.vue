<template>
  <div>
    <div class="content">
      <div class="border-top">
        <BorderTop />
      </div>
      <div class="progress-bar">
        <VueStepper ref="stepper" :steps="5" v-model="step"></VueStepper>
      </div>
      <slot></slot>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import VueStepper from 'vue-stepper-component'
import Footer from 'common/footer.vue'
import { range } from 'ramda'
import BorderTop from '../../images/decor_element.svg'

export default {
  props: {
    progressStep: Number,
  },

  computed: {
    step: {
      get() {
        return this.progressStep
      },

      set(step) {
        this.value = step
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
    BorderTop
  },

  methods: {
    disableSteps() {
      // we have to exit if setStep isn't defined
      // in the testing environment
      if (!this.$refs.stepper.setStep) {
        console.warn(
          'Skipping disableSteps in content.vue because ref not found'
        )
        return
      }

      // we have to do this because the stepper
      // component is instantiated all at once
      // on app load, so we have to recalculate
      // the step status when this component is
      // mounted
      range(0, this.progressStep).forEach(i => {
        this.$refs.stepper.setStep(i, 'disabled', false)
      })
    },
  },

  mounted() {
    this.disableSteps()
  },
}
</script>

<style lang="less">
@import '../../common/utils.less';

@contentPadding: 25px;
@darkBlue: #1c3042;
@orange: #bc5940;

.border-top {
  svg {
    transform: scale(1.2, 1);
  }
}

.progress-bar {
  margin-bottom: 30px;
  margin-left: 10px;
  margin-right: 10px;

  .v-stepper {
    margin-top: 30px;

    .v-step {
      margin-right: 0;
      flex-basis: 24%;

      .divider {
        border-bottom: 1px dashed @darkBlue;
        margin-left: 3px;
        margin-right: 3px;
        opacity: 1;
      }

      &:last-child {
        flex-basis: 2%;

        .divider {
          display: none;
        }
      }

      .index {
        font-family: 'Moret', serif;
        font-size: 18px;
        background-color: white;
        width: 30px;
        height: 30px;
        box-shadow: none;
        border: 2px solid @darkBlue;
        color: @darkBlue;
        padding: 1px 0 2px 0;
        margin-right: 0;
        opacity: 1;
      }

      &.is-disabled .index {
        opacity: 0.4;
      }

      &.is-active .label .index {
        opacity: 1;
        background-color: @darkBlue;
        border: 2px solid @darkBlue;
        color: white;
      }
    }
  }
}

.content {
  background-color: @lightGray;
  padding-bottom: 50px;
}

.border-top {
  .ignore-parent-padding();
  height: auto;
  margin-bottom: 30px;

  img {
    width: 100%;
  }
}
</style>
