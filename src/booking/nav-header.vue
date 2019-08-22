<template>
  <div class="booking-nav-header">
    <div class="back-arrow">
      <KeyboardBackspaceIcon @click="goBack" v-if="showBackArrow" />
    </div>
  </div>
</template>

<script>
// import 'vue-material-design-icons/styles.css'
import KeyboardBackspaceIcon from 'vue-material-design-icons/KeyboardBackspace.vue'

export default {
  props: {
    showBackArrow: Boolean,
  },

  methods: {
    goBack: function() {
      this.$router.go(-1)
    }
  },

  components: {
    KeyboardBackspaceIcon,
  },
}
</script>

<style lang="less">
@import '../../styles/util.less';

.material-design-icon.keyboard-backspace-icon,
.material-design-icon.keyboard-backspace-icon > .material-design-icon__svg {
  height: 25px;
  width: 25px;
}

.booking-nav-header {
  .flex-parent();
  .flex-direction('column');
  .flex-justify-content('space-between');

  .back-arrow {
    color: white;
  }
}
</style>
