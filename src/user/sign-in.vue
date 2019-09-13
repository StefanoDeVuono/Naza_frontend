<template>
  <div class="sign-in form-wrapper">
    <div class="form-inner-wrapper">
      <div v-show="errorMsg" class="errors">
        {{ errorMsg }}
      </div>

      <form autocomplete="on" method="POST" @submit.prevent="signIn">
        <div class="field-list clear">
          <div class="form-item field email">
            <label
              class="title"
              for="email-yui_3_17_2_1_1568231635626_12630-field"
              >Email</label
            >

            <input
              class="field-element"
              name="email"
              type="email"
              autocomplete="off"
              v-model="email"
              spellcheck="false"
              style='background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAASCAYAAABSO15qAAAAAXNSR0IArs4c6QAAAUBJREFUOBGVVE2ORUAQLvIS4gwzEysHkHgnkMiEc4zEJXCMNwtWTmDh3UGcYoaFhZUFCzFVnu4wIaiE+vvq6+6qTgthGH6O4/jA7x1OiCAIPwj7CoLgSXDxSjEVzAt9k01CBKdWfsFf/2WNuEwc2YqigKZpK9glAlVVwTTNbQJZlnlCkiTAZnF/mePB2biRdhwHdF2HJEmgaRrwPA+qqoI4jle5/8XkXzrCFoHg+/5ICdpm13UTho7Q9/0WnsfwiL/ouHwHrJgQR8WEwVG+oXpMPaDAkdzvd7AsC8qyhCiKJjiRnCKwbRsMw9hcQ5zv9maSBeu6hjRNYRgGFuKaCNwjkjzPoSiK1d1gDDecQobOBwswzabD/D3Np7AHOIrvNpHmPI+Kc2RZBm3bcp8wuwSIot7QQ0PznoR6wYSK0Xb/AGVLcWwc7Ng3AAAAAElFTkSuQmCC"); background-repeat: no-repeat; background-attachment: scroll; background-size: 16px 18px; background-position: 98% 50%; cursor: auto;'
            />
          </div>

          <div class="form-item field password">
            <label
              class="title"
              for="password-yui_3_17_2_1_1568231635626_11851-field"
              >Password</label
            >

            <input
              class="field-element"
              type="password"
              autocomplete="off"
              v-model="password"
              style='background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAASCAYAAABSO15qAAAAAXNSR0IArs4c6QAAAUBJREFUOBGVVE2ORUAQLvIS4gwzEysHkHgnkMiEc4zEJXCMNwtWTmDh3UGcYoaFhZUFCzFVnu4wIaiE+vvq6+6qTgthGH6O4/jA7x1OiCAIPwj7CoLgSXDxSjEVzAt9k01CBKdWfsFf/2WNuEwc2YqigKZpK9glAlVVwTTNbQJZlnlCkiTAZnF/mePB2biRdhwHdF2HJEmgaRrwPA+qqoI4jle5/8XkXzrCFoHg+/5ICdpm13UTho7Q9/0WnsfwiL/ouHwHrJgQR8WEwVG+oXpMPaDAkdzvd7AsC8qyhCiKJjiRnCKwbRsMw9hcQ5zv9maSBeu6hjRNYRgGFuKaCNwjkjzPoSiK1d1gDDecQobOBwswzabD/D3Np7AHOIrvNpHmPI+Kc2RZBm3bcp8wuwSIot7QQ0PznoR6wYSK0Xb/AGVLcWwc7Ng3AAAAAElFTkSuQmCC"); background-repeat: no-repeat; background-attachment: scroll; background-size: 16px 18px; background-position: 98% 50%;'
            />
          </div>
        </div>

        <div class="form-button-wrapper form-button-wrapper--align-left">
          <input
            class="button sqs-system-button sqs-editable-button"
            type="submit"
            value="Login"
          />
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import 'whatwg-fetch'
import { getAppServer } from 'common/constants'
import { parse } from 'jsonapi-parse'
import Storage from 'common/storage'
import { loadUserFromToken } from 'common/utils'

export default {
  data() {
    return {
      shared: Storage.sharedState,
      errorMsg: undefined,

      email: 'albert@carbonfive.com',
      password: 'spree123',
    }
  },

  methods: {
    loadUserFromToken,

    signIn() {
      const credentials = {
        sign_in: {
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
          this.$router.push({
            name: 'categories',
          })
        })
        .catch(err => {
          this.errorMsg = err['message']
        })
    },
  },
}
</script>

<style lang="less" scoped>
@import '../common/utils.less';

.sign-in {
  padding-bottom: 50px;
}

.errors {
  background-color: @lightGray;
  color: red;
  font-weight: bold;
  margin: 0;
}
</style>
