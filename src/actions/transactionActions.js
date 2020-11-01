import _ from 'lodash'
import cc from 'cryptocompare'
import moment from 'moment'
import { reset } from 'redux-form'
import { getBlockstackFile, putBlockstackFile } from './fileActions'
import { getPortfolioOverview } from './portfolioActions'

export const ADD_TRANSACTION_REQUEST = 'ADD_TRANSACTION_REQUEST'
export const ADD_TRANSACTION_SUCCESS = 'ADD_TRANSACTION_SUCCESS'
export const CLOSE_TRANSACTION_MODAL = 'CLOSE_TRANSACTION_MODAL'
export const FETCH_TRANSACTIONS = 'FETCH_TRANSACTIONS'
export const TRANSACTION_TOGGLE = 'TOGGLE_ADD_TRANSACTION'
export const TRANSACTION_FORM_PAIRS_FETCH = 'TRANSACTION_FORM_PAIRS_FETCH'
export const TRANSACTION_FORM_PAIRS_SUCCESS = 'TRANSACTION_FORM_PAIRS_SUCCESS'
export const TRANSACTION_FORM_PAIRS_ERROR = 'TRANSACTION_FORM_PAIRS_ERROR'
export const TRANSACTION_FORM_RESET = 'TRANSACTION_FORM_RESET'

export const getTransactions = () => {
  return (dispatch) => {
    dispatch({ type: FETCH_TRANSACTIONS })
    dispatch(getBlockstackFile('transactions.json', true, getPortfolioOverview))
  }
}

export const addTransaction = (transaction) => {
  return (dispatch, getState) => {
    dispatch({ type: ADD_TRANSACTION_REQUEST })
    let { transactions } = getState().transactions
    const { toSymbol, fromSymbol } = transaction.toSymbol
    const abbreviation = fromSymbol
    const transactionSign = transaction.type === 'BUY' ? 1 : -1
    const date = moment(transaction.date)

            console.log(transaction)

    cc.priceHistorical(toSymbol, ['USD', 'BTC'], date.toDate())
      .then((price) => {
        const priceBtc = price.BTC * transaction.amount * transaction.purchasePrice * transactionSign
        const priceUsd = price.USD * transaction.amount * transaction.purchasePrice * transactionSign
        const purchasePrice = transaction.amount * transaction.purchasePrice * transactionSign * -1
        const transactionDetails = [{
          date: date.valueOf(),
          type: transaction.type,
          amount: transaction.amount * transactionSign,
          pairedSymbol: toSymbol,
          pair: `${abbreviation}/${toSymbol}`,
          abbreviation,
          priceBtc,
          priceUsd,
          purchasePrice
        }]

        console.log(transactionDetails)

        if (transaction.deduct.value) {
          transactionDetails.push({
            date: date.valueOf(),
            type: transaction.type === 'BUY' ? 'SELL' : 'BUY',
            amount: purchasePrice,
            pairedSymbol: abbreviation,
            pair: `${abbreviation}/${toSymbol}`,
            abbreviation: toSymbol,
            priceBtc: priceBtc * transactionSign * -1,
            priceUsd: priceUsd * transactionSign * -1,
            purchasePrice: transaction.amount
          })
        }

        transactions.push(...transactionDetails)

        transactions = _.sortBy(transactions, 'date')

        dispatch(putBlockstackFile('transactions.json', JSON.stringify(transactions), true, addTransactionSuccess))
      })
  }
}

export const addTransactionSuccess = () => {
  return (dispatch) => {
    dispatch(reset('transaction'))
    dispatch({ type: TRANSACTION_FORM_RESET })
    dispatch({ type: ADD_TRANSACTION_SUCCESS })
    dispatch(getPortfolioOverview())
  }
}

export const closeTransactionModal = () => {
  return { type: CLOSE_TRANSACTION_MODAL }
}

export const handleTransactionToggle = () => {
  return { type: TRANSACTION_TOGGLE }
}

export const getTradingPairs = (symbol) => {
  return (dispatch, getState) => {
    dispatch({ type: TRANSACTION_FORM_PAIRS_FETCH })

    cc.topPairs(symbol, 25)
      .then((pairs) => {
        pairs.map((pair) => {
          pair.label = `${pair.fromSymbol}/${pair.toSymbol}`
          return pair
        })
        dispatch({ type: TRANSACTION_FORM_PAIRS_SUCCESS, payload: { pairs, fromSymbol: symbol } })
      })
      .catch((err) => {
        dispatch({ type: TRANSACTION_FORM_PAIRS_ERROR, payload: err })
      })
  }
}
