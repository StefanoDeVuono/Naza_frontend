import {
  isProduction,
  isStaging,
  getSpreeServer,
  getAppServer,
} from 'common/constants'
import Storage from 'common/storage'
import { parse } from 'jsonapi-parse'

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

export const loadUserFromToken = (email, userToken) => {
  return fetch(
    getAppServer() +
      '/naza/users/me.json?spree%2Fuser_email=' +
      email +
      '&spree%2Fuser_token=' +
      userToken +
      '&include=spree_user'
  )
    .then(resp => {
      if (resp.ok) {
        return resp.json()
      } else {
        return resp.json().then(json => Promise.reject(json))
      }
    })
    .then(json => {
      const data = parse(json).data

      if (!data) {
        return
      }

      Storage.sharedState.userToken = userToken
      Storage.sharedState.customerEmail = email
      Storage.sharedState.customerFirstName = data.first_name
      Storage.sharedState.customerLastName = data.last_name
      Storage.sharedState.customerZipCode = data.zip_code
      Storage.sharedState.customerPhone = data.phone_number
      Storage.sharedState.canReceiveSmsReminders =
        data.can_receive_sms_reminders
      Storage.sharedState.canReceiveEmailReminders =
        data.can_receive_email_reminders
    })
}

export const mockProductIfDevelopment = () => {
  if (isProduction() || isStaging()) {
    return
  }

  if (!Storage.sharedState.userToken) {
    // Storage.sharedState.userToken = 'abc'

    Storage.sharedState.product = {
      name: 'Strawberry Shortcake',
      description: "Don't steal my strawberry!",
      images: [
        {
          styles: [
            {},
            {},
            {},
            {
              url:
                '/rails/active_storage/representations/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBFZz09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--a0345c098140ecc5865c1213ab945395c3975ab8/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdCam9MY21WemFYcGxTU0lOTmpBd2VEWXdNRDRHT2daRlZBPT0iLCJleHAiOm51bGwsInB1ciI6InZhcmlhdGlvbiJ9fQ==--0ad03d61523648403b37e889f47a3d7b78145004/Body_Wave.jpeg',
            },
          ],
        },
      ],
      option_types: [],
    }
    Storage.sharedState.price = '123'
    Storage.sharedState.duration = '123'
    Storage.sharedState.taxonName = 'Cakes'
    Storage.sharedState.customerFirstName = 'Hibiki'
    Storage.sharedState.customerLastName = 'Sakura'
    Storage.sharedState.customerZipCode = '12345'
    Storage.sharedState.customerEmail = 'albert@carbonfive.com'
    // Test number from Twilio:https://www.twilio.com/docs/iam/test-credentials
    Storage.sharedState.customerPhone = '500-555-0004'
    Storage.sharedState.customerPassword = 'spree123'
    Storage.sharedState.customizations = {
      Size: 'Medium',
      Length: 'Medium',
      Volume: 'Biggest',
      Color: 'Brown with Blonde Highlights',
    }
    Storage.sharedState.note = 'Extra cheese'
    Storage.sharedState.selectedTime = '2016-12-03T14:00:00-0800'
    Storage.sharedState.drinkAddOn = 'Mocktail'
    Storage.sharedState.freeAddOns = 'Air, Water'
    Storage.sharedState.premiumAddOns = 'Shampoo, Wash, Conditioning'
    Storage.sharedState.selectedFreeAddOns = { 2: 'Candy', 3: 'Fruit' }
    Storage.sharedState.selectedPremiumAddOns = { 1: 'Chocolate' }
    Storage.sharedState.selectedDrinkAddOnString = 'Lemonade'
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

export const formattedHours = (totalDuration, options) => {
  const { singularLabel, pluralLabel } = options || {}
  const singular = singularLabel || 'HR'
  const plural = pluralLabel || 'HRS'

  if (totalDuration === 0) {
    return '0 ' + plural
  } else if (totalDuration <= 60) {
    return '1 ' + singular
  } else {
    const hours = Math.round(totalDuration / 60)
    return `${hours} ${plural}`
  }
}
