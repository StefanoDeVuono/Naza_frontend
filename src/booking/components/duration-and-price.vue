<template>
  <div class="duration-and-price">
    <div class="container">
      <ClockOutlineIcon :size="16" />
      <label>{{ formattedHours(duration) }}</label>
    </div>

    <div class="divider"></div>

    <div class="container">
      <TagIcon :size="16" />
      <label>{{ formattedPrice(price) }}</label>
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
      shared: Storage.sharedState,
    }
  },
  props: {
    duration: Number,
    price: Number,
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
@import '../../../styles/util.less';
@import '../../common/utils.less';

.duration-and-price {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  .container {
    display: flex;
    flex-direction: row;
    justify-content: center;

    label {
      font-family: 'TTCommons', sans-serif;
      margin-left: 0.5em;
      font-size: 12px;
      line-height: 1.8;
      color: #1c3042;
    }
  }

  .divider {
    border-left: 1px solid @darkBlue;
    width: 1px;
    height: 1em;
    margin: 0 10px;
  }
}
</style>
