import {
  TRANSACTION_FORM_PAIRS_FETCH,
  TRANSACTION_FORM_PAIRS_SUCCESS,
  TRANSACTION_FORM_PAIRS_ERROR,
  FETCH_TRANSACTIONS,
  ADD_TRANSACTION_REQUEST,
  TRANSACTION_TOGGLE
} from '../actions/transactionActions'

import {
  TRADE_PAIR_PRICE_FETCH,
  TRADE_PAIR_PRICE_SUCCESS,
  TRADE_PAIR_PRICE_ERROR
} from '../actions/priceActions'

import {
  FETCH_FILE_SUCCESS,
  PUT_FILE_SUCCESS
} from '../actions/fileActions'

const initialState = {
  isFetching: false,
  isUpdating: false,
  transactions: [],
  form: {
    pairs: [],
    toSymbol: '',
    fromSymbol: '',
    price: 0
  },
  transactionView: false,
  error: null
}

export const transactionReducer = (state = initialState, action) => {
  switch (action.type) {
    case TRANSACTION_FORM_PAIRS_FETCH:
      return { ...state, isFetchingPairs: true }
    case TRANSACTION_FORM_PAIRS_SUCCESS:
      return { ...state, isFetchingPairs: false, form: { ...state.form, ...action.payload } }
    case TRANSACTION_FORM_PAIRS_ERROR: {
      return { ...state, isFetchingPairs: false, error: action.payload }
    }
    case TRADE_PAIR_PRICE_FETCH:
      return { ...state, isFetchingPairs: true }
    case TRADE_PAIR_PRICE_SUCCESS:
      return { ...state, isFetchingPairs: false, form: { ...state.form, ...action.payload } }
    case TRADE_PAIR_PRICE_ERROR: {
      return { ...state, isFetchingPairs: false, error: action.payload }
    }
    case TRANSACTION_TOGGLE:
      return { ...state, transactionView: !state.transactionView }
    case FETCH_TRANSACTIONS:
      return { ...state, isFetching: true }
    case ADD_TRANSACTION_REQUEST:
      return { ...state, isUpdating: true }
    case FETCH_FILE_SUCCESS:
      if (action.payload.path === 'transactions.json') {
        const transactions = JSON.parse(action.payload.content)
        localStorage.setItem('transactions', action.payload.content)

        return { ...state, isFetching: false, transactions: [...transactions] }
      }

      return { ...state }
    case PUT_FILE_SUCCESS:
      if (action.payload.path === 'transactions.json') {
        const transactions = JSON.parse(action.payload.content)

        return { ...state, isUpdating: false, transactions: [...transactions] }
      }
      return { ...state }
    default:
      return state
  }
}
