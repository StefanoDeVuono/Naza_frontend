<template>
  <Section title="Your Information" name="your-information">
    <template v-slot:header-icon>
      <HairstyleIcon class="header-icon" />
    </template>

    <div class="your-information form-wrapper">
      <p>Returning? <a href="/login">Login</a></p>

      <div class="field-list">
        <div class="form-item field text required">
          <label class="title" for="first-name">First Name:</label>
          <input
            class="field-element text"
            type="text"
            v-model="shared.customerFirstName"
            name="first-name"
            placeholder="First Name"
          />
        </div>

        <div class="form-item field text required">
          <label class="title" for="last-name">Last Name:</label>
          <input
            class="field-element text"
            type="text"
            v-model="shared.customerLastName"
            name="last-name"
            placeholder="Last Name"
          />
        </div>

        <div class="form-item field text required">
          <label class="title" for="zip_code">Zip Code:</label>
          <input
            class="field-element text"
            type="text"
            v-model="shared.customerZipCode"
            name="zip_code"
            placeholder="94321"
          />
        </div>

        <div class="form-item field email required">
          <label class="title" for="email">Email:</label>
          <input
            class="field-element"
            type="email"
            v-model="shared.customerEmail"
            name="email"
            placeholder="name@address.com"
          />
        </div>

        <div class="form-item field text required">
          <label class="title" for="phone">Phone:</label>
          <input
            class="field-element text"
            type="tel"
            v-model="shared.customerPhone"
            name="phone"
            placeholder="123-456-7890"
          />
        </div>

        <div class="form-item field password required">
          <label class="title" for="password">Password:</label>
          <input
            class="field-element password"
            type="password"
            v-model="shared.customerPassword"
            name="password"
            placeholder="Minimum 6 characters"
          />
        </div>

        <div class="form-item field checkbox">
          <div class="option">
            <label for="email-reminders">
              <input
                v-model="shared.canReceiveEmailReminders"
                type="checkbox"
                name="email-reminders"
                id="email-reminders"
              />
              I would like to receive booking reminders via email
            </label>
          </div>
        </div>

        <div class="form-item field checkbox">
          <div class="option">
            <label>
              <input
                v-model="shared.canReceiveSmsReminders"
                type="checkbox"
                name="sms-reminders"
                id="sms-remindders"
              />
              I would like to receive booking reminders via SMS
            </label>
          </div>
        </div>
      </div>
    </div>
  </Section>
</template>

<script>
import Storage from 'common/storage'
import HairstyleIcon from 'images/noun_hairstyle_1105146.svg'
import Section from '../components/section.vue'
import { isNil, isEmpty, find, prop } from 'ramda'

export default {
  data() {
    return {
      shared: Storage.sharedState,
      isCompleted: false,
    }
  },
  methods: {
    checkCompletion() {
      const fields = [
        'customerFirstName',
        'customerLastName',
        'customerZipCode',
        'customerEmail',
        'customerPhone',
        'customerPassword',
      ]
      const emptyField = find(field => {
        const value = prop(field, this.shared)

        if (field === 'customerPassword') {
          return isNil(value) || isEmpty(value) || value.length < 6
        }

        return isNil(value) || isEmpty(value)
      }, fields)

      if (emptyField) {
        this.isCompleted = false
      } else {
        this.isCompleted = true
        // this.$root.$emit('your-information:hide')
        this.$root.$emit('payment-information:show')
      }
    },
  },
  components: {
    HairstyleIcon,
    Section,
  },
  created() {
    const fields = [
      'customerName',
      'customerZipCode',
      'customerEmail',
      'customerPhone',
      'customerPassword',
    ]
    fields.forEach(field => {
      this.$watch(`shared.${field}`, this.checkCompletion)
    })
  },
}
</script>

<style lang="less">
@import '../../common/utils.less';

.your-information {
  p {
    text-align: center;

    a {
      text-decoration: underline;
      font-weight: bold;
    }
  }

  .form-item.checkbox .option {
    border: none;

    label {
      font-weight: normal;
      line-height: 1;
    }
  }

  .field-list .field .field-element {
    border: 2px solid @darkBlue;
    font-family: sofia-pro;
    font-size: 16px;
  }
}
</style>
