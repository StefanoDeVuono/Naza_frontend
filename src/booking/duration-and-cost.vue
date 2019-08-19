<template>
  <div class="duration-and-cost">
    <div class="container">
      <ClockOutlineIcon />
      <label>{{ formattedHours(duration) }}</label>
    </div>

    <div class="container">
      <TagIcon />
      <label>{{ formattedCost(cost) }}</label>
    </div>
  </div>
</template>

<script>
import ClockOutlineIcon from 'vue-material-design-icons/ClockOutline.vue'
import TagIcon from 'vue-material-design-icons/TagOutline.vue'
import { formattedHours, formattedCost } from 'common/utils'

export default {
  props: ['duration', 'cost'],
  components: {
    ClockOutlineIcon,
    TagIcon,
  },
  methods: {
    formattedCost,
    formattedHours
  }
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

.duration-and-cost {
  display: flex;
  flex-direction: row;

  .container {
    flex-basis: 70px;
    display: flex;
    align-items: center;

    label {
      padding-top: 0.7em;
      margin-left: 0.5em;
      font-size: 10px;
      line-height: 1.8;
      color: #1c3042;
    }
  }
}
</style>
