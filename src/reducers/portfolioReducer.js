import {
  PORTFOLIO_ADD_TRANSACTION,
  PORTFOLIO_EDIT,
  PORTFOLIO_EDIT_CANCEL,
  PORTFOLIO_LOCAL_EDIT,
  PORTFOLIO_SAVE
} from '../actions/portfolioActions'

import {
  FETCH_FILE_SUCCESS,
  PUT_FILE_SUCCESS
} from '../actions/fileActions'

const initialState = {
  isFetching: false,
  isEdit: false,
  isUpdating: false,
  isModified: false,
  tokens: {}
}

export const portfolioReducer = (state = initialState, action) => {
  switch (action.type) {
    case PORTFOLIO_ADD_TRANSACTION:
      break
    case PORTFOLIO_EDIT:
      return { ...state, isEdit: true }
    case PORTFOLIO_EDIT_CANCEL:
      return { ...state, isEdit: false, isModified: false }
    case PORTFOLIO_LOCAL_EDIT:
      let newState = { ...state, isModified: true }
      newState.tokens[action.payload.target] = action.payload.value

      return { ...newState }
    case PORTFOLIO_SAVE:
      return { ...state, isEdit: false }
    case FETCH_FILE_SUCCESS:
      if (action.payload.path === 'portfolio.json') {
        const portfolio = JSON.parse(action.payload.content)
        localStorage.setItem('portfolio', action.payload.content)

        return { ...state, isUpdating: false, isModified: false, tokens: { ...portfolio } }
      }
      return { ...state }
    case PUT_FILE_SUCCESS:
      if (action.payload.path === 'portfolio.json') {
        const portfolio = JSON.parse(action.payload.content)

        return { ...state, isUpdating: false, ...portfolio }
      }
      return { ...state }
    default:
      return state
  }
}
