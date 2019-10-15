<template>
  <div class="book-button" @click="handleClick" role="button">
    <div class="book-button__inner-border">
      <div class="book-button__text">
        Book an appointment
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    handleClick(e) {
      this.$router.push({ name: 'how-it-works' })
    },
  },
}
</script>

<style lang="less" scoped>
@import '../../common/utils.less';

.book-button {
  display: block;
  padding: 2px;
  background-color: @orange;
  border: 1px solid @white;
  text-align: center;
  max-width: 260px;
}

.book-button__inner-border {
  border: 1px solid @white;
  padding: 11px 46px;
}

.book-button__text {
  font-family: 'TTCommons', sans-serif;
  font-weight: 500;
  font-size: 14px;
  letter-spacing: 0.5px;
  white-space: nowrap;
  text-transform: uppercase;
  color: @white;
}
</style>
