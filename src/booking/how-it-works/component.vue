<template>
  <div>
    <div class="how-it-works--container">
      <div class="how-it-works--corner ne"></div>
      <div class="how-it-works--corner nw"></div>
      <div class="how-it-works--corner se"></div>
      <div class="how-it-works--corner sw"></div>
      <div class="how-it-works">
        <div class="how-it-works--content">
          <div class="how-it-works--header">
            <img
              alt="How Does Naza Work?"
              aria-label="How Does Naza Work?"
              src="assets/images/HowItWorks-header@1x.png"
            />
            <FlowerImage class="divider" />
          </div>
          <Carousel
            ref="carousel"
            :per-page="1"
            :paginationPadding="5"
            paginationColor="rgba(28, 48, 66, 0.4)"
            paginationActiveColor="#ffffff"
          >
            <template v-slot:pagination>
              <CustomCarouselPaginator
                @paginationclick="$refs.carousel.goToPage($event, 'pagination')"
              />
            </template>

            <Slide data-index="0">
              <img src="assets/images/HowItWorks1.jpeg" />
              <h2 class="step-title">Select a Style and Customize It</h2>
              <p>
                Personal your style by choosing color, length, volume, and size of
                your favorite hairstyle.
              </p>
            </Slide>

            <Slide data-index="1">
              <h2 class="step-title">Step 2</h2>
            </Slide>

            <Slide data-index="2">
              <h2 class="step-title">Step 3</h2>
            </Slide>

            <Slide data-index="3">
              <h2 class="step-title">Step 4</h2>
            </Slide>

            <Slide data-index="4">
              <h2 class="step-title">Step 5</h2>
              <p>
                <router-link
                  @click.native="$event.stopImmediatePropagation()"
                  :to="{ name: 'categories' }"
                  >Launch booking flow</router-link
                >
              </p>
            </Slide>
          </Carousel>

          <div class="skip-and-start">
            <router-link
              @click.native="$event.stopImmediatePropagation()"
              :to="{ name: 'categories' }"
              >Skip &amp; Start &rarr;</router-link
            >
          </div>
        </div>
      </div>
    </div>

    <Footer></Footer>
  </div>
</template>

<script>
import { Carousel, Slide } from 'vue-carousel'
import CustomCarouselPaginator from '../components/custom-carousel-paginator.vue'
import FlowerImage from './flower.svg'
import Footer from 'common/footer.vue'

export default {
  components: {
    Carousel,
    Slide,
    CustomCarouselPaginator,
    FlowerImage,
    Footer
  },
}
</script>

<style lang="less">
@import '../../common/utils.less';
@cornerSize: 10px;
@cornerBorderWidth: 2px;
@pageMargin: 20px;
@cornerOffset: calc(@pageMargin - @cornerSize - @cornerBorderWidth);

.how-it-works--container {
  .ignore-parent-padding();
  position: relative;
  display: flex;

  .how-it-works--corner {
    position: absolute;
    width: @cornerSize;
    height: @cornerSize;
    border: @cornerBorderWidth solid white;

    &.ne {
      top: @cornerOffset;
      left: @cornerOffset;
    }

    &.nw {
      top: @cornerOffset;
      right: @cornerOffset;
    }

    &.se {
      left: @cornerOffset;
      bottom: @cornerOffset;
    }

    &.sw {
      right: @cornerOffset;
      bottom: @cornerOffset;
    }
  }

  @font-face {
    font-family: 'ttcommons';
    src: url('../../fonts/TTCommons-Medium.otf');
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
    font-family: 'ttcommons';
    src: url('../../fonts/TTCommons-DemiBold.otf');
    font-weight: bold;
    font-style: normal;
  }

  .how-it-works {
    color: white;
    background-color: @brown;

    .how-it-works--content {
      margin: 20px;
      border: 2px solid white;
      padding: 20px;

      h2.step-title {
        text-transform: lowercase;
        font-weight: normal;
      }

      .how-it-works--header {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 30px;
        padding-bottom: 40px;

        img {
          width: auto;
          height: auto;
        }

        .title {
          margin-top: 20px;
        }

        .divider {
          margin-top: 10px;
        }
      }

      h1,
      h2 {
        font-weight: normal;
        color: white;
        text-align: center;
        letter-spacing: 0.75px;
      }

      p {
        text-align: center;
      }

      .skip-and-start {
        margin-top: 10px;
        font-family: 'ttcommons', sans-serif;
        font-weight: bold;
        text-align: center;
        text-transform: uppercase;
        letter-spacing: 0.3px;
        font-size: 14px;
      }
    }
  }
}
</style>
