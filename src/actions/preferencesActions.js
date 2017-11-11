import { getBlockstackFile, putBlockstackFile } from './fileActions'

export const FETCH_PREFERENCES = 'FETCH_PREFERENCES'
export const UPDATE_PREFERENCES = 'UPDATE_PREFERENCES'
export const UPDATE_LOCAL_PREFERENCES = 'UPDATE_LOCAL_PREFERENCES'
export const UPDATE_LOCAL_PREFERENCES_TOKEN = 'UPDATE_LOCAL_PREFERENCES_TOKEN'


export const getPreferences = () => {
  return (dispatch) => {
    dispatch({ type: FETCH_PREFERENCES })

    dispatch(getBlockstackFile('preferences.json', true))
  }
}

export const updatePreferences = (preferences) => {
  preferences = JSON.stringify(preferences)

  return (dispatch) => {
    dispatch({ type: UPDATE_PREFERENCES })

    dispatch(putBlockstackFile('preferences.json', preferences, true))
  }
}

export const updateFiatPreference = (value, currentPreferences) => {
  const preferences = { tokens: {...currentPreferences.tokens}, fiat: value }
  return (dispatch) => {
    dispatch({
      type: UPDATE_LOCAL_PREFERENCES,
      payload: { ...preferences }
    })

    dispatch(updatePreferences(preferences))
  }
}

export const updateTokenPreference = (value, selected, currentPreferences) => {
  let preferences = { fiat: currentPreferences.fiat, tokens: {...currentPreferences.tokens} }
  preferences.tokens[value] = selected

  console.log(preferences)

  return (dispatch) => {
    dispatch({
      type: UPDATE_LOCAL_PREFERENCES,
      payload: { ...preferences }
    })

    dispatch(updatePreferences(preferences))
  }
}
