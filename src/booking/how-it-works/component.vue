<template>
  <div class="how-it-works--container">
    <div class="how-it-works">
      <div class="how-it-works--content">
        <div class="how-it-works--header">
          <img src="assets/images/HowItWorks-header@1x.png" />
          <FlowerImage class="divider" />
        </div>
        <Carousel ref="carousel" :per-page="1" paginationColor="rgba(28, 48, 66, 0.4)" paginationActiveColor="#ffffff">
          <template v-slot:pagination>
            <CustomCarouselPaginator @paginationclick="$refs.carousel.goToPage($event, 'pagination')" />
          </template>

          <Slide data-index="0">
            <img src="assets/images/HowItWorks1.jpeg" />
            <h2>Select a Style and Customize It</h2>
            <p>Personal your style by choosing color, length, volume, and size of your favorite hairstyle.</p>
          </Slide>

          <Slide data-index="1">
            <h2>Stuff Happens</h2>
            <p>Zoop!</p>
          </Slide>
        </Carousel>

        <div class="skip-and-start">
          Skip &amp; Start
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { Carousel, Slide } from 'vue-carousel'
  import CustomCarouselPaginator from '../components/custom-carousel-paginator.vue'
  import FlowerImage from './flower.svg'

  export default {
    components: {
      Carousel,
      Slide,
      CustomCarouselPaginator,
      FlowerImage,
    }
  }
</script>

<style lang="less">
@import '../../common/utils.less';

.how-it-works--container {
  .ignore-parent-padding();
  display: flex;

  .how-it-works {
    color: white;
    background-color: @brown;

    .how-it-works--content {
      margin: 20px;
      border: 2px solid white;
      padding: 20px;

      .how-it-works--header {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-bottom: 40px;

        .title {
          margin-top: 20px;
        }

        .divider {
          margin-top: 10px;
        }
      }

      h1, h2 {
        font-weight: normal;
        color: white;
        text-align: center;
        letter-spacing: 0.75px;
      }

      p {
        text-align: center;
      }

      .skip-and-start {
        text-align: center;
      }
    }
  }
}
</style>
