<template>
  <div>
    <ForgotPasswordModal :initialEmail="email" />

    <div class="sign-in form-wrapper">
      <div class="form-inner-wrapper">
        <div v-show="errorMsg" class="errors">
          {{ errorMsg }}
        </div>

        <form autocomplete="on" method="POST" @submit.stop.prevent="signIn">
          <div class="field-list clear">
            <div class="form-item field email">
              <label
                class="title"
                for="email"
                >Email Address:</label
              >

              <input
                class="field-element"
                name="email"
                type="email"
                autocomplete="off"
                v-model="email"
                spellcheck="false"
              />
            </div>

            <div class="form-item field password">
              <label
                class="title"
                for="password"
                >Password:</label
              >

              <input
                class="field-element"
                type="password"
                autocomplete="off"
                v-model="password"
              />

              <p class="forgot-password">
                <a href="#" @click.prevent.stop="openForgotPasswordModal"
                  >Forgot password?</a
                >
              </p>
            </div>
          </div>

          <SqButton :onClick="signIn" label="Login" />
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import 'whatwg-fetch'
import { getAppServer } from 'common/constants'
import { parse } from 'jsonapi-parse'
import Storage from 'common/storage'
import { loadUserFromToken } from 'common/utils'
import ForgotPasswordModal from './forgot-password.vue'
import SqButton from 'common/sq-button.vue'

export default {
  data() {
    return {
      shared: Storage.sharedState,
      errorMsg: undefined,

      email: 'albert@carbonfive.com',
      password: 'spree123',
    }
  },

  props: {
    onSubmit: Function,
  },

  methods: {
    loadUserFromToken,

    openForgotPasswordModal() {
      this.$modal.show('forgot-password')
    },

    signIn() {
      const credentials = {
        spree_user: {
          email: this.email,
          password: this.password,
        },
      }

      fetch(getAppServer() + '/naza/session.json', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      })
        .then(response => {
          if (response.ok) {
            return response.json()
          } else {
            return response.json().then(json => Promise.reject(json))
          }
        })
        .then(json => {
          this.shared.userToken = parse(json).data.authentication_token
          this.$session.set('email', this.email)
          this.$session.set('userToken', this.shared.userToken)
          this.$root.$emit('payment-information:show')

          return loadUserFromToken(this.email, this.shared.userToken)
        })
        .then(() => {
          this.onSubmit()
        })
        .catch(err => {
          this.errorMsg = err['message']
        })
    },
  },

  components: {
    ForgotPasswordModal,
    SqButton
  },
}
</script>

<style lang="less" scoped>
@import '../common/utils.less';

.sign-in {
  padding-bottom: 50px;

  label {
    .sans-serif();
    font-size: 16px;
  }

  .field-list .field .field-element {
    .sans-serif();
    border: 2px solid @darkBlue;
    padding: 15px 10px;
    font-size: 16px;
  }

  a {
    text-decoration: underline;
    font-weight: bold;
  }

  .forgot-password {
    text-align: center;
    font-size: 16px;
  }
}

.errors {
  background-color: @lightGray;
  color: red;
  font-weight: bold;
  margin: 0;
}
</style>
