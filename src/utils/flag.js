import Rox from 'rox-browser'
import { betaAccess, isLoggedIn, getCompany } from './users'

export const Flags = {
  score: new Rox.Flag(false),
  ask: new Rox.Flag(false),
  show: new Rox.Flag(false),
  headerColor: new Rox.RoxString('is-dark', ['is-dark', 'is-primary', 'is-white'])
}

export const configurationFetchedHandler = fetcherResults => {
  if (fetcherResults.hasChanges && fetcherResults.fetcherStatus === 'APPLIED_FROM_NETWORK') {
    window.location.reload(false)
  }
}

export const impressionHandler = (reporting) => {
  if (reporting.targeting) {
    console.log('flag ' + reporting.name + ' value is ' + reporting.value)
  } else {
    console.log('No experiment configured for flag ' + reporting.name + '. default value ' + reporting.value + ' was used')
  }
}

const API_HOST = `https://api-staging.saas-dev.beescloud.com`
const options = {
  configurationFetchedHandler: configurationFetchedHandler,
  impressionHandler: impressionHandler,
  configuration: {
    API_HOST: API_HOST,
    CD_API_ENDPOINT: `${API_HOST}/device/get_configuration`,
    CD_S3_ENDPOINT: 'https://development-conf.rollout.io/',
    SS_API_ENDPOINT: `${API_HOST}/device/update_state_store/`,
    SS_S3_ENDPOINT: 'https://development-statestore.rollout.io/',
    CLIENT_DATA_CACHE_KEY: 'client_data',
    ANALYTICS_ENDPOINT: 'https://localhost:8787',
    NOTIFICATIONS_ENDPOINT: 'https://api-staging.saas-dev.beescloud.com/sse'
  },
  debugLevel: 'verbose',
  disableSignatureVerification: true
}

Rox.setCustomBooleanProperty('isBetaUser', betaAccess())
Rox.setCustomBooleanProperty('isLoggedIn', isLoggedIn())
Rox.setCustomStringProperty('company', getCompany())

Rox.register('default', Flags)
Rox.setup('5d0a90be-6adb-4483-6e60-b73764bb0942', options)
//Rox.setup(process.env.VUE_APP_ROLLOUT_KEY, options)
