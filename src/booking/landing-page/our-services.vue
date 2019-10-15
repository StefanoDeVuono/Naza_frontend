<template>
  <div class="our-services">
    <div class="our-services__image-container">
      <div class="our-services__image-text">
        <div class="our-services__our">our</div>
        <div class="our-services__services">services</div>
      </div>
      <img
        class="our-services__image"
        alt="Our Services"
        src="https://projectcurl-assets.s3.amazonaws.com/LandingPage/our-services-hero.png"
      />
    </div>
    <div class="our-services__info-container">
      <div class="our-services__description">
        It’s your hair - you should know what to expect when you get it done.
        From the very start, we tell you how long your appointment will be, how
        much it costs, and how long a style will last. Let’s find your next
        look!
      </div>
      <Accordion v-bind:items="accordionItems" />
    </div>
  </div>
</template>

<script>
import Accordion from './accordion/component.vue'
import accordionItemsJson from './services-list.json'

export default {
  data() {
    return {
      accordionItems: accordionItemsJson,
    }
  },
  components: {
    Accordion,
  },
}
</script>

<style lang="less" scoped>
@import '../../common/utils.less';

.our-services {
}

.our-services__image-container {
  position: relative;
  margin-bottom: -6px;
}

.our-services__image-text {
  position: absolute;
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 40px 0px;
  color: @white;
  font-family: 'Moret', serif;
  text-transform: uppercase;
  font-weight: bold;
}

.our-services__our {
  font-size: 26px;
  padding-right: 6px;
  line-height: 36px;
  text-decoration: underline;
}

.our-services__services {
  font-size: 44px;
  line-height: 47px;
  letter-spacing: 1.2px;
}

.our-services__image {
  @media @small {
    width: 100%;
  }
}

.our-services__info-container {
  background-color: @white;
  padding: 40px 20px;
}

.our-services__description {
  font-family: 'TT Commons', sans-serif;
  font-size: 18px;
  color: @darkBlue;
}
</style>
