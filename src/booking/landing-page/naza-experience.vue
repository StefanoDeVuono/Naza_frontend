<template>
  <div class="naza-experience">
    <div class="naza-experience__header landing-header">
      <div class="landing-header__text--underline">the</div>
      <div class="landing-header__text">naza</div>
      <div class="landing-header__text">experience</div>
    </div>
    <Carousel
      ref="carousel"
      :perPageCustom="[[0, 1], [750, 2], [1125, 3]]"
      :centerMode="true"
      :paginationPadding="5"
      :spacePadding="0"
      paginationColor="rgba(255, 255, 255, 0.4)"
      paginationActiveColor="#bc4940">
      <template v-slot:pagination>
        <CustomCarouselPaginator
          @paginationclick="$refs.carousel.goToPage($event, 'pagination')"
        />
      </template>

      <Slide :key="i" v-for="highlight, i in highlights">
        <div class="highlight-slide" :class="highlight.class">
          <div class="highlight-slide__hero">
            <img class="highlight-slide__hero-image" :src="highlight.imageUrl" />
          </div>
          <div class="highlight-slide__title">{{highlight.title}}</div>
          <div class="highlight-slide__description">{{highlight.description}}</div>
        </div>
      </Slide>
    </Carousel>
  </div>
</template>

<script>
import { Carousel, Slide } from 'vue-carousel'
import CustomCarouselPaginator from '../components/custom-carousel-paginator.vue'

export default {
  data() {
    return {
      highlights: [
        {
          title: 'The Playground',
          class: 'highlight-slide--playground',
          imageUrl: 'https://projectcurl-assets.s3.amazonaws.com/LandingPage/the-playground-hero.png',
          description: 'Curated hair, skin, and body products in an area we call “The Playground” because you’re free to explore, test, or buy whetever you like!',
        },
        {
          title: 'Elevated Design',
          class: 'highlight-slide--design',
          imageUrl: 'https://projectcurl-assets.s3.amazonaws.com/LandingPage/elevated-design-hero.png',
          description: 'We worked with some bomb interior designers to create a modern salon space that feels warm & comfortable.',
        },
        {
          title: "Let's Cheers",
          class: 'highlight-slide--cheers',
          imageUrl: 'https://projectcurl-assets.s3.amazonaws.com/LandingPage/lets-cheers-hero.png',
          description: 'Every appointment comes with one of our custom cocktails (if you’re 21+, of cours 😉)',
        },
      ],
    }
  },
  components: {
    Carousel,
    Slide,
    CustomCarouselPaginator,
  },
}
</script>

<style lang="less" scoped>
@import '../../common/utils.less';
@import './landing.less';

.naza-experience {
  position: relative;
}

.naza-experience__header {
  position: absolute;
  z-index: 1;
  width: 100%;
  top: 40px;
  @media @medium-and-up {
    text-shadow: 1px 1px black
  }

  @media @large-and-up {
    text-shadow: 1px 2px black
  }
}

.highlight-slide {
  padding: 20px 0 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: @white;
  height: 100%;
}

.highlight-slide--playground {
  background-color: @salmon;
}

.highlight-slide--design {
  background-color: @darkBlue;
}

.highlight-slide--cheers {
  background-color: @darkOrangeYellow;
}

.highlight-slide__hero {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.highlight-slide__hero-image {
  height: 415px;
  width: 335px;
  background: radial-gradient(circle, #FBDAA3 0%, #F8D186 100%);
}

.highlight-slide__title {
  font-family: 'Moret', serif;
  font-size: 32px;
  line-height: 37px;
  letter-spacing: 0.9px;
}

.highlight-slide__description {
  font-family: 'TT Commons', sans-serif;
  font-size: 18px;
  line-height: 22px;
  letter-spacing: 0.1px;
  margin: 20px;
}

.VueCarousel-pagination {
  position: absolute;
  bottom: 0;
  padding-bottom: 20px;
}
</style>
