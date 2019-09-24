<template>
  <div class="section" :class="{ closed: !isBodyVisible }">
    <div class="header" @click="onToggleBody">
      <slot name="header-icon"></slot>

      <h3>{{ title }}</h3>
      <ChevronUpIcon v-if="showChevron" v-show="isBodyVisible" />
      <ChevronDownIcon v-if="showChevron" v-show="!isBodyVisible" />
    </div>

    <div class="body" v-show="isBodyVisible">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import ChevronDownIcon from 'vue-material-design-icons/ChevronDown.vue'
import ChevronUpIcon from 'vue-material-design-icons/ChevronUp.vue'

export default {
  data() {
    return {
      isBodyVisible: true,
    }
  },

  methods: {
    onToggleBody() {
      this.isBodyVisible = !this.isBodyVisible
    },
  },

  props: {
    title: String,
    name: String,
    initialVisible: {
      default: false,
      type: Boolean,
    },
    showChevron: {
      default: true,
      type: Boolean,
    },
  },

  created() {
    this.isBodyVisible = this.initialVisible
  },

  mounted() {
    this.$root.$on(`${this.name}:show`, () => {
      this.isBodyVisible = true
    })

    this.$root.$on(`${this.name}:hide`, () => {
      this.isBodyVisible = false
    })
  },

  components: {
    ChevronDownIcon,
    ChevronUpIcon,
  },
}
</script>

<style lang="less">
@import '../../common/utils.less';

.section {
  margin-bottom: 20px;

  &.closed {
    border-bottom: 1px solid @darkBlue;
  }

  .header {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;

    h3 {
      color: @darkBlue;
      margin: 0 10px 0 20px;
      font-size: 20px;
      font-weight: bold;
      font-family: 'TTCommons', sans-serif;
      text-align: center;
      text-transform: uppercase;
    }

    .material-design-icon svg {
      transform: translate(0, 5px);
    }
  }
}
</style>
