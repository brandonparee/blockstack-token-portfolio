import {
  COIN_LIST_FETCH,
  COIN_LIST_SUCCESS,
  COIN_LIST_ERROR,
  MARKET_DATA_ERROR,
  MARKET_DATA_FETCH,
  MARKET_DATA_SUCCESS
} from '../actions/marketDataActions'

const initialState = {
  isFetching: false,
  isFetchingCoinList: false,
  coinList: {},
  marketData: [],
  error: null
}

export const marketDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case COIN_LIST_FETCH:
      return { ...state, isFetchingCoinlist: true }
    case COIN_LIST_SUCCESS:
      return { ...state, isFetchingCoinlist: false, coinList: action.payload }
    case COIN_LIST_ERROR: {
      return { ...state, isFetchingCoinlist: false, error: action.payload }
    }
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
