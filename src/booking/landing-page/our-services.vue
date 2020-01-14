<template>
  <div class="our-services">
    <div class="landing-header--blue">
      <div class="landing-header__text--underline">our</div>
      <div class="landing-header__text">services</div>
    </div>
    <div class="our-services__info-container">
      <Accordion v-bind:items="accordionItems" />
    </div>
  </div>
</template>

<script>
import Accordion from './accordion/component.vue'
import servicesList from './services-list.json'

export default {
  data() {
    return {
      accordionItems: servicesList,
    }
  },
  components: {
    Accordion,
  },
}
</script>

<style lang="less" scoped>
@import '../../common/utils.less';
@import './landing.less';

.our-services {
  padding: 40px 0;
  background-color: @white;

  @media @large-and-up {
    padding: 40px 50px;
  }
}

.our-services__image-text {
  position: absolute;
  width: 100%;
  padding: 40px 0px;
}

.our-services__info-container {
  background-color: @white;
  padding: 0 20px;

  @media @large-and-up {
    height: 650px;
    width: 980px;
    margin: auto;
  }
}

.our-services__description {
  font-family: 'TT Commons', sans-serif;
  font-size: 18px;
  color: @darkBlue;
}
</style>
