<template>
  <div>
    <div class="sign-in form-wrapper">
      <div class="form-inner-wrapper">
        <div v-show="errorMsg" class="errors">{{ errorMsg }}</div>
        <div v-show="successMsg" class="success">{{ successMsg }}</div>

        <form autocomplete="on" method="POST" @submit.stop.prevent="syncServices">
          <div class="field-list clear">
            <div class="form-item field password">
              <label class="title" for="password">Password:</label>

              <input class="field-element" type="password" autocomplete="off" v-model="password" />
            </div>
          </div>

          <!-- <SqButton :onClick="syncServices" label="Sync Services" /> -->
          <SqButton :onClick="syncStaff" label="Sync Staff" />
          <SqButton :onClick="syncSchedules" label="Sync Schedules" />

        </form>
      </div>
    </div>
  </div>
</template>

<script>
import 'whatwg-fetch'
import { getAppServer, getSocketServer } from 'common/constants'
import Storage from 'common/storage'

import SqButton from 'common/sq-button.vue'


const getToken = (action, password) => fetch(getAppServer() + `/homebase-boulevard-sync/authenticate`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    password,
    action
  }),
})
  .then(response => {
    if (response.ok) {
      return response.json()
    } else {
      return response.json().then(json => Promise.reject(json))
    }
  })


const createSocket = async (action, context) => {
  const { token } = await getToken(action, context.password)
  const socket = new WebSocket(`${getSocketServer()}/cable?token=${token}`)

  socket.onopen = subscribe(socket, action)
  socket.onmessage = logSocketMessage(socket, action, context)
}

const subscribe = (socket, action) => _event => {
  const subscribe_msg = {
    command: 'subscribe',
    identifier: JSON.stringify({
      channel: 'HomebaseBoulevardSyncChannel',
      action: `sync_${action}`
    })
  }
  socket.send(JSON.stringify(subscribe_msg))
}

const logSocketMessage = (socket, action, context) => event => {
  const incoming_msg = JSON.parse(event.data)

  if (incoming_msg.type === 'ping') return

  if (incoming_msg.type === 'confirm_subscription')
    return context.successMsg = `Sync ${action} started...`

  context.successMsg = ''

  if (incoming_msg?.message?.success) {
    socket.close()
    return context.successMsg = `Synched: ${incoming_msg?.message?.success}`
  }

  if (incoming_msg?.message?.failure) {
    socket.close()
    context.errorMsg = incoming_msg?.message?.failure
  }
}

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
    // syncServices() {
    //   createSocket('services', this)
    // },

    syncStaff() {
      createSocket('staff', this)
    },

    syncSchedules() {
      createSocket('schedules', this)
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
