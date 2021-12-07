<template>
  <div class="page">
    <div class="not-found__content">
      <h1 class="not-found__heading">
        Yikes we can’t find this page -- the worst!
      </h1>
      <p class="not-found__text">
        Almost as bad when your new stylist splits that last piece of hair into 20 more braids.
      </p>
      <p class="not-found__text">
        Thank goodness, this is not <span class="not-found__text--italic">that</span> serious
      </p>
      <BookButton buttonText="Head back to booking" />
    </div>
  </div>
</template>

<script>
import BookButton from './book-button.vue'

export default {
  components: {
    BookButton,
  }
}
</script>

<style lang="less" scoped>
@import './utils.less';

.page {
  .ignore-parent-padding();

  background-image: url("https://projectcurl-assets.s3.amazonaws.com/ErrorPage/404.jpeg");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  height: calc(100vh - 67px);
  color: #fff;

  @media @extra-small {
    background-image: url("https://projectcurl-assets.s3.amazonaws.com/ErrorPage/404-mobile.jpeg");
  }
}

.not-found__content {
  max-width: 550px;
  padding: 20vh 5vw 0;

  @media @extra-small {
    padding: 15vh 5vw 0;
  }
}

.not-found__heading {
  color: #fff;
  font-size: 64px;
  margin-bottom: 1vh;

  @media @extra-small {
    font-size: 50px;
  }
}

.not-found__text {
  font-size: 24px;
}

.not-found__text--italic {
  font-size: 24px;
  font-style: italic;
}
</style>
