export const isStaging = () => {
  return window.location.hostname === 'staging.nazabeauty.com'
}

export const isProduction = () => {
  return window.location.hostname === 'www.nazabeauty.com'
}

// this is the publically accessible key
export const getStripeKey = () => {
  if (isProduction()) {
    return 'pk_live_nTyQgrRSvvcyd91zATbWb3ZW'
  }

  return 'pk_test_3r4fRkW9SPir2xtQB98KOzr9'
}

export const getSpreeServer = () => {
  return `${getCurlAssetRoot()}/api/v2/storefront`
}

export const getAppServer = () => {
  if (isStaging()) {
    return 'https://api-staging.nazabeauty.com'
  }

  if (isProduction()) {
    return 'https://api-prod.nazabeauty.com'
  }

  return 'http://localhost:3000'
}

export const getCurlAssetRoot = () => {
  console.log('******************** window.location.hostname', window.location.hostname)

  if (isStaging()) {
    return 'https://api-staging.nazabeauty.com'
  }

  if (isProduction()) {
    return 'https://api-prod.nazabeauty.com'
  }

  return 'http://localhost:3000'
}
