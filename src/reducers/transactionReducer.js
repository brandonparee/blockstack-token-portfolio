import {
  FETCH_TRANSACTIONS,
  ADD_TRANSACTION_REQUEST
} from '../actions/transactionActions'

import {
  FETCH_FILE_SUCCESS,
  PUT_FILE_SUCCESS
} from '../actions/fileActions'

const initialState = {
  isFetching: false,
  isUpdating: false,
  transactions: []
}

export const transactionReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TRANSACTIONS:
      return { ...state, isFetching: true }
    case ADD_TRANSACTION_REQUEST:
      return { ...state, isUpdating: true }
    case FETCH_FILE_SUCCESS:
      if (action.payload.path === 'transactions.json') {
        const transactions = JSON.parse(action.payload.content)
        localStorage.setItem('transactions', action.payload.content)

        return { ...state, isUpdating: false, transactions: [...transactions] }
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
