import { isProduction, getSpreeServer } from 'common/constants'
import Storage from 'common/storage'

export const createCart = () => {
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
}

export const mockProductIfDevelopment = () => {
  if (isProduction()) {
    return
  }

  if (!Storage.sharedState.product) {
    Storage.sharedState.product = {
      name: 'Strawberry Shortcake',
      description: "Don't steal my strawberry!",
    }
    Storage.sharedState.customerName = 'Hibiki Sakura'
    Storage.sharedState.customerZipCode = '12345'
    Storage.sharedState.customerEmail = 'hibiki@silverman.gym'
    Storage.sharedState.customerPhone = '555-555-5555'
  }
}

export const formattedPrice = totalPrice => {
  if (global.Intl) {
    const formatter = new global.Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    })

    return formatter.format(totalPrice)
  } else {
    return `$${totalPrice}`
  }
}

export const formattedHours = totalDuration => {
  if (totalDuration === 0) {
    return '0 HRS'
  } else if (totalDuration <= 60) {
    return '1 HR'
  } else {
    const hours = Math.round(totalDuration / 60)
    return `${hours} HRS`
  }
}
