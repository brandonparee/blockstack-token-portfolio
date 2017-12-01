import axios from 'axios'
import moment from 'moment'
import { getConvertedPortfolio, getTransactionChartData } from './portfolioActions'

export const PRICE_CHART_DATA_REQUEST = 'PRICE_CHART_DATA_REQUEST'
export const PRICE_CHART_DATA_SUCCESS = 'PRICE_CHART_DATA_SUCCESS'
export const TOKEN_EXCHANGE_RATES_REQUEST = 'TOKEN_EXCHANGE_RATES_REQUEST'
export const TOKEN_EXCHANGE_RATES_ERROR = 'TOKEN_EXCHANGE_RATES_ERROR'
export const TOKEN_EXCHANGE_RATES_SUCCESS = 'TOKEN_EXCHANGE_RATES_SUCCESS'
export const FIAT_EXCHANGE_RATES_REQUEST = 'FIAT_EXCHANGE_RATES_REQUEST'
export const FIAT_EXCHANGE_RATES_ERROR = 'FIAT_EXCHANGE_RATES_ERROR'
export const FIAT_EXCHANGE_RATES_SUCCESS = 'FIAT_EXCHANGE_RATES_SUCCESS'

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

const getSingleChart = ({ token, startTime, endTime, timePeriod }) => {
  const start = startTime || moment().subtract(5, 'days')
  const end = endTime || moment()
  // Temporary
  const period = timePeriod || 14400

  return axios.get(`${poloniex}=returnChartData`, {
    params: {
      currencyPair: `USDT_${token}`,
      start: start.unix(),
      end: end.unix(),
      period
    }
  })
  .then((res) => {
    // Add a field for token so we can merge all histories
    res.data.map((value) => {
      value.abbreviation = token
    })
    return {
      [token]: res.data
    }
  })
}

// TODO Poloniex says to limit API requests to 6 per second or you can risk an IP ban
export const getChartData = ({ tokens, startTime, endTime, period }) => {
  return (dispatch, getState) => {
    dispatch({ type: PRICE_CHART_DATA_REQUEST})

    let singleCharts = []

    tokens.map((token) => {
      singleCharts.push(getSingleChart({ token, startTime, endTime, period }))
    })

    // Wait for all requests from Poloniex to finish, then dispatch success
    Promise.all(singleCharts)
      .then(values => {
          // Turn values into object
        const chartData = Object.assign({}, ...values)
        const chartMap = new Map()
        const combinedValues = [].concat(...Object.values(chartData))

        combinedValues.map((obj) => {
          const previousState = chartMap.get(obj.date) || {}
          chartMap.set(obj.date, {
            ...previousState,
            date: obj.date,
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
