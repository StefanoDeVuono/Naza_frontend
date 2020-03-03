<template>
  <div class="naza-experience">
    <div class="naza-experience__header landing-header">
      <div class="landing-header__text--underline">the</div>
      <div class="landing-header__text">naza</div>
      <div class="landing-header__text">experience</div>
    </div>
    <div class="naza-experience__info-container">
      <div class="naza-experience__info-block--1">
        <img
          class="naza-experience_image"
          src="/assets/images/naza-stylists.jpg"
          alt="design"
        />
      </div>
      <div
        class="naza-experience__info-block--2 naza-experience__text-container"
      >
        <div class="naza-experience__subheader">
          Expert Stylists
        </div>
        <div class="naza-experience__text">
          No more painful, long days in the salon chair. Naza stylists are
          experts specifically trained and experienced in styling coily, kinky,
          and afro-textured hair types (3C - 4C). But that’s not all. We also go
          the extra mile to treat your hair like gold. We’re kind to your edges.
          We respect the tender-headed. And we only use products designed to
          nourish your textured strands.
        </div>
      </div>
      <div
        class="naza-experience__info-block--3 naza-experience__text-container"
      >
        <div class="naza-experience__subheader">
          Elevated Design
        </div>
        <div class="naza-experience__text">
          From hand-crafted drinks to charger outlets at every chair to a
          designated space for exploring and trying new products, the Naza salon
          was designed to be an experience unlike ever before in the textured
          hair salon space. We worked with a team of stellar designers,
          engineers, and artists to build this ‘home away from home’ that caters
          to you and the needs of the Black hair community.
        </div>
      </div>
      <div class="naza-experience__info-block--4">
        <img
          class="naza-experience_image"
          src="/assets/images/naza-design.png"
          alt="design"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
@import '../../common/utils.less';
@import './landing.less';

.naza-experience {
  color: @darkBlue;
  margin: 50px 0;

  @media @small {
    margin: 50px;
  }
}

.naza-experience__info-container {
  margin: 50px auto 0;
  display: flex;
  flex-wrap: wrap;
  max-width: 980px;

  @media @small {
    flex-direction: column;
    align-items: center;
  }
}

.naza-experience__info-block () {
  max-width: calc(490px - @blockSpacing);
  @media @small {
    padding: 0;
    margin-bottom: 30px;
    max-width: none;
  }
}

@blockSpacing: 30px;

.naza-experience__info-block--left () {
  .naza-experience__info-block();
  padding-right: @blockSpacing;
}

.naza-experience__info-block--right {
  .naza-experience__info-block();
  padding-left: @blockSpacing;
}

.naza-experience__info-block--1 {
  .naza-experience__info-block--left();

  @media @small {
    order: 1;
  }
}

.naza-experience__info-block--2 {
  .naza-experience__info-block--right();

  @media @small {
    order: 2;
  }
}

.naza-experience__info-block--3 {
  .naza-experience__info-block--left();

  @media @small {
    order: 4;
  }
}

.naza-experience__info-block--4 {
  .naza-experience__info-block--right();

  @media @small {
    order: 3;
  }
}

.naza-experience__text-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.naza-experience__subheader {
  font-family: 'Moret', serif;
  font-size: 32px;

  @media @medium-and-below {
    font-size: 35px;
  }

  @media @large-and-up {
    font-size: 42px;
  }
}

.naza-experience__text {
  font-family: 'TT Commons', sans-serif;
  margin: 20px 0;

  @media @medium-and-below {
    font-size: 18px;
    line-height: 27px;
  }

  @media @medium-small {
    font-size: 16px;
  }
}

.naza-experience_image {
  width: 100%;
}

.naza-experience__header {
  width: 100%;
  color: @darkBlue;
}
</style>
