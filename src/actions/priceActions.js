import axios from 'axios'
import cc from '../uncompiledDependencies/cryptocompare'
import { getConvertedPortfolio, getTransactionChartData } from './portfolioActions'

export const PRICE_CHART_DATA_REQUEST = 'PRICE_CHART_DATA_REQUEST'
export const PRICE_CHART_DATA_SUCCESS = 'PRICE_CHART_DATA_SUCCESS'
export const TOKEN_EXCHANGE_RATES_REQUEST = 'TOKEN_EXCHANGE_RATES_REQUEST'
export const TOKEN_EXCHANGE_RATES_ERROR = 'TOKEN_EXCHANGE_RATES_ERROR'
export const TOKEN_EXCHANGE_RATES_SUCCESS = 'TOKEN_EXCHANGE_RATES_SUCCESS'
export const FIAT_EXCHANGE_RATES_REQUEST = 'FIAT_EXCHANGE_RATES_REQUEST'
export const FIAT_EXCHANGE_RATES_ERROR = 'FIAT_EXCHANGE_RATES_ERROR'
export const FIAT_EXCHANGE_RATES_SUCCESS = 'FIAT_EXCHANGE_RATES_SUCCESS'
export const TRADE_PAIR_PRICE_FETCH = 'TRADE_PAIR_PRICE_FETCH'
export const TRADE_PAIR_PRICE_SUCCESS = 'TRADE_PAIR_PRICE_SUCCESS'
export const TRADE_PAIR_PRICE_ERROR = 'TRADE_PAIR_PRICE_ERROR'

// TODO Refactor all of this, its pretty gross

// const cryptoCompare = `https://min-api.cryptocompare.com/data`
const poloniex = `https://poloniex.com/public?command`

export const getExchangeRates = () => {
  return (dispatch, getState) => {
    const { isUpdatingFiatRates, isUpdatingTokenRates } = getState().price
    if (!isUpdatingFiatRates) {
      dispatch(getFiatExchangeRates())
    }

    if (!isUpdatingTokenRates) {
      dispatch(getTokenExchangeRates())
    }

    dispatch(getConvertedPortfolio())
  }
}

export const getFiatExchangeRates = () => {
  return (dispatch, getState) => {
    dispatch({ type: FIAT_EXCHANGE_RATES_REQUEST })

    return axios.get(`http://api.fixer.io/latest?base=USD`)
    .then((res) => {
      res.data.rates.USD = 1
      dispatch({type: FIAT_EXCHANGE_RATES_SUCCESS, payload: res.data})
    })
    .catch((error) => {
      dispatch({type: FIAT_EXCHANGE_RATES_ERROR, payload: error})
    })
  }
}

export const getTokenExchangeRates = () => {
  return (dispatch, getState) => {
    dispatch({type: TOKEN_EXCHANGE_RATES_REQUEST})

    return axios.get(`${poloniex}=returnTicker`)
    .then((res) => {
      dispatch({type: TOKEN_EXCHANGE_RATES_SUCCESS, payload: res.data})
    })
    .catch((error) => {
      dispatch({type: TOKEN_EXCHANGE_RATES_ERROR, payload: error})
    })
  }
}

export const getTradePairPrice = (fromSymbol, toSymbol) => {
  return (dispatch, getState) => {
    dispatch({ type: TRADE_PAIR_PRICE_FETCH })

    cc.price(fromSymbol, toSymbol)
      .then((price) => {
        dispatch({ type: TRADE_PAIR_PRICE_SUCCESS,
          payload: {
            price: price[toSymbol],
            toSymbol
          }})
      })
      .catch((err) => {
        dispatch({ type: TRADE_PAIR_PRICE_ERROR, payload: err })
      })
  }
}

const getSingleChart = ({ token, chartRange, fiatPreference }) => {
  return chartRange.ccFunction(token, fiatPreference, chartRange.options)
    .then((history) => {
      history.map((singleHistory) => {
        singleHistory.volume = singleHistory.volumeto + singleHistory.volumefrom
        return singleHistory
      })
      return {
        [token]: history
      }
    })
}

// TODO Poloniex says to limit API requests to 6 per second or you can risk an IP ban
export const getChartData = ({ tokens, startTime, endTime, period }) => {
  return (dispatch, getState) => {
    dispatch({ type: PRICE_CHART_DATA_REQUEST})
    const state = getState()
    const chartRange = state.charts.chartRange
    const fiatPreference = state.preferences.fiat

    let singleCharts = tokens.map((token) => {
      return getSingleChart({ token, chartRange, fiatPreference })
    })

    // Wait for all requests from Poloniex to finish, then dispatch success
    Promise.all(singleCharts)
      .then(values => {
          // Turn values into object
        const chartData = Object.assign({}, ...values)
        const chartMap = new Map()
        const combinedValues = [].concat(...Object.values(chartData))

        // TODO Fix this, currently does not work
        combinedValues.map((obj) => { // eslint-disable-line array-callback-return
          const previousState = chartMap.get(obj.time) || {}
          chartMap.set(obj.time, {
            ...previousState,
            time: obj.time,
            low: previousState.low && previousState.low < obj.close ? previousState.low : obj.close,
            high: previousState.high && previousState.high > obj.close ? previousState.high : obj.close,
            [obj.abbreviation]: {...obj}
          })
        })

        const combinedChartData = Array.from(chartMap.values())

        dispatch({ type: PRICE_CHART_DATA_SUCCESS, payload: {...chartData, combinedChartData } })
        tokens.map((token) => dispatch(getTransactionChartData({ token })))
      })
  }
}
