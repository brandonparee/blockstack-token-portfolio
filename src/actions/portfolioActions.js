import _ from 'lodash'
import moment from 'moment'
import { getBlockstackFile, putBlockstackFile } from './fileActions'
import { getTransactions } from './transactionActions'

export const FETCH_PORTFOLIO = 'FETCH_PORTFOLIO'
export const FETCH_PORTFOLIO_OVERVIEW_REQUEST = 'FETCH_PORTFOLIO_OVERVIEW_REQUEST'
export const FETCH_PORTFOLIO_OVERVIEW_SUCCESS = 'FETCH_PORTFOLIO_OVERVIEW_SUCCESS'
export const FETCH_TRANSACTION_CHART_REQUEST = 'FETCH_TRANSACTION_CHART_REQUEST'
export const FETCH_TRANSACTION_CHART_SUCCESS = 'FETCH_TRANSACTION_CHART_SUCCESS'
export const PORTFOLIO_EDIT = 'PORTFOLIO_EDIT'
export const PORTFOLIO_EDIT_CANCEL = 'PORTFOLIO_EDIT_CANCEL'
export const PORTFOLIO_LOCAL_EDIT = 'PORTFOLIO_LOCAL_EDIT'
export const PORTFOLIO_SAVE = 'PORTFOLIO_SAVE'
export const CONVERT_PORTFOLIO_REQUEST = 'CONVERT_PORTFOLIO_REQUEST'
export const CONVERT_PORTFOLIO_SUCCESS = 'CONVERT_PORTFOLIO_SUCCESS'
export const CONVERT_PORTFOLIO_ERROR = 'CONVERT_PORTFOLIO_ERROR'

export const getPortfolio = () => {
  return (dispatch) => {
    dispatch({ type: FETCH_PORTFOLIO })

    dispatch(getBlockstackFile('portfolio.json', true, getConvertedPortfolio))
    dispatch(getTransactions())
  }
}

export const portfolioSave = () => {
  return (dispatch, getState) => {
    const portfolio = getState().portfolio.tokens
    dispatch({ type: PORTFOLIO_SAVE, payload: { ...portfolio } })

    dispatch(putBlockstackFile('portfolio.json', JSON.stringify(portfolio), true))
  }
}

export const portfolioEdit = () => {
  return { type: PORTFOLIO_EDIT }
}

export const portfolioEditCancel = () => {
  return { type: PORTFOLIO_EDIT_CANCEL }
}

export const portfolioLocalEdit = (target, value) => {
  return { type: PORTFOLIO_LOCAL_EDIT, payload: { target, value } }
}

export const getPortfolioOverview = () => {
  return (dispatch, getState) => {
    dispatch({ type: FETCH_PORTFOLIO_OVERVIEW_REQUEST })
    const { transactions } = getState().transactions
    let portfolioHistory = {}
    let portfolioOverview = {}

    transactions.map((singleTransaction) => {
      const { abbreviation, amount, priceBtc, priceUsd } = singleTransaction
      const currentTokenOverview = portfolioHistory[abbreviation] || {}
      const overview = portfolioOverview[abbreviation] || { abbreviation, totalAmount: 0, totalPurchasePriceBtc: 0, totalPurchasePriceUsd: 0 }

      portfolioOverview[abbreviation] = {
        ...overview,
        totalAmount: overview.totalAmount + parseFloat(amount),
        totalPurchasePriceBtc: overview.totalPurchasePriceBtc + parseFloat(priceBtc),
        totalPurchasePriceUsd: overview.totalPurchasePriceUsd + parseFloat(priceUsd)
      }

      portfolioHistory[abbreviation] = [...currentTokenOverview, {
        ...singleTransaction,
        ...portfolioOverview[abbreviation]
      }]
    })

    dispatch({ type: FETCH_PORTFOLIO_OVERVIEW_SUCCESS, payload: { portfolioHistory, portfolioOverview }})
    dispatch(getConvertedPortfolio())
  }
}

export const getTransactionChartData = ({ token }) => {
  return (dispatch, getState) => {
    dispatch({ type: FETCH_TRANSACTION_CHART_REQUEST })
    const state = getState()
    const priceChartData = state.charts.priceChartData[token]
    const transactions = state.portfolio.portfolioHistory[token]
    const fiatPreference = state.preferences.fiat
    const fiatConversion = state.price.fiatRates[fiatPreference]

    if (transactions && priceChartData) {
      let transactionIndex = 0
      let firstTransactionDate = moment(transactions[0].date)

      let convertedPortfolio = priceChartData.map((singlePrice) => {
        const { time } = singlePrice
        const singlePriceDate = moment.unix(time)
        const currentTransaction = transactions[transactionIndex]
        const transactionDate = moment.unix(currentTransaction.date)

        console.log(time, singlePrice.time)

        if (singlePriceDate.isBefore(firstTransactionDate)) {
          return { time, currentAmount: 0 }
        } else if (singlePriceDate.isSameOrAfter(transactionDate)) {
          transactionIndex = transactionIndex < transactions.length - 1 ? transactionIndex + 1 : transactionIndex
        }
        return { time, currentAmount: currentTransaction.totalAmount * singlePrice.close }
      })
      dispatch({ type: FETCH_TRANSACTION_CHART_SUCCESS, payload: { [token]: convertedPortfolio} })
    }
  }
}

export const getConvertedPortfolio = () => {
  return (dispatch, getState) => {
    const { portfolio, price, preferences, marketData } = getState()
    let totalValue = 0
    let totalValueBtc = 0
    let totalDayChange = 0
    let totalDayChangeBtc = 0

    dispatch({ type: CONVERT_PORTFOLIO_REQUEST })

    const tokenPortfolio = portfolio.portfolioOverview
    const convertedPortfolio = {}

    if (marketData.marketData) {
      _.forEach(tokenPortfolio, (singleOverview, abbreviation) => {
        const tokenData = _.find(marketData.marketData, ['symbol', abbreviation])
        const btcValue = tokenData.price_btc * singleOverview.totalAmount
        const fiatValue = tokenData.price_usd * singleOverview.totalAmount
        const percentChange = tokenData.percent_change_24h
        const percentChangeValue = parseFloat(percentChange) / 100
        const dayChange = fiatValue - fiatValue / (1 + percentChangeValue)
        const dayChangeBtc = btcValue - btcValue / (1 + percentChangeValue)

        totalValue += fiatValue
        totalValueBtc += btcValue
        totalDayChange += dayChange
        totalDayChangeBtc += dayChangeBtc

        convertedPortfolio[abbreviation] = {
          amount: singleOverview.totalAmount,
          btcValue,
          fiatValue,
          percentChange,
          dayChange
        }
      })

      dispatch({ type: CONVERT_PORTFOLIO_SUCCESS,
        payload: {
          convertedPortfolio,
          totalValue,
          dayChange: totalDayChange,
          totalValueBtc,
          dayChangeBtc: totalDayChangeBtc
        }
      })
    } else {
      dispatch({ type: CONVERT_PORTFOLIO_ERROR })
    }
  }
}
