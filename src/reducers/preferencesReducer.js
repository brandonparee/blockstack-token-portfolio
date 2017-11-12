import { FETCH_FILE_SUCCESS, PUT_FILE_SUCCESS } from '../actions/fileActions'
import { FETCH_PREFERENCES, UPDATE_LOCAL_PREFERENCES } from '../actions/preferencesActions'

const initialState = {
  isUpdating: false,
  fiat: 'USD',
  tokens: {}
}

const parsePreferences = (content) => {
  return JSON.parse(content)
}

export const preferencesReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_LOCAL_PREFERENCES:
      return { ...state, isUpdating: true, ...action.payload }
    case FETCH_PREFERENCES:
      return { ...state, isUpdating: true }
    case FETCH_FILE_SUCCESS:
      if (action.payload.path === 'preferences.json') {
        const preferences = parsePreferences(action.payload.content)
        localStorage.setItem('preferences', action.payload.content)

        return { ...state, isUpdating: false, ...preferences }
      }
      return { ...state }
    case PUT_FILE_SUCCESS:
      if (action.payload.path === 'preferences.json') {
        const preferences = parsePreferences(action.payload.content)

        return { ...state, isUpdating: false, ...preferences }
      }
      return { ...state }
    default:
      return state
  }
}
