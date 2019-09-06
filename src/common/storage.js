import Vue from 'vue'

// this keeps track of the selected product, customizations,
// add-ons, and appointment time.

export default {
  debug: true || process.env === 'development',

  sharedState: {
    product: undefined,
    customizations: {},
    selectedTime: undefined,
    variant: undefined,

    customerFirstName: undefined,
    customerLastName: undefined,
    customerPhone: undefined,
    customerEmail: undefined,
    customerZipCode: undefined,
    customerPassword: undefined,
    note: undefined,

    stripePaymentMethod: undefined,

    orderNumber: undefined,
    orderToken: undefined,

    // these aren't strictly necessary and just stored here
    // for caching
    price: undefined,
    duration: undefined,
    taxonName: undefined,
  },

  reset() {
    Object.keys(this.sharedState).forEach(x => {
      this.sharedState[x] = undefined
    })
    this.sharedState.customizations = {}
  },

  setStripePaymentMethod(stripePaymentMethod) {
    Vue.set(this.sharedState, 'stripePaymentMethod', stripePaymentMethod)
  },

  setProduct(product) {
    Vue.set(this.sharedState, 'product', product)

    if (this.debug) {
      console.log('setting product')
    }
  },

  setVariant(variant) {
    Vue.set(this.sharedState, 'variant', variant)

    if (this.debug) {
      console.log('setting variant')
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
  },
}
