import {
  FETCH_TRANSACTION_CHART_REQUEST,
  FETCH_TRANSACTION_CHART_SUCCESS
} from '../actions/portfolioActions'

import {
  PRICE_CHART_DATA_REQUEST,
  PRICE_CHART_DATA_SUCCESS
} from '../actions/priceActions'

const initialState = {
  isFetching: false,
  priceChartData: {},
  transactionChartData: []
}

export const chartReducer = (state = initialState, action) => {
  switch (action.type) {
    case PRICE_CHART_DATA_REQUEST:
      return { ...state, isFetching: true }
    case PRICE_CHART_DATA_SUCCESS:
      return { ...state, isFetching: false, priceChartData: { ...action.payload } }
    case FETCH_TRANSACTION_CHART_REQUEST: {
      return { ...state, isFetching: true }
    }
    case FETCH_TRANSACTION_CHART_SUCCESS: {
      return { ...state, isFetching: false, transactionChartData: {...state.transactionChartData, ...action.payload} }
    }
    default:
      return state
  }
}
