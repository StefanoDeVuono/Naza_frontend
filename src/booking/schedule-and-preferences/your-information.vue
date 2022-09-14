<template>
  <Section title="Your Information" name="your-information">
    <template v-slot:header-icon>
      <HairstyleIcon class="header-icon" />
    </template>

    <div class="your-information form-wrapper">
      <div v-show="isLoginVisible">
        <p>
          New to Naza Beauty?
          <a @click.prevent="showInfo">Sign up</a>
        </p>
        <SignInForm :onSubmit="onSignIn" />
      </div>

      <div v-show="!isLoginVisible" class="field-list">
        <p v-if="!loggedIn">
          Returning?
          <a @click.prevent="showLogin">Login</a>
        </p>

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
            :disabled="loggedIn"
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
          <!-- <div v-if=validPhoneLength> error</div> -->
        </div>

        <div v-if="!loggedIn" class="form-item field password required">
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
            <img
              v-show="!shared.canReceiveEmailReminders"
              src="/assets/images/checkbox.png"
              srcset="
                /assets/images/checkbox.png    1x,
                /assets/images/checkbox@2x.png 2x,
                /assets/images/checkbox@3x.png 3x
              "
            />
            <img
              v-show="shared.canReceiveEmailReminders"
              src="/assets/images/checkbox+V.png"
              srcset="
                /assets/images/checkbox+V.png    1x,
                /assets/images/checkbox+V@2x.png 2x,
                /assets/images/checkbox+V@3x.png 3x
              "
            />
            <label for="email-reminders">
              I would like to receive booking reminders via email
              <input
                v-model="shared.canReceiveEmailReminders"
                type="checkbox"
                name="email-reminders"
                id="email-reminders"
              />
            </label>
          </div>
        </div>

        <div class="form-item field checkbox">
          <div class="option">
            <img
              v-show="!shared.canReceiveSmsReminders"
              src="/assets/images/checkbox.png"
              srcset="
                /assets/images/checkbox.png    1x,
                /assets/images/checkbox@2x.png 2x,
                /assets/images/checkbox@3x.png 3x
              "
            />
            <img
              v-show="shared.canReceiveSmsReminders"
              src="/assets/images/checkbox+V.png"
              srcset="
                /assets/images/checkbox+V.png    1x,
                /assets/images/checkbox+V@2x.png 2x,
                /assets/images/checkbox+V@3x.png 3x
              "
            />
            <label>
              I understand I will receive SMS updates about this booking
              (required)
              <input
                v-model="shared.canReceiveSmsReminders"
                type="checkbox"
                name="sms-reminders"
                id="sms-reminders"
              />
            </label>
          </div>
        </div>

        <PaymentInfo @stripe-setup-intent-error="handleStripeServerError" />
      </div>
    </div>
  </Section>
</template>

<script>
import Storage from 'common/storage'
import HairstyleIcon from 'images/noun_hairstyle_1105146.svg'
import Section from '../components/section.vue'
import { isNil, isEmpty, find, prop } from 'ramda'
import { getAppServer } from 'common/constants'
import SignInForm from '../../user/sign-in-form.vue'
import PaymentInfo from './payment-info.vue'

export default {
  data() {
    return {
      shared: Storage.sharedState,
      isCompleted: false,
      isLoginVisible: false,
    }
  },
  computed: {
    loggedIn() {
      return Storage.loggedIn()
    },
  },
  methods: {
    isNil,
    handleStripeServerError() {
      this.$emit('stripe-setup-intent-error')
    },
    showLogin() {
      this.isLoginVisible = true
    },
    showInfo() {
      this.isLoginVisible = false
    },
    onSignIn() {
      this.showInfo()
    },
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
    SignInForm,
    PaymentInfo,
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

<style lang="less" scoped>
@import '../../common/utils.less';

.your-information {
  p {
    a {
      text-decoration: underline;
      font-weight: bold;
    }
  }

  .field-list {
    .field {
      margin-bottom: 30px;

      .field-element {
        border: 2px solid @darkBlue;
        font-family: 'TTCommons', sans-serif;
        font-size: 16px;

        &[disabled] {
          color: lighten(greyscale(@darkBlue, 100%), 50%);
        }
      }
    }

    .title {
      font-family: 'TTCommons', sans-serif;
      font-size: 16px;
      font-weight: normal;
      margin: 0;
    }
  }

  .form-item.checkbox .option {
    border: none;

    input {
      visibility: hidden;
      height: 0;
      width: 0;
    }

    img {
      vertical-align: text-top;
      margin-right: 10px;
    }

    label {
      vertical-align: text-top;
      display: inline-block;
      width: 80%;
      font-family: 'TTCommons', sans-serif;
      font-size: 16px;
      font-weight: normal;
      line-height: 1;
    }
  }
}
</style>
