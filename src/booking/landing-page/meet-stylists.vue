<template>
  <div class="meet-stylists">
    <DecorBorder />
    <div class="meet-stylists__header landing-header">
      <div class="landing-header__text">meet</div>
      <div class="landing-header__text--underline">our</div>
      <div class="landing-header__text">stylists</div>
    </div>
    <Carousel
      ref="carousel"
      :perPageCustom="[[0, 1], [750, 2], [1125, 3], [1500, 4], [1875, 5]]"
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

      <Slide :key="i" v-for="stylist, i in stylists">
        <div class="stylist">
          <img class="stylist__img" :src="stylist.imageUrl" :alt="stylist.name" />
          <div class="stylist__name">{{stylist.name}}</div>
          <div class="stylist__exp">Years of experience: {{stylist.experience}}</div>
          <br />
          <div class="stylist__fun-info">
            <div class="stylist__fun-info--prompt">Originally from:</div>
            <div class="stylist__fun-info--answer">{{stylist.from}}</div>
          </div>
          <div class="stylist__fun-info">
            <div class="stylist__fun-info--prompt">Secret Talent:</div>
            <div class="stylist__fun-info--answer">{{stylist.talent}}</div>
          </div>
        </div>
      </Slide>
    </Carousel>

    <div class="meet-stylists__button-container">
      <a class="meet-stylists__button" href="/gallery">see our work</a>
    </div>
    <DecorBorder :flip="true"/>
  </div>
</template>

<script>
import { Carousel, Slide } from 'vue-carousel'
import CustomCarouselPaginator from '../components/custom-carousel-paginator.vue'
import DecorBorder from './decor-border.vue'

export default {
  data() {
    return {
      stylists: [
        {
          name: "Shaniece",
          imageUrl: "/assets/images/stylist-image.png",
          experience: "7",
          from: "Los Angeles, CA",
          talent: "I can put my lipstick on perfectly without looking at a mirror.",
        },
        {
          name: "Shaniece",
          imageUrl: "/assets/images/stylist-image.png",
          experience: "7",
          from: "Los Angeles, CA",
          talent: "I can put my lipstick on perfectly without looking at a mirror.",
        },
        {
          name: "Shaniece",
          imageUrl: "/assets/images/stylist-image.png",
          experience: "7",
          from: "Los Angeles, CA",
          talent: "I can put my lipstick on perfectly without looking at a mirror.",
        },
        {
          name: "Shaniece",
          imageUrl: "/assets/images/stylist-image.png",
          experience: "7",
          from: "Los Angeles, CA",
          talent: "I can put my lipstick on perfectly without looking at a mirror.",
        },
        {
          name: "Shaniece",
          imageUrl: "/assets/images/stylist-image.png",
          experience: "7",
          from: "Los Angeles, CA",
          talent: "I can put my lipstick on perfectly without looking at a mirror.",
        },
        {
          name: "Shaniece",
          imageUrl: "/assets/images/stylist-image.png",
          experience: "7",
          from: "Los Angeles, CA",
          talent: "I can put my lipstick on perfectly without looking at a mirror.",
        },
        {
          name: "Shaniece",
          imageUrl: "/assets/images/stylist-image.png",
          experience: "7",
          from: "Los Angeles, CA",
          talent: "I can put my lipstick on perfectly without looking at a mirror.",
        },
        {
          name: "Shaniece",
          imageUrl: "/assets/images/stylist-image.png",
          experience: "7",
          from: "Los Angeles, CA",
          talent: "I can put my lipstick on perfectly without looking at a mirror.",
        },
        {
          name: "Shaniece",
          imageUrl: "/assets/images/stylist-image.png",
          experience: "7",
          from: "Los Angeles, CA",
          talent: "I can put my lipstick on perfectly without looking at a mirror.",
        },
        {
          name: "Shaniece",
          imageUrl: "/assets/images/stylist-image.png",
          experience: "7",
          from: "Los Angeles, CA",
          talent: "I can put my lipstick on perfectly without looking at a mirror.",
        },
        {
          name: "Shaniece",
          imageUrl: "/assets/images/stylist-image.png",
          experience: "7",
          from: "Los Angeles, CA",
          talent: "I can put my lipstick on perfectly without looking at a mirror.",
        },
        {
          name: "Shaniece",
          imageUrl: "/assets/images/stylist-image.png",
          experience: "7",
          from: "Los Angeles, CA",
          talent: "I can put my lipstick on perfectly without looking at a mirror.",
        },
      ]
    }
  },
  components: {
    Carousel,
    Slide,
    CustomCarouselPaginator,
    DecorBorder,
  },
}
</script>

<style lang="less" scoped>
@import '../../common/utils.less';
@import './landing.less';

.meet-stylists {
  background-color: @darkBlue;
  width: 100%;
  color: @white;
  padding: 10px 0;
}

.meet-stylists__decoration {
  width: 100%;
}

.meet-stylists__decoration--flipped {
  width: 100%;
  transform: rotate(180deg);
}

.meet-stylists__header {
  padding: 40px 50px;
}


.meet-stylists__button-container {
  display: flex;
  justify-content: center;
  margin: 40px 0;
}

.meet-stylists__button {
  border: 1px solid @white;
  text-transform: uppercase;
  font-family: 'TT Commons', sans-serif;
  font-weight: bold;
  padding: 15px;
  text-align: center;
  display: block;
  width: 255px;
  font-size: 14px;
  letter-spacing: 0.6px;
}

.stylist {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 10px;
  font-family: 'Moret', serif;
}

.stylist__img {
  width: 100%;
  max-width: 335px;
  margin-bottom: 20px;
}

.stylist__name {
  font-size: 32px;
  line-height: 37px;
  letter-spacing: 0.9px;
}

.stylist__exp {
  font-size: 22px;
  line-height: 25px;
  letter-spacing: 0.6px;
}

.stylist__fun-info {
  font-family: 'TT Commons', sans-serif;
  font-size: 16px;
  padding: 0 40px;
  line-height: 24px;
  max-width: 300px;
  text-align: center;
}

.stylist__fun-info--prompt {
  display: inline;
  font-weight: bold;
}

.stylist__fun-info--answer {
  display: inline;
  margin-left: 3px;
}

</style>
