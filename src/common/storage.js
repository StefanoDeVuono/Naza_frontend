import Vue from 'vue'

// this keeps track of the selected product, customizations,
// add-ons, and appointment time.

import { isNil } from 'ramda'

export default {
  debug: false,

  sharedState: {
    userToken: undefined,

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
    canReceiveEmailReminders: undefined,
    canReceiveSmsReminders: true,
    note: undefined,
    prefScalpTenderness: undefined,
    selectedDrinkAddOnId: undefined,
    selectedDrinkAddOnString: undefined,
    selectedFreeAddOns: {},
    selectedPremiumAddOns: {},
    allergies: undefined,
    sensitivities: undefined,
    occasion: undefined,
    inspirationUrl: undefined,
    hairLength: undefined,
    hairTexture: undefined,

    stripePaymentMethod: undefined,
    stripeCustomerId: undefined,

    orderNumber: undefined,
    orderToken: undefined,

    // these aren't strictly necessary and just stored here
    // for caching
    price: undefined,
    duration: undefined,
    taxonName: undefined,
    location: "SF"
  },

  reset() {
    Object.keys(this.sharedState).forEach(x => {
      this.sharedState[x] = undefined
    })
    this.sharedState.customizations = {}
    this.sharedState.selectedFreeAddOns = {}
    this.sharedState.selectedPremiumAddOns = {}
  },

  loggedIn() {
    return !isNil(this.sharedState.userToken)
  },

  setBoulevardCartId(boulevardCartId) {
    this.sharedState.boulevardCartId = boulevardCartId
  },

  setBoulevardClientId(boulevardClientId) {
    this.sharedState.boulevardClientId = boulevardClientId
  },
  setBoulevardTimeId(boulevardTimeId) {
    this.sharedState.boulevardTimeId = boulevardTimeId
  },

  setStripePaymentMethod(stripePaymentMethod) {
    this.sharedState.stripePaymentMethod = stripePaymentMethod
  },

  setProduct(product) {
    this.sharedState.product = product

    if (this.debug) {
      console.log('setting product', product)
    }
  },

  setVariant(variant) {
    this.sharedState.variant = variant

    if (this.debug) {
      console.log('setting variant')
    }
  },

  setCustomerName(firstName, lastName) {
    this.sharedState.customerFirstName = firstName
    this.sharedState.customerLastName = lastName

    if (this.debug) {
      console.log('setting customer name', firstName, lastName)
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
