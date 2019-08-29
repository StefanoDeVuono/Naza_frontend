<template>
  <div>
    <h1>Confirmation</h1>
    <button @click="createCart">Create Order</button>
  </div>
</template>

<script>
import 'whatwg-fetch'
import { getSpreeServer } from 'common/constants'
import { mockProductIfDevelopment } from 'common/utils'
import Storage from 'common/storage'

export default {
  data() {
    return {
      shared: Storage.sharedState,
    }
  },

  methods: {
    createCart() {
      const data = {}

      fetch(getSpreeServer() + '/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then(resp => resp.json())
        .then(json => {
          this.shared.orderNumber = json.data.attributes.number
          this.shared.orderToken = json.data.attributes.token
        })
    },
  },

  created() {
    mockProductIfDevelopment()
  },
}
</script>
