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
      const { abbreviation, amount, purchasePrice } = singleTransaction
      const currentTokenOverview = portfolioHistory[abbreviation] || {}
      const overview = portfolioOverview[abbreviation] || { abbreviation, totalAmount: 0, totalPurchasePrice: 0 }

      portfolioOverview[abbreviation] = {
        ...overview,
        totalAmount: overview.totalAmount + parseFloat(amount),
        totalPurchasePrice: overview.totalPurchasePrice + parseFloat(purchasePrice)
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
    const priceChartData = getState().charts.priceChartData[token]
    const transactions = getState().portfolio.portfolioHistory[token]

    if (transactions && priceChartData) {
      let transactionIndex = 0
      let firstTransactionDate = moment(transactions[0].date)

      let convertedPortfolio = priceChartData.map((singlePrice) => {
        const { date } = singlePrice
        const singlePriceDate = moment.unix(date)
        const currentTransaction = transactions[transactionIndex]
        const transactionDate = moment(currentTransaction.date)

        if (singlePriceDate.isBefore(firstTransactionDate)) {
          return { date, currentAmount: 0 }
        } else if (singlePriceDate.isAfter(transactionDate)) {
          transactionIndex = transactionIndex < transactions.length - 1 ? transactionIndex + 1 : transactionIndex
        }
        return { date, currentAmount: currentTransaction.totalAmount * singlePrice.close }
      })
      dispatch({ type: FETCH_TRANSACTION_CHART_SUCCESS, payload: { [token]: convertedPortfolio} })
    }
  }
}

export const getConvertedPortfolio = () => {
  return (dispatch, getState) => {
    const { portfolio, price, preferences } = getState()
    let totalValue = 0
    let totalDayChange = 0

    if (!portfolio.isConverting) {
      dispatch({ type: CONVERT_PORTFOLIO_REQUEST })

      const tokenPortfolio = portfolio.portfolioOverview
      const convertedPortfolio = {}

      _.forEach(tokenPortfolio, (singleOverview, abbreviation) => {
        if (preferences.tokens[abbreviation] === true) {
          const btcValue = (!(abbreviation === 'BTC') ? price.tokenRates[`BTC_${abbreviation}`].last : 1)
          const conversion = preferences.fiat === 'USD' ? 1 : price.fiatRates[preferences.fiat]
          const fiatValue = btcValue * price.tokenRates.USDT_BTC.last * singleOverview.totalAmount * conversion
          const percentChange = parseFloat((!(abbreviation === 'BTC') ? price.tokenRates[`BTC_${abbreviation}`].percentChange : price.tokenRates[`USDT_BTC`].percentChange))
          const dayChange = fiatValue - fiatValue / (1 + percentChange)

          totalValue += fiatValue
          totalDayChange += dayChange

          convertedPortfolio[abbreviation] = {
            amount: singleOverview.totalAmount,
            btcValue,
            fiatValue,
            percentChange,
            dayChange
          }
        }
      })

      dispatch({ type: CONVERT_PORTFOLIO_SUCCESS,
        payload: {
          convertedPortfolio,
          totalValue,
          dayChange: totalDayChange
        }
      })
    }
  }
}
