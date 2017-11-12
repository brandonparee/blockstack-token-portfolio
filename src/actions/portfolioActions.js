import _ from 'lodash'
import { getBlockstackFile, putBlockstackFile } from './fileActions'

export const FETCH_PORTFOLIO = 'FETCH_PORTFOLIO'
export const PORTFOLIO_ADD_TRANSACTION = 'PORTFOLIO_ADD_TRANSACTION'
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

export const getConvertedPortfolio = () => {
  return (dispatch, getState) => {
    const { portfolio, price } = getState()

    if (!portfolio.isConverting) {
      dispatch({ type: CONVERT_PORTFOLIO_REQUEST })

      const tokenPortfolio = portfolio.tokens
      const convertedPortfolio = {}

      _.forEach(tokenPortfolio, (value, abbreviation) => {
        const btcValue = (!(abbreviation === 'BTC') ? price.tokenRates[`BTC_${abbreviation}`].last : 1)
        const fiatValue = btcValue * price.tokenRates.USDT_BTC.last * value
        const percentChange = parseFloat((!(abbreviation === 'BTC') ? price.tokenRates[`BTC_${abbreviation}`].percentChange : price.tokenRates[`USDT_BTC`].percentChange))
        const dayChange = fiatValue - fiatValue / (1 + percentChange)

        convertedPortfolio[abbreviation] = {
          amount: value,
          btcValue,
          fiatValue,
          percentChange,
          dayChange
        }
      })

      dispatch({ type: CONVERT_PORTFOLIO_SUCCESS, payload: convertedPortfolio })
    }
  }
}
