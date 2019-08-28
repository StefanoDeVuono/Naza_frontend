import Vue from 'vue'

// this keeps track of the selected product, customizations,
// add-ons, and appointment time.

export default {
  debug: true,

  sharedState: {
    product: undefined,
    customizations: {},
    selectedTime: undefined,
    price: undefined,
    duration: undefined,
    taxonName: undefined,
  },

  setProduct(product) {
    Vue.set(this.sharedState, 'product', product)

    if (this.debug) {
      console.log('setting product')
    }
  },

  setCustomization(key, value) {
    Vue.set(this.sharedState.customizations, key, value)

    if (this.debug) {
      console.log('setting customization', key, value)      
    }
  },

  setSelectedTime(time) {
    Vue.set(this.sharedState, 'selectedTime', time)

    if (this.debug) {
      console.log('setting selected time', time)
    }
  },

  setPrice(price) {
    Vue.set(this.sharedState, 'price', price)

    if (this.debug) {
      console.log('setting price', price)
    }
  },

  setDuration(duration) {
    Vue.set(this.sharedState, 'duration', duration)

    if (this.debug) {
      console.log('setting duration', duration)
    }
  },

  setTaxonName(taxonName) {
    Vue.set(this.sharedState, 'taxonName', taxonName)

    if (this.debug) {
      console.log('setting taxonName', taxonName)
    }
  }
}
