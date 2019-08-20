<template>
  <div class="find-your-style">
    <Accordion>
      <template v-slot:title>
        <span>Not sure what to choose? <strong>Find your style</strong></span>
      </template>

      <p>Gallery</p>
    </Accordion>
  </div>
</template>

<script>
  import Accordion from 'common/accordion.vue'

  export default {
    components: {
      Accordion
    }
  }
</script>

<style lang="less">
  .find-your-style {
    span {
      font-size: 16px;
    }

    strong {
      text-decoration: underline;
    }
  }
</style>
