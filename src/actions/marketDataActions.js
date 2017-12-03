import axios from 'axios'
import _ from 'lodash'
import cc from 'cryptocompare'
import { getConvertedPortfolio } from './portfolioActions'
import { getTokenList } from '../utils'

export const COIN_LIST_FETCH = 'COIN_LIST_FETCH'
export const COIN_LIST_SUCCESS = 'COIN_LIST_SUCCESS'
export const COIN_LIST_ERROR = 'COIN_LIST_ERROR'
export const MARKET_DATA_ERROR = 'MARKET_DATA_ERROR'
export const MARKET_DATA_FETCH = 'MARKET_DATA_FETCH'
export const MARKET_DATA_SUCCESS = 'MARKET_DATA_SUCCESS'

const coinMarketCap = `https://api.coinmarketcap.com/v1/ticker/?limit=0`

export const getMarketData = () => {
  return (dispatch, getState) => {
    dispatch({ type: MARKET_DATA_FETCH })

    axios.get(coinMarketCap)
      .then((res) => {
        const tokens = getTokenList()
        const marketData = res.data

        // Maybe use this later
        // res.data.filter((singleToken) => {
        //   if (_.find(tokens, ['abbreviation', singleToken.symbol])) {
        //     return true
        //   }
        // })
        dispatch({ type: MARKET_DATA_SUCCESS, payload: marketData })
        dispatch(getConvertedPortfolio())
      })
      .catch((error) => {
        dispatch({ type: MARKET_DATA_ERROR, payload: error })
      })
  }
}

export const getCoinList = () => {
  return (dispatch, getState) => {
    dispatch({ type: COIN_LIST_FETCH })

    cc.coinList()
      .then((coinList) => {
        dispatch({ type: COIN_LIST_SUCCESS, payload: coinList.Data })
      })
      .catch((err) => {
        dispatch({ type: COIN_LIST_ERROR, payload: err })
      })
  }
}
