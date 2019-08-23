<template>
  <div class="accordion">
    <div class="top" v-show="!state.open">
      <slot name="title"></slot>
      <ChevronDownIcon @click="toggleOpen" />
    </div>

    <div class="content" v-show="state.open">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import ChevronDownIcon from 'vue-material-design-icons/ChevronDown.vue'

export default {
  data: function() {
    return {
      state: {
        open: false,
      },
    }
  },
  methods: {
    toggleOpen: function() {
      this.state.open = !this.state.open
    },
  },
  components: {
    ChevronDownIcon,
  },
}
</script>

<style lang="less">
@import '../common/utils.less';

.material-design-icon.chevron-down-icon,
.material-design-icon.chevron-down-icon > .material-design-icon__svg {
  height: 25px;
  width: 25px;
  display: inline-block;
  margin-top: 2px;
}

.accordion {
  .ignore-parent-padding();
  .ignore-parent-padding--add-padding(1);

  background-color: #f7f6f2;
}

.cta {
  flex-grow: 1;
}

.chevron {
  flex-shrink: 1;
}

.top {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
</style>
