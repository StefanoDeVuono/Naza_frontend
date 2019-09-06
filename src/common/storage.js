import Vue from 'vue'

// this keeps track of the selected product, customizations,
// add-ons, and appointment time.

export default {
  debug: true,

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
    prefScalpTenderness: undefined,
    drinkAddOns: undefined,
    freeAddOns: undefined,
    premiumAddOns: undefined,

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
    this.sharedState.stripePaymentMethod = stripePaymentMethod
  },

  setProduct(product) {
    this.sharedState.product = product

    if (this.debug) {
      console.log('setting product')
    }
  },

  setVariant(variant) {
    this.sharedState.variant = variant

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
    this.sharedState.selectedTime = time

    if (this.debug) {
      console.log('setting selected time', time)
    }
  },

  setPrice(price) {
    this.sharedState.price = price

    if (this.debug) {
      console.log('setting price', price)
    }
  },

  setDuration(duration) {
    this.sharedState.duration = duration

    if (this.debug) {
      console.log('setting duration', duration)
    }
  },

  setTaxonName(taxonName) {
    this.sharedState.taxonName = taxonName

    if (this.debug) {
      console.log('setting taxonName', taxonName)
    }
  },
}
