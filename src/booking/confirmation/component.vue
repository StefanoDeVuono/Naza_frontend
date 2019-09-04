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
  },

  created() {
    mockProductIfDevelopment()
  },
}
</script>
