<template>
  <div>
    <div class="page">
      <div class="hero">
        <div class="hero__image-container">
          <div class="hero__padding"></div>
          <img class="hero__image--small"
            alt="Naza welcome image"
            src="https://projectcurl-assets.s3.amazonaws.com/LandingPage/hero.png"/>
          <img class="hero__image--large"
            alt="Naza welcome image"
            src="https://projectcurl-assets.s3.amazonaws.com/LandingPage/hero-large.png"/>
        </div>
        <div class="hero__info-container">
          <div class="hero__text">
            Naza is a modern hair salon that specializes in
            coily, kinky, curly, and afro-textured hair types.
          </div>
          <BookButton class="hero__button"/>
        </div>
      </div>
    </div>

    <Footer></Footer>
  </div>
</template>

<script>
import Footer from 'common/footer.vue'
import BookButton from './book-button.vue'

export default {
  components: {
    Footer,
    BookButton,
  },
}
</script>

<style lang="less" scoped>
@import '../../common/utils.less';

@hero-line-height: 32px;

.page {
  .ignore-parent-padding();
}

.hero {
  position: relative;
  margin-bottom: -6px;
}

.hero__padding {
  .hide-on-large();

  height: calc(3 * @hero-line-height);
	opacity: 0.87;
	background: linear-gradient(270deg, #C6BBBF 0%, #CDCCD1 33.27%, #D3D2DB 48.13%, #C3C2C7 58.09%, #B4ACAF 75.02%, #BDA69D 100%);
}

.hero__image--small {
  .hide-on-large();

  width: 100%;
  -webkit-transform: scaleX(-1);
  transform: scaleX(-1);
}

.hero__image--large {
  .hide-on-small();

  width: 100%;
  object-fit: cover;
}

.hero__info-container {
  position: absolute;

  @media @small {
    top: 0;
    width: 100%;
    height: 100%;
  }

  @media @large {
    top: 10%;
    width: 34%;
    margin: 4%;
    max-width: 480px;
    height: 25vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
}

.hero__text {
  font-family: 'Moret', serif;
  font-size: 26px;
  line-height: @hero-line-height;
  color: @darkBlue;

  @media @small {
    position: absolute;
    top: 0;
    padding: 20px;
  }
}

.hero__button {
  max-width: 260px;

  @media @small {
    position: absolute;
    top: 65vh;
    left: 50%;
    transform: translate(-50%, 0%);
  }
}
</style>
