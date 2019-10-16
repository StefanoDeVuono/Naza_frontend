<template>
  <div>
    <div class="page">
      <div class="hero">
        <div class="hero__image-container">
          <div class="hero__padding"></div>
          <img
            class="hero__image--small"
            alt="Naza welcome image"
            src="https://projectcurl-assets.s3.amazonaws.com/LandingPage/hero.png"
          />
          <img
            class="hero__image--large"
            alt="Naza welcome image"
            src="https://projectcurl-assets.s3.amazonaws.com/LandingPage/hero-large.png"
          />
        </div>
        <div class="hero__info-container">
          <div class="hero__text">
            Naza is a modern hair salon that specializes in coily, kinky, curly,
            and afro-textured hair types.
          </div>
          <div class="hero__button-container">
            <BookButton />
          </div>
        </div>
      </div>
      <OurServices />
      <MeetStylists />
    </div>

    <Footer></Footer>
  </div>
</template>

<script>
import Footer from 'common/footer.vue'
import BookButton from './book-button.vue'
import OurServices from './our-services.vue'
import MeetStylists from './meet-stylists.vue'

export default {
  components: {
    Footer,
    BookButton,
    OurServices,
    MeetStylists,
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
  margin-bottom: -7px;
}

.hero__padding {
  .hide-on-large();

  height: calc(3 * @hero-line-height);
  opacity: 0.87;
  background: linear-gradient(
    270deg,
    #c6bbbf 0%,
    #cdccd1 33.27%,
    #d3d2db 48.13%,
    #c3c2c7 58.09%,
    #b4acaf 75.02%,
    #bda69d 100%
  );
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

.hero__button-container {
  @media @small {
    position: fixed;
    bottom: 0;
    z-index: 1;
    width: 100%;
    display: flex;
    justify-content: center;
    background-color: @darkBlue;
    padding: 23px 0;
    border-top: 1px solid @white;
  }
}

.footer {
  @media @small {
    // for the height of the book appt sticky button + extra spacing
    padding-bottom: 120px;
  }
}
</style>
