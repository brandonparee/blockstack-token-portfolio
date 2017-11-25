import { getBlockstackFile, putBlockstackFile } from './fileActions'
import { getConvertedPortfolio } from './portfolioActions'

export const ADD_TRANSACTION_REQUEST = 'ADD_TRANSACTION_REQUEST'
export const ADD_TRANSACTION_SUCCESS = 'ADD_TRANSACTION_SUCCESS'
export const FETCH_TRANSACTIONS = 'FETCH_TRANSACTIONS'

export const getTransactions = () => {
  return (dispatch) => {
    dispatch({ type: FETCH_TRANSACTIONS })
    dispatch(getBlockstackFile('transactions.json', true, getConvertedPortfolio))
  }
}

export const addTransaction = (transaction) => {
  return (dispatch, getState) => {
    const { transactions } = getState().transactions
    dispatch({ type: ADD_TRANSACTION_REQUEST })
    transactions.push(transaction)

    dispatch(putBlockstackFile('transactions.json', JSON.stringify(transactions), true, getConvertedPortfolio))
  }
}
