import _ from 'lodash'
import { getBlockstackFile, putBlockstackFile } from './fileActions'
import { getPortfolioOverview } from './portfolioActions'

export const ADD_TRANSACTION_REQUEST = 'ADD_TRANSACTION_REQUEST'
export const ADD_TRANSACTION_SUCCESS = 'ADD_TRANSACTION_SUCCESS'
export const FETCH_TRANSACTIONS = 'FETCH_TRANSACTIONS'
export const TRANSACTION_TOGGLE = 'TOGGLE_ADD_TRANSACTION'

export const getTransactions = () => {
  return (dispatch) => {
    dispatch({ type: FETCH_TRANSACTIONS })
    dispatch(getBlockstackFile('transactions.json', true, getPortfolioOverview))
  }
}

export const addTransaction = (transaction) => {
  return (dispatch, getState) => {
    let { transactions } = getState().transactions
    transaction.amount = transaction.type === 'BUY' ? transaction.amount : -transaction.amount
    transaction.purchasePrice = transaction.type === 'BUY' ? transaction.purchasePrice : -transaction.purchasePrice
    dispatch({ type: ADD_TRANSACTION_REQUEST })
    transactions.push(transaction)

    transactions = _.sortBy(transactions, 'date')

    dispatch(putBlockstackFile('transactions.json', JSON.stringify(transactions), true, getPortfolioOverview))
  }
}

export const handleTransactionToggle = () => {
  return { type: TRANSACTION_TOGGLE }
}
