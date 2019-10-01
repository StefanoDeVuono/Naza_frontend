<template>
  <modal
    class="modal"
    name="forgot-password"
    width="100%"
    height="auto"
    :pivot-y="1.0"
  >
    <DecorBorder />
    <div class="content-container">
      <div class="close-cta-container">
        <img
          alt="close"
          src="assets/images/close-icon3x.png"
          srcset="
            assets/images/close-icon.png,
            assets/images/close-icon@2x.png 2x
          "
          class="close-cta"
          @click="closeModal"
        />
      </div>
      <div v-show="isSubmitted" class="confirm-password">
        <div>
          <p>
            You will receive an email shortly with instructions on how to change
            your password.
          </p>

          <input
            class="submit-button"
            type="submit"
            value="Return"
            @click="closeModal"
          />
        </div>
      </div>

      <div v-show="!isSubmitted" class="forgot-password">
        <div class="title-container">
          <span class="title">Reset Password</span>
        </div>

        <form autocomplete="on" method="POST" @submit.stop.prevent="submitForm">
          <div class="field-list clear">
            <div class="form-item field email">
              <label for="email-yui_3_17_2_1_1568231635626_12630-field">
                <span class="label-content">Email Address:</span>
              </label>

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
          </div>
          <input
            class="submit-button"
            type="submit"
            value="Reset"
            @click="submitForm"
          />
        </form>
      </div>
    </div>
    <DecorBorder :flip="true" />
  </modal>
</template>

<script>
import { getAppServer } from 'common/constants'
import DecorBorder from 'common/decor-border.vue'

export default {
  props: {
    initialEmail: String,
  },

  methods: {
    submitForm(event) {
      event.stopPropagation()
      event.preventDefault()

      const data = {
        spree_user: {
          email: this.email,
        },
      }

      fetch(getAppServer() + '/naza/user_passwords.json', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      }).then(() => {
        this.isSubmitted = true
      })
    },

    closeModal() {
      this.$modal.hide('forgot-password')
      this.isSubmitted = false
    },
  },

  data() {
    return {
      email: this.initialEmail,
      isSubmitted: false,
    }
  },

  components: {
    DecorBorder,
  },
}
</script>

<style lang="less">
@import '../common/utils.less';

.confirm-password {
  display: flex;
  justify-content: center;
  align-items: center;

  div {
    flex-grow: 1;
    padding: 40px 20px;
  }
}

.forgot-password {
  .title-container {
    margin-bottom: 15px;
  }

  .title {
    text-transform: uppercase;
    font-size: 18px;
    font-weight: 500;
    line-height: 1;
  }
}

.v--modal-overlay {
  .v--modal-box {
    .border {
      background: @lightGray;
      display: flex;

      &.bottom {
        align-items: flex-end;
      }

      img {
        width: 100%;
      }
    }

    .content-container {
      padding-right: 20px;
      padding-left: 20px;
      padding-bottom: 40px;
      background: white;
    }

    .close-cta-container {
      display: flex;
      justify-content: flex-end;
      margin-bottom: 28px;
    }

    .close-cta {
      width: 11.4px;
    }

    .submit-button {
      margin-top: 20px;
      font-family: 'TTCommons', sans-serif;
      font-size: 16px;
      font-weight: 500;
      line-height: 1.5;
      letter-spacing: 0.5px;
    }
  }
}

.field-list .form-item.email {
  .label-content {
    font-weight: 400;
    letter-spacing: 0.2px;
  }

  .field-element {
    border: solid 2px @darkBlue;
  }
}
</style>
