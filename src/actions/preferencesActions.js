import { getBlockstackFile, putBlockstackFile } from './fileActions'
import { getConvertedPortfolio } from './portfolioActions'

export const FETCH_PREFERENCES = 'FETCH_PREFERENCES'
export const UPDATE_PREFERENCES = 'UPDATE_PREFERENCES'
export const UPDATE_LOCAL_PREFERENCES = 'UPDATE_LOCAL_PREFERENCES'
export const UPDATE_LOCAL_PREFERENCES_TOKEN = 'UPDATE_LOCAL_PREFERENCES_TOKEN'

export const getPreferences = () => {
  return (dispatch) => {
    dispatch({ type: FETCH_PREFERENCES })

    dispatch(getBlockstackFile('preferences.json', true, getConvertedPortfolio))
  }
}

export const updatePreferences = (preferences) => {
  preferences = JSON.stringify(preferences)
  localStorage.setItem('preferences', preferences)

  return (dispatch) => {
    dispatch({ type: UPDATE_PREFERENCES })

    dispatch(putBlockstackFile('preferences.json', preferences, true, getConvertedPortfolio))
  }
}

export const updateFiatPreference = (value) => {
  return (dispatch, getState) => {
    const currentPreferences = getState().preferences
    const preferences = { tokens: {...currentPreferences.tokens}, fiat: value }

    dispatch({
      type: UPDATE_LOCAL_PREFERENCES,
      payload: { ...preferences }
    })

    dispatch(updatePreferences(preferences))
  }
}

export const updateTokenPreference = (value, selected) => {
  return (dispatch, getState) => {
    const currentPreferences = getState().preferences

    let preferences = { fiat: currentPreferences.fiat, tokens: {...currentPreferences.tokens} }
    preferences.tokens[value] = selected

    dispatch({
      type: UPDATE_LOCAL_PREFERENCES,
      payload: { ...preferences }
    })

    dispatch(updatePreferences(preferences))
  }
}
