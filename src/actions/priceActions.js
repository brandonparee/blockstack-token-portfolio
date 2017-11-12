import axios from 'axios'

export const TOKEN_EXCHANGE_RATES_REQUEST = 'TOKEN_EXCHANGE_RATES_REQUEST'
export const TOKEN_EXCHANGE_RATES_ERROR = 'TOKEN_EXCHANGE_RATES_ERROR'
export const TOKEN_EXCHANGE_RATES_SUCCESS = 'TOKEN_EXCHANGE_RATES_SUCCESS'
export const FIAT_EXCHANGE_RATES_REQUEST = 'FIAT_EXCHANGE_RATES_REQUEST'
export const FIAT_EXCHANGE_RATES_ERROR = 'FIAT_EXCHANGE_RATES_ERROR'
export const FIAT_EXCHANGE_RATES_SUCCESS = 'FIAT_EXCHANGE_RATES_SUCCESS'

// TODO Refactor all of this, its pretty gross

// const cryptoCompare = `https://min-api.cryptocompare.com/data`
const poloniex = `https://poloniex.com/public?command`

export const getFiatExchangeRates = () => {
  return (dispatch, getState) => {
    dispatch({type: FIAT_EXCHANGE_RATES_REQUEST})

    return axios.get(`http://api.fixer.io/latest?base=USD`)
    .then((res) => {
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
