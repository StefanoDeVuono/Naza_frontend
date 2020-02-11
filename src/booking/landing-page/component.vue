<template>
  <div>
    <div class="page">
      <div class="hero">
        <div class="hero__image-container">
          <img
            class="hero__image--small"
            alt="Naza welcome image"
            src="https://projectcurl-assets.s3.amazonaws.com/LandingPage/hero.jpg"
          />
          <img
            class="hero__image--large"
            alt="Naza welcome image"
            src="https://projectcurl-assets.s3.amazonaws.com/LandingPage/hero-large.jpg"
          />
        </div>
        <div class="hero__info-container">
          <div class="hero__text">
            Naza is a protective styling salon specializing in coily, kinky, afro-textured hair.
          </div>
          <div class="hero__button-container">
            <DecorBorder class="hero__button-border" />
            <BookButton />
          </div>
        </div>
      </div>
      <OurServices />
      <MeetStylists />
      <NazaExperience />
    </div>

    <Footer></Footer>
  </div>
</template>

<script>
import Footer from 'common/footer.vue'
import BookButton from './book-button.vue'
import OurServices from './our-services.vue'
import MeetStylists from './meet-stylists.vue'
import DecorBorder from './decor-border.vue'
import NazaExperience from './naza-experience.vue'

export default {
  components: {
    Footer,
    BookButton,
    OurServices,
    MeetStylists,
    DecorBorder,
    NazaExperience,
  },
}
</script>

<style lang="less" scoped>
@import '../../common/utils.less';
@import './landing.less';

.page {
  .ignore-parent-padding();
}

.hero {
  position: relative;
  margin-bottom: -7px;
}

.hero__image--small {
  .hide-on-medium-and-up();

  width: 100%;
}

.hero__image--large {
  .hide-on-small();

  width: 100%;
  object-fit: cover;
}

.hero__info-container {
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media @small {
    top: 0;
    width: 100%;
    height: 100%;
  }

  @media @medium-and-up {
    top: 36%;
    width: 100%;
    height: 23vh;
    justify-content: space-between;
  }
}

.hero__text {
  font-family: 'Moret', serif;
  font-size: 30px;
  line-height: 36px;
  color: @white;
  text-align: center;

  @media @small {
    position: absolute;
    top: 42%;
    padding: 20px;
    max-width: 500px;
  }

  @media @medium-small {
    font-size: 26px;
    line-height: 32px;
  }

  @media @medium-and-up {
    width: 600px;
  }

  @media @large-and-up {
    font-size: 35px;
    line-height: 40px;
  }
}

.hero__button-container {
  @media @small {
    position: fixed;
    bottom: 0;
    z-index: 1;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: @darkBlue;
    padding-bottom: 23px;
    cursor: pointer;
  }

  @media @large-and-up {
    width: 330px;
  }
}

.hero__button-border {
  .hide-on-medium-and-up();

  @media @small {
    width: 100%;
    margin-bottom: 23px;
  }
}

.footer {
  @media @small {
    // for the height of the book appt sticky button + extra spacing
    padding-bottom: 120px;
  }
}
</style>
