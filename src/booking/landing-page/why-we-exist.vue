<template>
  <div class="why-we-exist">
    <div class="why-we-exist__header landing-header">
      <div class="landing-header__text">why</div>
      <div class="landing-header__text--underline">we</div>
      <div class="landing-header__text">exist</div>
    </div>
    <div class="why-we-exist__container">
      <div class="why-we-exist__video-container">
        <img
          class="why-we-exist__video"
          src="/assets/images/why-we-exist.jpg"
          alt="stylist styling hair"
        />
      </div>
      <div class="why-we-exist__info-container">
        <div class="why-we-exist__tagline">
          Getting your hair done shouldn’t be so hard and time-consuming
        </div>
        <div class="why-we-exist__text">
          We don’t think your hair is difficult. We don’t support a texture
          hierarchy. We don’t treat you like just another head. We listen to
          your needs. We embrace your individuality. We make getting your hair
          done easy. Naza was built for us, by us, because Black and brown women
          deserve a place and a brand that not only celebrates our beauty, but
          actually puts our needs first.
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BookButton from './book-button.vue'

export default {
  components: {
    BookButton,
  },
}
</script>

<style lang="less" scoped>
@import '../../common/utils.less';
@import './landing.less';

.why-we-exist {
  color: @white;
  background-color: @darkBlue;
  padding: 50px;
}

.why-we-exist__container {
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

.why-we-exist__video-container {
  flex: 4;
}

.why-we-exist__video {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.why-we-exist__info-container {
  flex: 3;
  margin-left: 40px;
  display: flex;
  flex-direction: column;

  @media @small {
    margin: 30px 0 0;
    text-align: center;
    align-items: center;
    justify-content: space-around;
  }
}

.why-we-exist__tagline {
  font-family: 'Moret', serif;
  font-size: 32px;
  line-height: 40px;
  margin-bottom: 20px;

  @media @medium-and-below {
    line-height: 42px;
  }

  @media @medium-small {
    font-size: 29px;
    line-height: 35px;
  }
}

.why-we-exist__text {
  font-family: 'TTCommons', sans-serif;
  font-size: 18px;

  @media @medium-small {
    font-size: 16px;
    line-height: 28px;
  }
}

.why-we-exist__button-container {
  .hide-on-small();
}
</style>
