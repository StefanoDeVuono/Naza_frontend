<template>
  <Section title="Personal Preferences" name="personal-preferences">
    <template v-slot:header-icon>
      <ShampooIcon class="header-icon" />
    </template>

    <div class="your-information form-wrapper">

      <div class="field-list">
        <div class="form-item field text">
          <label class="title" for="note">Note For Your Stylist</label>
          <textarea
            class="field-element text"
            type="text"
            v-model="shared.note"
            name="note"
          ></textarea>
        </div>
      </div>
    </div>
  </Section>
</template>

<script>
import Storage from 'common/storage'
import ShampooIcon from 'images/noun_shampoo_2677530.svg'
import Section from '../section.vue'

export default {
  data() {
    return {
      shared: Storage.sharedState,
    }
  },
  methods: {
  },
  components: {
    ShampooIcon,
    Section,
  },
}
</script>

<style lang="less">
@import '../../common/utils.less';

</style>
