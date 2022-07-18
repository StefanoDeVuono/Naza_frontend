<template>
  <div>
    <div class="sign-in form-wrapper">
      <div class="form-inner-wrapper">
        <div v-show="errorMsg" class="errors">{{ errorMsg }}</div>
        <div v-show="successMsg" class="success">{{ successMsg }}</div>

        <form autocomplete="on" method="POST" @submit.stop.prevent="signIn">
          <div class="field-list clear">
            <div class="form-item field password">
              <label class="title" for="password">Password:</label>

              <input class="field-element" type="password" autocomplete="off" v-model="password" />
            </div>
          </div>

          <SqButton :onClick="syncServices" label="Sync Services" />
          <SqButton :onClick="syncStaff" label="Sync Staff" />
          <SqButton :onClick="syncSchedules" label="Sync Schedules" />

        </form>
      </div>
    </div>
  </div>
</template>

<script>
import 'whatwg-fetch'
import { getAppServer } from 'common/constants'
import Storage from 'common/storage'

import SqButton from 'common/sq-button.vue'

const sync = (type, that) => fetch(getAppServer() + `/homebase-boulevard-sync/${type}`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    password: that.password,
  }),
})
  .then(response => {
    if (response.ok) {
      return response.json()
    } else {
      return response.json().then(json => Promise.reject(json))
    }
  })
  .then(_ => {
    that.successMsg = `${type} started synching...`
  })
  .catch(err => {
    that.errorMsg = err['message']
  })

export default {
  data() {
    return {
      shared: Storage.sharedState,
      errorMsg: undefined,
      successMsg: undefined,


      password: '',
    }
  },

  props: {
    onSubmit: Function,
  },

  methods: {
    syncServices(e) {
      sync('services', this)
    },

    syncStaff() {
      sync('staff', this)
    },

    syncSchedules() {
      sync('schedules', this)
    },


  },

  components: {
    SqButton,
  },
}
</script>

<style lang="less" scoped>
@import '../common/utils.less';

.sign-in {
  padding: 50px 0;
  max-width: 540px;
  margin: 0 auto;

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
