<template>
  <div>
    <div class="content">
      <img class="border-top" src="assets/content/border-top.svg" />
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
@import '../../common/utils.less';

@contentPadding: 25px;
@darkBlue: #1c3042;
@orange: #bc5940;

.progress-bar {
  margin-bottom: 30px;
  margin-right: 54px;
  margin-left: 54px;
  font-family: Moret;
  font-size: 18px;
  font-weight: 600;
}

.content {
  display: flex;
  flex-direction: column;
  padding-bottom: @contentPadding;
  .ignore-parent-padding();
  background-color: @lightGray;
}

.border-top {
  width: 100%;
  height: auto;
  margin-bottom: 30px;
}

.v-stepper {
  .v-step {
    margin-right: 0;
    flex-basis: 24%;

    .divider {
      border-bottom: 1px dashed @darkBlue;
      margin-left: 3px;
      margin-right: 3px;
    }

    &:last-child {
      flex-basis: 2%;

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
      color: @darkBlue;
      padding-bottom: 0.1em;
      margin-right: 0;
    }

    &.is-visited .index {
      color: @orange;
    }

    &.is-active .label .index {
      background-color: @darkBlue;
      border: 2px solid;
      color: white;
    }
  }
}
</style>
