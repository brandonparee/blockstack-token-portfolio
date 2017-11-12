import {
  FIAT_PRICE_UPDATE_REQUEST,
  FIAT_PRICE_UPDATE_ERROR,
  FIAT_PRICE_UPDATE_SUCCESS
} from '../actions/priceActions'

const initialState = {
  isUpdating: false,
  fiatPrice: {},
  error: null
}

export const priceReducer = (state = initialState, action) => {
  switch (action.type) {
    case FIAT_PRICE_UPDATE_REQUEST:
      return { ...state, isUpdating: true }
    case FIAT_PRICE_UPDATE_ERROR:
      return { ...state, isUpdating: false, error: action.payload }
    case FIAT_PRICE_UPDATE_SUCCESS:
      return { ...state, isUpdating: false, fiatPrice: { ...action.payload } }
    default:
      return state
  }
}
