<template>
  <div class="naza-labs">
    <div class="naza-labs__info-container">
      <div class="naza-labs__header landing-header">
        <div class="landing-header__text--underline">join</div>
        <div class="landing-header__text">naza</div>
        <div class="landing-header__text">labs</div>
      </div>
      <div class="naza-labs__tagline">
        The most comprehensive community-driven product development for Black
        women
      </div>
      <div class="naza-labs__text">
        We are much bigger than a salon space. We are changing the dynamic
        around who gets to try, produce, review, and sell products catered to
        Black women. We want to hear your voice. We want to build this with you.
        Sign up to be one of our 10,000 Naza Labs members.
      </div>
      <div class="naza-labs__button-container">
        <a
          class="naza-labs__button"
          href="https://www.surveymonkey.com/r/5QQRMJG"
          >join us</a
        >
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

.naza-labs {
  background-image: url('/assets/images/naza-labs-large.jpg');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  height: 850px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: @white;

  @media @small {
    background-image: url('/assets/images/naza-labs.jpg');
    height: auto;
  }
}

.naza-labs__info-container {
  background-color: @brown-60;
  padding: 40px 50px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: center;

  @media @medium-and-up {
    max-width: 500px;
  }

  @media @medium-and-below {
    width: 100%;
  }
}

.naza-labs__header {
  width: 100%;
}

.naza-labs__tagline {
  font-family: 'Moret', serif;
  font-size: 35px;
  line-height: 40px;
  margin: 20px 0;
}

.naza-labs__text {
  font-family: 'TT Commons', sans-serif;
  font-size: 18px;
  line-height: 26px;
}

.naza-labs__button-container {
  display: flex;
  justify-content: center;
  margin: 40px 0 0;
}

.naza-labs__button {
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
</style>
