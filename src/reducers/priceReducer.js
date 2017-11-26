import {
  CHART_DATA_REQUEST,
  CHART_DATA_SUCCESS,
  TOKEN_EXCHANGE_RATES_REQUEST,
  TOKEN_EXCHANGE_RATES_ERROR,
  TOKEN_EXCHANGE_RATES_SUCCESS,
  FIAT_EXCHANGE_RATES_REQUEST,
  FIAT_EXCHANGE_RATES_ERROR,
  FIAT_EXCHANGE_RATES_SUCCESS
} from '../actions/priceActions'

const initialState = {
  isUpdatingTokenRates: false,
  isUpdatingFiatRates: false,
  isUpdatingPriceChart: false,
  tokenRates: {},
  fiatRates: {},
  priceChartData: {},
  error: null
}

export const priceReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHART_DATA_REQUEST:
      return { ...state, isUpdatingPriceChart: true }
    case CHART_DATA_SUCCESS:
      return { ...state, isUpdatingPriceChart: false, priceChartData: { ...action.payload } }
    case TOKEN_EXCHANGE_RATES_REQUEST:
      return { ...state, isUpdatingTokenRates: true }
    case TOKEN_EXCHANGE_RATES_ERROR:
      return { ...state, isUpdatingTokenRates: false, error: action.payload }
    case TOKEN_EXCHANGE_RATES_SUCCESS:
      return { ...state, isUpdatingTokenRates: false, tokenRates: { ...action.payload } }
    case FIAT_EXCHANGE_RATES_REQUEST:
      return { ...state, isUpdatingFiatRates: true }
    case FIAT_EXCHANGE_RATES_ERROR:
      return { ...state, isUpdatingFiatRates: false, error: action.payload }
    case FIAT_EXCHANGE_RATES_SUCCESS:
      return { ...state, isUpdatingFiatRates: false, fiatRates: { ...action.payload.rates } }
    default:
      return state
  }
}
