<template>
  <div class="duration-and-cost">
    <div class="container">
      <ClockOutlineIcon :size="16" />
    </div>

    <div class="container">
      <TagIcon :size="16" />
    </div>
  </div>
</template>

<script>
  import ClockOutlineIcon from 'vue-material-design-icons/ClockOutline.vue'
  import TagIcon from 'vue-material-design-icons/Tag.vue'

  export default {
    props: ['duration', 'cost'],
    components: {
      ClockOutlineIcon,
      TagIcon
    }
  }
</script>

<style lang="less">
  @import '../../styles/util.less';

  .duration-and-cost {
    display: flex;
    .flex-direction(row);

    .container {
      flex-basis: '0%';
    }
  }
</style>
