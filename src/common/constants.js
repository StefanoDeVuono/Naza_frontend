export const isStaging = () => {
  return window.location.hostname === 'staging.nazabeauty.com'
}

export const isProduction = () => {
  return window.location.hostname === 'www.nazabeauty.com' || 'nazabeauty.com'
}

// this is the publically accessible key
export const getStripeKey = () => {
  if (isProduction()) {
    return 'pk_live_nTyQgrRSvvcyd91zATbWb3ZW'
  }

  return 'pk_test_3r4fRkW9SPir2xtQB98KOzr9'
}

export const getSpreeServer = () => {
  if (isStaging()) {
    return `${getCurlAssetRoot()}/api/v2/storefront`
  }

  if (isProduction()) {
    return `${getCurlAssetRoot()}/api/v2/storefront`
  }

  return `${getCurlAssetRoot()}/api/v2/storefront`
}

export const getAppServer = () => {
  if (isStaging()) {
    return 'https://projectcurl-staging.herokuapp.com'
  }

  if (isProduction()) {
    return 'https://projectcurl.herokuapp.com'
  }

  return 'http://localhost:3000'
}

export const getCurlAssetRoot = () => {
  if (isStaging()) {
    return 'https://api-staging.nazabeauty.com'
  }

  if (isProduction()) {
    return 'https://api-prod.nazabeauty.com'
  }

  return 'http://localhost:3000'
}
