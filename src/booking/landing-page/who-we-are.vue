<template>
  <div class="who-we-are">
    <div class="who-we-are__header landing-header">
      <div class="landing-header__text">who</div>
      <div class="landing-header__text--underline">we</div>
      <div class="landing-header__text">are</div>
    </div>
    <div class="who-we-are__container">
      <div class="who-we-are__video-container">
        <video class="who-we-are__video"
               controls
               preload="none"
               poster="/assets/images/who-we-are-video-cover.jpg">
          <source src="/assets/videos/who-we-are.mp4" type="video/mp4">
          Your browser does not support the video tag.
        </video>
      </div>
      <div class="who-we-are__info-container">
        <div class="who-we-are__tagline">
          Naza is a protective styling salon that specializes in coily, kinky,
          afro-textured hair.
        </div>
        <div class="who-we-are__text">
          First location is now open in San Francisco
        </div>
        <div class="who-we-are__button-container">
          <BookButton />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BookButton from './book-button.vue';

export default {
  components: {
    BookButton,
  },
}
</script>

<style lang="less" scoped>
@import '../../common/utils.less';
@import './landing.less';

.who-we-are {
  color: @white;
  background-color: @darkBlue;
  padding: 50px;
}

.who-we-are__container {
  display: flex;
  padding: 50px 0;
  width: 980px;
  margin: auto;

  @media @medium-and-below {
    width: 100%;
  }

  @media @small {
    flex-direction: column;
    padding: 50px 0 0;
  }
}

.who-we-are__video-container {
  flex: 4;
}

.who-we-are__video {
 width: 100%;
 height: 100%;
 object-fit: contain;
}

.who-we-are__info-container {
  flex: 3;
  margin-left: 40px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  @media @small {
    margin: 30px 0 0;
    text-align: center;
    align-items: center;
  }
}

.who-we-are__tagline {
  font-family: 'Moret', serif;
  font-size: 35px;
  line-height: 40px;

  @media @small {
    margin-bottom: 20px;
  }

  @media @medium-and-below {
    font-size: 28px;
    line-height: 42px;
  }

  @media @medium-small {
    font-size: 29px;
    line-height: 35px;
  }
}

.who-we-are__text {
  font-family: "TT Commons", sans-serif;
  font-size: 18px;

  @media @medium-small {
    font-size: 16px;
  }
}

.who-we-are__button-container {
  .hide-on-small();
}
</style>
