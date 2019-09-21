<template>
  <div>
    <div class="content">
      <div class="border-top">
        <img src="assets/content/border-top.svg" />
      </div>
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

.v-stepper {
  margin-top: 30px;

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
      font-family: 'Moret', serif;
      font-size: 16px;
      background-color: white;
      width: 30px;
      height: 30px;
      box-shadow: none;
      border: 2px solid @darkBlue;
      color: @darkBlue;
      padding: 2px 0;
      margin-right: 0;
      opacity: 1;
    }

    &.is-disabled .index {
      opacity: 0.4;
    }

    &.is-active .label .index {
      background-color: @darkBlue;
      border: 2px solid @darkBlue;
      color: white;
    }
  }
}
</style>
