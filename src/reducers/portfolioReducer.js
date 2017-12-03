import {
  FETCH_PORTFOLIO_OVERVIEW_REQUEST,
  FETCH_PORTFOLIO_OVERVIEW_SUCCESS,
  PORTFOLIO_EDIT,
  PORTFOLIO_EDIT_CANCEL,
  PORTFOLIO_LOCAL_EDIT,
  PORTFOLIO_SAVE,
  CONVERT_PORTFOLIO_REQUEST,
  CONVERT_PORTFOLIO_SUCCESS,
  CONVERT_PORTFOLIO_ERROR
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
  isConverting: false,
  tokens: {},
  convertedPortfolio: {},
  portfolioHistory: {},
  portfolioOverview: {},
  totalValue: 0,
  dayChange: 0,
  totalValueBtc: 0,
  dayChangeBtc: 0
}

export const portfolioReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONVERT_PORTFOLIO_REQUEST:
      return { ...state, isConverting: true }
    case CONVERT_PORTFOLIO_SUCCESS:
      return { ...state,
        isConverting: false,
        convertedPortfolio: { ...action.payload.convertedPortfolio },
        totalValue: action.payload.totalValue,
        dayChange: action.payload.dayChange,
        totalValueBtc: action.payload.totalValueBtc,
        dayChangeBtc: action.payload.dayChangeBtc
      }
    case CONVERT_PORTFOLIO_ERROR: {
      return { ...state, isConverting: false }
    }
    case FETCH_PORTFOLIO_OVERVIEW_REQUEST: {
      return { ...state, isFetching: true }
    }
    case FETCH_PORTFOLIO_OVERVIEW_SUCCESS: {
      return { ...state, isFetching: false, ...action.payload }
    }
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
