<template>
  <div class="naza-experience">
    <div class="naza-experience__info-container">
      <div class="naza-experience__header landing-header">
        <div class="landing-header__text--underline">the</div>
        <div class="landing-header__text">naza</div>
        <div class="landing-header__text">experience</div>
      </div>
      <div class="naza-experience__text">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the
      </div>
    </div>
    <div class="naza-experience__images-container">
      <img
        class="naza-experience_image--design"
        src="/assets/images/naza-drinks.jpg"
        alt="design"
      />
      <img
        class="naza-experience_image--playground"
        src="/assets/images/naza-drinks.jpg"
        alt="playground"
      />
      <img
        class="naza-experience_image--drinks"
        src="/assets/images/naza-drinks.jpg"
        alt="drinks"
      />
      <img
        class="naza-experience_image--4"
        src="/assets/images/naza-drinks.jpg"
        alt="drinks"
      />
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
  margin: 30px 0;
}

.naza-experience__info-container {
  margin: 10px;
}

.naza-experience__text {
  text-align: center;
  font-family: 'TT Commons', sans-serif;
  margin: 20px 10px;
}

.naza-experience__images-container {
  position: relative;
  height: 72vh;
}

.naza-experience_image () {
  position: absolute;
  width: 45%;
}

.naza-experience_image--design {
  .naza-experience_image();
  left: 10px;
}

.naza-experience_image--playground {
  .naza-experience_image();
  right: 10px;
  top: 5vh;
}

.naza-experience_image--drinks {
  .naza-experience_image();
  left: 10px;
  top: 35vh;
}

.naza-experience_image--4 {
  .naza-experience_image();
  right: 10px;
  top: 40vh;
}

.naza-experience__header {
  width: 100%;
  color: @darkBlue;
}
</style>
