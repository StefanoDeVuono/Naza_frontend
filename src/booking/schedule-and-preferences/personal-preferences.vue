<template>
  <Section title="Personal Preferences" name="personal-preferences">
    <template v-slot:header-icon>
      <ShampooIcon class="header-icon" />
    </template>

    <div class="personal-preferences form-wrapper">
      <p>
        We want to make sure you get the best service. Please select the
        following options.
      </p>

      <div class="field-list">
        <div class="form-item">
          <RadioButtonGrouping
            name="Scalp Tenderness"
            caption="Choose your scalp tenderness:"
            v-model="shared.prefScalpTenderness"
            :options="scalpTendernessOptions"
          />
        </div>

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
import Section from '../components/section.vue'
import RadioButtonGrouping from 'common/simple-radio-button-grouping.vue'

export default {
  data() {
    return {
      shared: Storage.sharedState,
    }
  },
  computed: {
    scalpTendernessOptions() {
      return ['Not Sensitive', 'Sensitive']
    },
  },
  methods: {},
  components: {
    ShampooIcon,
    Section,
    RadioButtonGrouping,
  },
}
</script>

<style lang="less" scoped>
@import '../../common/utils.less';

.personal-preferences {
  p {
    margin-bottom: 40px;
  }

  h2 {
    margin: 0;
  }

  .field-list {
    .form-item {
      margin-bottom: 40px;

      &:last-child {
        margin-bottom: 20px;
      }

      .header {
        display: block;

        h2 {
          text-align: left;
          margin: 0;
          font-size: 18px;
        }
      }

      .field-element {
        border: 2px solid @darkBlue;
      }

      label {
        .sans-serif();
        margin: 0 0 15px 0;
        font-size: 18px;
        font-weight: bold;
      }
    }
  }
}
</style>
