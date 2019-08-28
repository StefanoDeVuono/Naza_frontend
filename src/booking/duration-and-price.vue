<template>
  <div class="duration-and-price">
    <div class="container">
      <ClockOutlineIcon />
      <label>{{ formattedHours(shared.duration) }}</label>
    </div>

    <div class="container">
      <TagIcon />
      <label>{{ formattedPrice(shared.price) }}</label>
    </div>
  </div>
</template>

<script>
  import ClockOutlineIcon from 'vue-material-design-icons/ClockOutline.vue'
  import TagIcon from 'vue-material-design-icons/TagOutline.vue'
  import { formattedHours, formattedPrice } from 'common/utils'
  import Storage from 'common/storage'

  export default {
    data: function() {
      return {
        shared: Storage.sharedState
      }
    },
    components: {
      ClockOutlineIcon,
      TagIcon,
    },
    methods: {
      formattedPrice,
      formattedHours,
    },
  }
</script>

<style lang="less">
  @import '../../styles/util.less';

  .material-design-icon.clock-outline-icon,
  .material-design-icon.clock-outline-icon > .material-design-icon__svg {
    height: 16px;
    width: 16px;
  }

  .material-design-icon.tag-outline-icon,
  .material-design-icon.tag-outline-icon > .material-design-icon__svg {
    height: 16px;
    width: 16px;
  }

  .duration-and-price {
    display: flex;
    flex-direction: row;

    .container {
      flex-basis: 70px;
      display: flex;
      align-items: center;

      label {
        margin-left: 0.5em;
        font-size: 10px;
        line-height: 1.8;
        color: #1c3042;
      }
    }
  }
</style>
