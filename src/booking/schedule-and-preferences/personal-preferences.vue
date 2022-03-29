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
            name="Chattiness"
            caption="Choose the level of interaction you're looking for"
            v-model="shared.prefChattiness"
            :options="chattinessOptions"
          />
        </div>

        <div class="form-item">
          <RadioButtonGrouping
            name="Scalp Tenderness"
            caption="Choose your scalp tenderness:"
            v-model="shared.prefScalpTenderness"
            :options="scalpTendernessOptions"
          />
        </div>

        <div class="form-item">
          <label class="title" for="sensitivities"
            >Are there any areas we should be sensitive to? Do you work with the following?</label
          >
          <p class="caption">Alopecia, Concentrated Thinning/Bald Patch, Thinning or Sensitive Edges, Flaky Scalp</p>

          <input
            type="text"
            name="sensitivities"
            v-model="shared.sensitivities"
            class="field-element text"
          />
        </div>

        <div class="form-item">
          <label class="title" for="allergies">
            Have you ever had (or even suspected) an allergic reaction to any type of braiding hair?
          </label>
          <input
            type="text"
            name="allergies"
            v-model="shared.allergies"
            class="field-element text"
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

        <div class="form-item field text">
          <label class="title" for="occasion">What’s the occasion?</label>
          <p class="text__caption">We want to hear it all — Birthdays, Weddings, Upcoming Party, Graduations, Promotions, Traveling, or just because!</p>
          <textarea
            class="field-element text"
            type="text"
            v-model="shared.occasion"
            name="occasion"
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
    chattinessOptions() {
      return ['Chat Away', 'Just a Skosh', 'No Talking']
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

  .text__caption {
    font-size: 16px;
    margin-bottom: 20px;
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
        box-sizing: border-box;
        border: 2px solid @darkBlue;
        width: 100%;
        padding: 15px 10px;
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
