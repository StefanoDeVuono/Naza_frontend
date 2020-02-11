<template>
  <div class="meet-stylists">
    <div class="meet-stylists__image-container">
      <img
        class="meet-stylists__image--small"
        src="/assets/images/meet-stylists.jpg"
        alt="stylist styling hair"
      />
      <img
        class="meet-stylists__image--large"
        src="/assets/images/meet-stylists-large.jpg"
        alt="stylist styling hair"
      />
    </div>
    <div class="meet-stylists__info-container">
      <div class="meet-stylists__header landing-header">
        <div class="landing-header__text">meet</div>
        <div class="landing-header__text--underline">our</div>
        <div class="landing-header__text">stylists</div>
      </div>

      <div class="meet-stylists__button-container">
        <a class="meet-stylists__button" href="/gallery">see our work</a>
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

.meet-stylists {
  width: 100%;
  color: @white;
  position: relative;
}

.meet-stylists__image--small {
  .hide-on-medium-and-up();

  width: 100%;
}

.meet-stylists__image--large {
  .hide-on-small();

  width: 100%;
  object-fit: cover;
}

.meet-stylists__info-container {
  position: absolute;
  top: 0;
  width: 100%;
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
</style>
