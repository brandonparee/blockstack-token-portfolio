import {
  MARKET_DATA_ERROR,
  MARKET_DATA_FETCH,
  MARKET_DATA_SUCCESS
} from '../actions/marketDataActions'

const initialState = {
  isFetching: false,
  marketData: [],
  error: null
}

export const marketDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case MARKET_DATA_FETCH:
      return { ...state, isFetching: true }
    case MARKET_DATA_SUCCESS:
      return { ...state, isFetching: false, marketData: action.payload }
    case MARKET_DATA_ERROR: {
      return { ...state, isFetching: false, error: action.payload }
    }
    default:
      return state
  }
}
